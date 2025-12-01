import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbars/Navbar.jsx'

function Layout() {
  return (
    <>
    <Navbar/>
    <main style={{width: '100vw', height: '100vh'}}>    
        <Outlet />
    </main>
    </>
  )
}

export default Layout