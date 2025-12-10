import './Explore.css' 
import video from '/src/assets/Explore.jpeg'
import { useEffect } from 'react'
import { useUser } from "../UserContext";
import { useParams } from "react-router-dom";
import SavedTrip from "../SaveTrip/SavedTrip";
const API = import.meta.env.VITE_BACKEND_URL; 

export default function Explore(){
  const { id } = useParams();
  const { userData } = useUser();  

    useEffect(()=>{
      if (!id) return;
      const explore = async() =>{
        try{
          await fetch(`${API}/explore/Explore/${userData.userId}`, { 
            method: "GET",
            headers: { "Content-Type": "application/json"}, 
            credentials: "include",
          });  
        }catch (error) {
          console.error("Unable to display explore:", error);
        }  
      }
      explore();  
    },[userData])
    
    return(
        <>
        <div className='explore-container'>
          
          <div className="hero-section">
              {/* <video className="hero-video" src={video} autoPlay loop muted playsInline/> */}
              <img src={video} className="hero-video"/>
              <div className="hero-text">
                <h1>Hello {userData.name}</h1>
                <p>Let’s explore your adventures!</p>
              </div>
          </div>

          {/* <SavedTrip/> */}
        </div>
        </>
    )
}
