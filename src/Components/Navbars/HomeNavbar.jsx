import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function HomeNavbar(){ 
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);
    return(
        <>
        <nav id="navbar" className='navHome'>
                <div className="navLogo">
                    TravelGenie 
                    <span>You wish, your journey</span>
                </div> 

                <div className="menu-icon" onClick={handleClick}> 
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='navlink'>
                        <NavLink to="" onClick={closeMobileMenu}>Home</NavLink>
                    </li>
                    {/* <li className='navlink'>
                        <NavLink to="/pdf" onClick={closeMobileMenu}>pdf</NavLink>
                    </li> */}
                    {/* <li className='navlink'>
                        <NavLink to="/AiBot" onClick={closeMobileMenu}>Travel Ai</NavLink>
                    </li> */}
                    <li className='navlink'>
                        <NavLink to="/Login" onClick={closeMobileMenu}>Login</NavLink>
                    </li>
                    <li className='navlink'>
                        <NavLink to="/Signup" onClick={closeMobileMenu}>Signup</NavLink>
                    </li>
                </ul>
        </nav>
        </>
    ) 
}