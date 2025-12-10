import { useState } from 'react';
import { useEffect } from 'react'; 
import'../CreateTrip/Places.css';
import { useParams } from "react-router-dom";
import { useTrip } from "../TripContext"; 
const API = import.meta.env.VITE_BACKEND_URL;

export default function Places({setIsOpen, city, setSelectedPlaces}) {
  const { id } = useParams();
  const[places,setPlaces] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { tripData, setTripData } = useTrip();  //gobal var / context --trip
  
  // const handleChange = (e) =>{
  //   setTripData((prevData) => ({
  //   ...prevData, city: e.target.value, // update city
  //   })); 
  // }

  // const fetchPlaces = async(e) =>{
  //   console.log(city) 
  //   const res = await fetch(`${API}/new/CreateTrip/${tripData.tripId}`, { //Calling /CreateTrip Route
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({city: city}),  //city name is passed in the body of the URL
  //      
  //   });
  //   const data = await res.json(); //Response of the URL in json
  //   setPlaces(data);
  //   setLoading(false);
  //   // console.log(places); //no response and no re - rendering (old values)
  // }
  
  useEffect(()=>{
    if (!tripData.tripId) {
      console.log("no id in search",tripData.tripId)
      return
    };
    const fetchPlaces = async(e) =>{
    console.log(city) 
    try{
      const res = await fetch(`${API}/new/CreateTrip/${tripData.tripId}`, { //Calling /CreateTrip Route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({city}),  //city name is passed in the body of the URL
       
    });
    const data = await res.json(); //Response of the URL in json
    setPlaces(data);
    }catch (error) {
      console.error("Error fetching trip:", error);
    } finally {
      setLoading(false);
    };
  }
    fetchPlaces();  
  },[city]);


  if (loading) {
    return (
      <div className="page-loader"> 
        <p>Loading some AI Recommended places...</p>
      </div>
    );
  }
 
  const openDialogBox = (e) =>{ //Open Dialog Box when + is Clicked
    setIsOpen(true);
    setSelectedPlaces(e); 
  }

    return(
    <>
        {/* left  */}
    <div className="AIcontainer"> 
      <div className="list-header"> 
        <span className="subtext">AI Recommended Places</span>
      </div>
      <div className="list-card">
        {Array.isArray(places) &&
          places.map((place, index) => (
            <div key={index} className="places">
              <span className="place-title">{place.title}</span> 
              <button className="place-add-btn" onClick={() => openDialogBox(place.title)}>
                +
              </button>
            </div>
          ))} 
      </div> 
    </div>  
    </>
    )
}