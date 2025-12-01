import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Components/Layout.jsx'
import Home from './Components/HomePage/HomePage.jsx'
import Explore from './Components/LandingPages/Explore.jsx'

import Login from './Components/Auth/Login.jsx';
import SignUp from './Components/Auth/SignUp.jsx';

import NewTrip from './Components/NewTrip/NewTrip.jsx';

import CreateTrip from './Components/CreateTrip/CreateTrip';

import SavedTrip from './Components/SaveTrip/SavedTrip.jsx';
import SavedTripDetails from './Components/SaveTrip/SavedTripDetails.jsx'

import { TripProvider } from './Components/TripContext.jsx' ;
import { UserProvider } from './Components/UserContext.jsx' ;

import ProtectedRoute from "./Components/ProtectedRoute.jsx"
import PublicRoute from "./Components/PublicRoute.jsx"

import AiBot from "./Components/AiBot/AiBot.jsx"
import App from './App.jsx'
import Pdf from './Components/Xtra/pdf.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='Login' element={<PublicRoute><Login /></PublicRoute>} />
      <Route path='SignUp' element={<PublicRoute><SignUp /></PublicRoute>} /> 
      {/* <Route path='/pdf' element={<Pdf />} /> */}

      <Route element={<ProtectedRoute />} >
        <Route path='Explore/:userId' element={<Explore />} />  
        <Route path='NewTrip/:userId' element={<NewTrip />} />
        <Route path='CreateTrip/:tripId' element={<CreateTrip />} /> 
        <Route path='SavedTrip/:userId' element={<SavedTrip />} />  
        <Route path='SavedTrip/:userId/:tripId' element={<SavedTripDetails />} />
        <Route path='/AiBot/:userId' element={<AiBot />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
    <TripProvider>
      <RouterProvider router={router} />
    </TripProvider>
  </UserProvider>
)