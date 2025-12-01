import { useEffect, useState } from 'react';
import '../CreateTrip/Schedule.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import Swal from "sweetalert2";
const API = import.meta.env.VITE_BACKEND_URL;

export default function Schedule({ tripId, tripName, days, startDate, scheduleData, setScheduleData }) {  
  const navigate = useNavigate();
  const dayArray = Array.from({ length: days }, (_, i) => i + 1); //No of days jo hmne choose kiye usko Array ki form me save kia
  const slotTypes = ['morning', 'afternoon', 'evening', 'night'];
  const { userData, setUserData } = useUser();    
   
  const saveSchedule = async(e) =>{
    e.preventDefault();

    const result = await Swal.fire({
        title: "Save Trip?",
        text: "You won't be able to edit it later.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgba(89, 178, 37, 1)",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Save"
      });

    if (!result.isConfirmed) return; // user cancelled

    //few structural changes in Scheduledata as per the schema
    const formattedDays = Object.entries(scheduleData).map(([day, slots]) => 
    {
      const currentDate = new Date(startDate); //saving the date array with its slot n dayNumber
      currentDate.setDate(currentDate.getDate() + (parseInt(day) - 1));
      return {
        dayNumber: parseInt(day),
        date: currentDate,
        slots: {
          Morning: slots.morning || [],
          Afternoon: slots.afternoon || [],
          Evening: slots.evening || [],
          Night: slots.night || [],
        },
      };
    }
    );
    const ScheduleTrip = {
      tripId,
      days: formattedDays,
    };

    console.log("Payload to backend:", ScheduleTrip);
    
    try{  
        const res = await fetch(`${API}/Schedule/CreateTrip/:id`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ScheduleTrip),
        credentials: "include"
        }); 
        console.log("schedule saved", ScheduleTrip);
        localStorage.removeItem(`scheduleData_${tripId}`);

        Swal.fire("Saved!", "Your trip has been Saved.", "success");
        
      } catch(error){
        console.error("Error creating trip:", error);
        alert("Something went wrong while saving the schedule!");
      }
    //navigate to /saved/:userID
     navigate(`/savedTrip/${userData.userId}`);  
  }

  const delPlace = (day, slot, placeToRemove) => { //GPT LOGIC
    setScheduleData(prev => {
      // Create a copy of previous data
      const newData = { ...prev };

      // If the day and slot exist, remove the selected place
      if (newData[day]?.[slot]) {
        newData[day][slot] = newData[day][slot].filter(p => p !== placeToRemove);
      }

      // Optional cleanup: remove empty slots/days
      if (newData[day] && Object.keys(newData[day][slot] || {}).length === 0) {
        delete newData[day][slot];
      }
      if (newData[day] && Object.keys(newData[day]).length === 0) {
        delete newData[day];
      }

      return newData;
    });
  };

  return(
  <>
    <div className="schedule-container"> 
        <div className="itinerary-card">
          <div className="itinerary-header">
            <h2>{tripName}</h2>
            <div style={{ color: "var(--label)", fontSize: 13 }}>
              Plan &amp; adjust your days
            </div>
          </div>

          <div className="itinerary-days" id="itineraryDays"> 
            {dayArray.map((day) => { //logic for formatting and binding date with its day n slot
              const currentDate = new Date(startDate);
              currentDate.setDate(currentDate.getDate() + (day - 1));
              const formattedDate = currentDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                  <div className="day" data-day={day} key={day}>
                    <h3>
                      Day {day} ({formattedDate})
                    </h3>

                    <div className="slots">
                      {slotTypes.map((slot) => {
                        const places = scheduleData[day]?.[slot] || [];

                        return (
                          <div className="slot" data-slot={slot} key={slot}>
                            <div className="slot-title">
                              {slot === 'morning' && '☀️ Morning'}
                              {slot === 'afternoon' && '🌤️ Afternoon'}
                              {slot === 'evening' && '🌇 Evening'}
                              {slot === 'night' && '🌙 Night'}
                            </div>

                            <div className="slot-contents">
                              {places.map((place, i) => (
                                <div key={i} className="place-item">
                                  <input
                                      type="text"
                                      value={place}
                                      readOnly
                                  />
                                  <button
                                      className="del-btn"
                                      onClick={() => delPlace(day, slot, place)}
                                      title="Delete this place"
                                  >
                                      {/* 👇 Replace ❌ with the Font Awesome icon */}
                                      <i className="fas fa-trash-alt"></i> 
                                  </button>
                                </div>
                              ))}
                              {places.length === 0 && (
                                <div className="no-place-added">
                                  Add places to fill this slot!
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
              );
              })}
          </div>
        </div> 
    </div>
    <button onClick={saveSchedule} className='saveSchedule'>SAVE MY TRIP!</button>
  </>
  );
}
