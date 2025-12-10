import './SavedTrip.css'
import { useState , useEffect } from 'react'; 
import { useNavigate } from "react-router-dom"; 
import { useUser } from "../UserContext";
import Swal from "sweetalert2";
const API = import.meta.env.VITE_BACKEND_URL;

export default function savedTrip(){
    const [trips, setTrips] = useState([]);
    const { userData, setUserData } = useUser();   
    const navigate = useNavigate();

    const NavigateToNewTrip = () =>{
      navigate(`/NewTrip/${userData.userId}`);
    }


const deleteSavedTrip = async (tripId, e) => {
  e.stopPropagation(); // prevent opening trip when clicking delete icon

  // Step 1: Ask for confirmation
  const result = await Swal.fire({
    title: "Delete Trip?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Delete"
  });

  if (!result.isConfirmed) return; // user cancelled

  try {
    // Step 2: Call delete API
    const res = await fetch(
      `${API}/saved/savedTrip/${userData.userId}/${tripId}`,
      {
        method: "DELETE", 
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.log(errText);
      Swal.fire("Error", "Failed to delete trip!", "error");
      return;
    }

    // Step 3: Update UI
    setTrips(prev => prev.filter(t => t.tripId !== tripId));

    // Step 4: Success alert
    Swal.fire("Deleted!", "Your trip has been removed.", "success");

  } catch (err) {
    console.error("Error deleting trip:", err);
    Swal.fire("Error", "Something went wrong!", "error");
  }
};


    useEffect(() => { 
      const fetchTrips = async () => {
        try {
          const res = await fetch(`${API}/saved/savedTrip/${userData.userId}`, {   });
          const data = await res.json();
          setTrips(data);
        } catch (err) {
          console.error("Error fetching trips:", err);
        }
      };
      fetchTrips();
    }, []);

    return (
  <>
    <div className="page-container">
          <div className="saved-title">
            <h1>Your Saved Trips</h1>
            <i className="fa-regular fa-bookmark"></i>
          </div>

      {trips.length === 0 ? (
        <>
          <p className='noTrip'>Ooho! You have No trips saved yet. Create Now!</p>
          <div className="trip-card new-trip" onClick={NavigateToNewTrip}>
            <div className="plus-sign">+</div>
            <p>Create New Trip</p>
          </div>
        </>
      ) : (
        <div className="trip-grid">
          {trips.map((trip) => (
            <div className="trip-card">
              <img src={trip.cover} alt={trip.tripName} onClick={() => navigate(`/SavedTrip/${userData.userId}/${trip.tripId}`)} />
              <div className="trip-info">
                <h3>{trip.tripName}</h3>
                <p>{trip.city}</p>
                <p>{new Date(trip.startDate).toDateString()}</p>
                <i class="fa-solid fa-trash-can" onClick={(e) => deleteSavedTrip(trip.tripId, e)}></i>
              </div>
            </div>
          ))}

          <div className="trip-card new-trip" onClick={NavigateToNewTrip}>
            <div className="plus-sign">+</div>
            <p>Create New Trip</p>
          </div>
        </div>
      )}
    </div>
  </>
);

}