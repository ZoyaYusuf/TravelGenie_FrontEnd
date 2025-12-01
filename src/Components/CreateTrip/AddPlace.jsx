import { use, useState } from 'react';
import { useEffect } from 'react'; 
import'../CreateTrip/AddPlace.css';

export default function AddPlace({setIsOpen, days, slot, setSlot, selectedDay, setselectedDay, selectedPlaces, scheduleData, setScheduleData}) {  
  // ADD ke ps PLACE, SLOT, DAY sb hai ----> in sbko use krke data SCHEDULE me show krna h
  const dayArray = Array.from({ length: days }, (_, i) => i + 1);

  const closeDialogBox = () =>{
    setIsOpen(false);
  }
  
  const addPlace = (day, slot, place) => {
  setScheduleData(prev => ({
    ...prev,
    [day]: {
      ...prev[day],
      [slot]: [...(prev[day]?.[slot] || []), place].slice(0, 3) // max 3 places
    }
  }));
  setIsOpen(false);
  };

  const setDay = (e) =>{
    setselectedDay(e.target.value);
  }

  const selectSlot = (e) =>{
    const slot = e.currentTarget.getAttribute("data-slot");
    setSlot(slot); 
  }
  
  useEffect(()=>{
    console.log("place",selectedPlaces)
     if(selectedPlaces===''){
      alert("Enter Place");
      setIsOpen(false);
    } 
  },[selectedPlaces]) 
  
    return(
    <>
    {/* show Dialog Box when isopen is true*/} 
  <div className="modal-backdrop" id="modalBackdrop">
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <h3 id="modalTitle">Add in Schedule</h3>
       
      <div className="modal-section">
        <div className="label">Selected Place</div>
          <div className="place-display">
              <span className="place-name">{selectedPlaces || "None Selected"}</span>
          </div>
      </div>

      <div className="modal-section"> 
        <div className="label">Select Day</div>
          <div className="day-selector-container"> 
            <select id="daySelect" onChange={setDay}>
              <option>Select Day</option>
              {dayArray.map((day) => (
                <option value={day} key={day}>
                Day {day}
              </option>
              ))}
            </select>
        </div>
      </div> 

      <div className="modal-section">
        {/* Choose Slot */}
        <div className='label'>
          Choose Slot
        </div>
        <div className="slot-options" id="slotOptions">
              {["morning", "afternoon", "evening", "night"].map((s) => (
                <div
                  key={s}
                  className={`slot-btn ${slot === s ? "active" : ""}`}
                  data-slot={s}
                  onClick={selectSlot}
                >
                  {s === "morning" && "☀️ Morning"}
                  {s === "afternoon" && "🌤️ Afternoon"}
                  {s === "evening" && "🌇 Evening"}
                  {s === "night" && "🌙 Night"}
                </div>
              ))}
        </div>
      </div>
      <div className="actions">
        <button className="btn secondary" id="modalCancel" onClick={closeDialogBox}>
          Cancel
        </button>
        <button className="btn primary" id="modalDone" onClick={() => addPlace(selectedDay, slot, selectedPlaces)}>
          Done
        </button>
      </div>
    </div>
  </div>  
    </>
    )
}