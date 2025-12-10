import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useTrip } from "../TripContext"; 
import { useUser } from "../UserContext";
import './NewTrip.css' 
import CoverImages from './CoverImages';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { newTripSchema } from "/src/validation/validationSchema";
const token = localStorage.getItem("token");
 
const API = import.meta.env.VITE_BACKEND_URL;
export default function NewTrip(){
  const navigate = useNavigate();
  const { tripData, setTripData } = useTrip();  //gobal var / context --trip
  const { userData, setUserData } = useUser();  //gobal var / context --user
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//   console.log("Updated tripData: useeffect", tripData);
// }, [tripData]);
  
  // const handleChange = (e) =>{
  //   setTripData({ 
  //     ...tripData, [e.target.name] : e.target.value
  //   });
  // }

  const handleSubmit = async (values, { setSubmitting }) => {
  setSubmitting(true); 

  try {
    if(!values.cover){
          values.cover = "https://media.istockphoto.com/id/1500563478/photo/traveler-asian-woman-relax-and-travel-on-thai-longtail-boat-in-ratchaprapha-dam-at-khao-sok.jpg?s=612x612&w=0&k=20&c=_bb2PdPJMtY9KmNNBSFY6w_TOcC98we45LvsYoa48p8=";
    }
    const res = await fetch(`${API}/Create/newTrip/${userData.userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`  },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.success && data.tripId) {
      setTripData(prev => ({
        ...prev,
        ...values,
        userId: userData.userId,
        tripId: data.tripId
      }));  
      navigate(`/CreateTrip/${data.tripId}`); 
    }
  } catch (error) {
    console.error("Error creating trip:", error);
  } finally {
    setSubmitting(false);
  }
};


  return(
  <>
  {loading ? (
  <div className="loading-screen">
    <h2>Creating your trip...</h2>
  </div>
  ) : (
    <>
    <div className='newTrip-body'>
      <h1 className='label'>Add Trip</h1>
      <Formik
      initialValues={{ tripName: "", city: "", days: "", startDate: "", cover: "" }}
      validationSchema={newTripSchema}
      onSubmit={handleSubmit}>
      {({setFieldValue}) => (
      <Form  className="card" id="form"> 
        <div className="field">
          <label htmlFor="tripName">Trip Name</label> 
          <Field id="tripName" name="tripName" type="text" placeholder="e.g. Secrets of Old Delhi" className="trip-Input"/>
          <ErrorMessage name="tripName" component="div" className="error" />
        </div>

        <div className="field">
          <label htmlFor="city">City</label> 
          <Field id="city" name="city" type="text" placeholder="e.g. Delhi" className="trip-Input"/>
          <ErrorMessage name="city" component="div" className="error" />
        </div>

        <div className="row">
          <div className="field col-2">
            <label htmlFor="days">Days</label> 
            <Field id="days" name="days" type="number" className="trip-Input"/>
            <ErrorMessage name="days" component="div" className="error" />
          </div>

          <div className="field col-2">
            <label htmlFor="startDate">Start Date</label> 
            <Field id="startDate" name="startDate" type="date" className="trip-Input"/>
            <ErrorMessage name="startDate" component="div" className="error" />
          </div>
        </div>

      <div className="field">
        <CoverImages setFieldValue={setFieldValue} id="cover"/>
        {/* <ErrorMessage name="cover" component="div" className="error" />  */}
      </div>
 
        <button className="create" type="submit">Create</button> 
      </Form>
      )}
      </Formik>
      </div>
    </>
  )}
  </>
  )
} 
