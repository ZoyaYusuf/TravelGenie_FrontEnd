import './Navbar.css'
import { useState, useEffect } from 'react';
import AuthNavbar from './AuthNavbar';
import HomeNavbar from './HomeNavbar';
import { useUser } from "../UserContext";

const API = import.meta.env.VITE_BACKEND_URL;

export default function Navbar() {
    const { userData } = useUser();  
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => { 

        fetch(`${API}/auth/check`, {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            setIsLoggedIn(data.loggedIn === true);
        })
        .catch(() => setIsLoggedIn(false));
    }, [userData]); // update navbar when user data changes

    return (
        <div className='NavContainerParent'>
            <div className='NavContainer'>
                {isLoggedIn ? (
                    <AuthNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                ) : (
                    <HomeNavbar />
                )}
            </div>
        </div>
    );
}
