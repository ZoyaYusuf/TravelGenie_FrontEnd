import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import './SavedTripDetails.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
const API = import.meta.env.VITE_BACKEND_URL;

export default function SavedTripDetails() {
  const printRef = React.useRef(null);
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const { userData, setUserData } = useUser();   
  useEffect(() => {
    const fetchTrip = async () => { 
      try {
        const res = await fetch(`${API}/saved/SavedTrip/${userData.userId}/${tripId}`);
        const data = await res.json();
        setTrip(data);
      } catch (err) {
        console.error("Error fetching trip details:", err);
      }
    };

    fetchTrip();
  }, [tripId]);

  if (!trip) return <p>Loading trip details...</p>;

  console.log("Trip data:", trip);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
  };

  return (
    <> 

    <div className="savedTrip-body">
      <button onClick={handleDownloadPdf} className="pdfBtn">
            Download PDF 
            <i class="fa-regular fa-file-pdf"></i>
    </button>
    <div ref={printRef} className="trip-details">
      <h2>{trip.tripName}</h2>
      <p>City: {trip.city}</p>
      <p>Start Date: {new Date(trip.startDate).toDateString()}</p>
      <h3>Schedule:</h3>

      {trip.schedules?.length > 0 ? (
        trip.schedules.map((schedule, i) => (
          <div key={i} className="schedule-block">
            {schedule.days?.map((day, j) => (
              <div key={j} className="day-section">
                <h4>Day {day.dayNumber} — {new Date(day.date).toDateString()}</h4>

                <div className="slots">
                  {Object.entries(day.slots || {})
                  .filter(([slot]) => ["Morning", "Afternoon", "Evening", "Night"].includes(slot))
                  .map(([slot, places]) => (
                    <div key={slot} className="slot-section">
                      <strong>{slot}:</strong>
                      {Array.isArray(places) && places.length > 0 ? (
                        <ul>
                          {places.map((p, k) => (
                            <li key={k}>{p}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No places added</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No schedule data found.</p>
      )}
    </div>
    
    </div>
    </>
  );
}
