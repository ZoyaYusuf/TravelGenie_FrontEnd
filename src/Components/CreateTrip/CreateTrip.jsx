import { useState, useEffect } from 'react';
import '../CreateTrip/CreateTrip.css';
import PlaceContainer from './PlaceContainer';
import AddPlace from './AddPlace';
import Schedule from './Schedule';
import { useTrip } from "../TripContext";
import { useParams } from "react-router-dom";

export default function CreateTrip() { 
  const { tripId } = useParams(); 
  const localStorageKey = `scheduleData_${tripId}`; // Unique key for this trip's schedule
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("1");
  const [slot, setSlot] = useState("morning");
  const [selectedPlaces, setSelectedPlaces] = useState(""); 
  const { tripData, setTripData } = useTrip(); //context
  const [scheduleData, setScheduleData] = useState(() => {
    try {
      const storedData = localStorage.getItem(localStorageKey);
      return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return {};
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(scheduleData));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [scheduleData, localStorageKey]); // Depend on scheduleData and its key

  useEffect(() => { 
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // hide after 5 seconds
      return () => clearTimeout(timer);
    }, []);

  if (loading) {
      return (
      <div className='trip-body'>
        <div className="page-loader">
          <div className="spinner"></div>
          <p>Loading your trip details...</p>
        </div>
      </div>
      );
  }

  return (
    <> 
    <div className='trip-body'>
    <div className="trip-container">
      <div className="left-section">
        <PlaceContainer 
        setIsOpen={setIsOpen} 
        city={tripData.city}  
        setSelectedPlaces={setSelectedPlaces} 
        selectedPlaces={selectedPlaces}
        // setTripData={setTripData}
        /> 
      </div>

      { isOpen && (
        <AddPlace  
          setIsOpen={setIsOpen} 
          days={tripData.days} 
          selectedDay={selectedDay} 
          setselectedDay={setSelectedDay} 
          slot={slot} 
          setSlot={setSlot}
          selectedPlaces={selectedPlaces}
          scheduleData={scheduleData}
          setScheduleData={setScheduleData}/>
      )}

      <div className="right-section">
        <Schedule 
          tripId={tripId}
          tripName={tripData.tripName} 
          days={tripData.days} 
          startDate={tripData.startDate} 
          scheduleData={scheduleData}
          setScheduleData={setScheduleData}
        />
      </div>
    </div>
    </div>
    </>

  );
}
