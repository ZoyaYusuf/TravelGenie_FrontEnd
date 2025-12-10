import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useUser } from "../UserContext";
const API = import.meta.env.VITE_BACKEND_URL;

export default function AuthNavbar({ isLoggedIn, setIsLoggedIn }){ 
    const navigate = useNavigate(); 
    const { userData, setUserData } = useUser();
    const { id } = useParams();
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    async function handleLogout() {
    await fetch(`${API}/logout`, {
        method: "POST"
    });
    localStorage.removeItem("userData");
    localStorage.removeItem("token");  
    setUserData({ userId: null, email: "", username: "" });
    setIsLoggedIn(false);
    navigate("/login");  // Redirect after logout
    }
    return(
        <> 
        <nav id="navbar" className='navAuth'>
                <div className="navLogo">
                    TravelGenie 
                    <span>You wish, your journey</span>
                </div> 

                <div className="menu-icon" onClick={handleClick}> 
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>  
                    <li className='navlink'>
                        <NavLink to={`/Explore/${userData.userId}`} onClick={closeMobileMenu}>Explore</NavLink>
                    </li>
                    <li className='navlink'>
                        <NavLink to={`/AiBot/${userData.userId}`} onClick={closeMobileMenu}>Travel Ai</NavLink>
                    </li>
                    <li className='navlink'>
                        <NavLink to={`/NewTrip/${userData.userId}`} onClick={closeMobileMenu}>New Trip</NavLink>
                    </li> 
                    <li className='navlink'>
                        <NavLink to={`/SavedTrip/${userData.userId}`} onClick={closeMobileMenu}>Saved Trip</NavLink>
                    </li>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </ul>
        </nav> 
        </>
    ) 
}