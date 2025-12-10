import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';
import AuthNavbar from './AuthNavbar';
import HomeNavbar from './HomeNavbar';
import { useUser } from "../UserContext";
const API = import.meta.env.VITE_BACKEND_URL;

export default function Navbar(){
    const { userData, setUserData } = useUser();  //gobal var / context --user
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check auth on mount
    useEffect(() => {
        fetch(`${API}/auth/check`)
        .then(res => res.json())
        .then(data => setIsLoggedIn(data.loggedIn || false))
        .catch(() => setIsLoggedIn(false));
    }, [userData]);

    return(
        <> 
        <div className='NavContainerParent'>
        <div className='NavContainer'>
        {isLoggedIn ? (
                    <AuthNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                ) : (
                    <>
                    <HomeNavbar/>
                    </>
                )}
        </div>
        </div>
        </>
    )
}