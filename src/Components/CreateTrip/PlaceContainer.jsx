import { useState } from 'react';
import { useEffect } from 'react'; 
import'../CreateTrip/PlaceContainer.css';
import { useParams } from "react-router-dom";
import { useTrip } from "../TripContext"; 
import Places from './Places';

export default function inputPlace({setIsOpen, city, setSelectedPlaces, selectedPlaces}) { 

  const handleChange = (e) =>{ 
    setSelectedPlaces(e.target.value); 
    console.log(e.target.name); 
  } 

  useEffect(()=>{
    console.log("selected place",selectedPlaces)  
  },[selectedPlaces])

  const openDialogBox = (e) =>{ //Open Dialog Box when + is Clicked
    setIsOpen(true); 
    console.log("btn clicked"); 
  }
    return(
    <>
        {/* left  */}
    <div className='leftContainer'>
      <div className="inputContainer">   
          <div className="inputPlace">
            <input placeholder="Enter Place" name="place" className="place-input" onChange={handleChange} required/>
            <button onClick={() => openDialogBox(selectedPlaces)} className='InputaddBtn'>+</button>  
          </div> 
      
          <div className="AiPlaces">
            <Places setIsOpen={setIsOpen} city={city} setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces}/> 
          </div>

          <div className="maps">
            MAPS
            <div className='map-link'>
              <iframe
                width="100%"
                height="600"
                src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(city)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>

              </div>
          </div>
      </div>
    </div>
    </>
    )
}