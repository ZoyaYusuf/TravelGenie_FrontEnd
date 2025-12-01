import { createContext, useState, useContext, useEffect } from "react";

const TripContext = createContext();

// Define your default empty state here so we can reuse it
const defaultTripState = {
  tripId: "",
  tripName: "",
  city: "",
  days: "",
  startDate: "",
  cover: "",
  userId: ""
};

export const TripProvider = ({ children }) => {
  // 1. LAZY INITIALIZATION: Check localStorage before setting initial state
  const [tripData, setTripData] = useState(() => {
    try {
      const savedData = localStorage.getItem("tripData");
      // If data exists, parse it. If not, return the default empty object
      return savedData ? JSON.parse(savedData) : defaultTripState;
    } catch (error) {
      console.error("Error parsing trip data from storage:", error);
      return defaultTripState;
    }
  });

  // 2. SYNCHRONIZATION: Save to localStorage whenever tripData changes
  useEffect(() => {
    localStorage.setItem("tripData", JSON.stringify(tripData));
  }, [tripData]);

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};

// custom hook for easier usage
export const useTrip = () => useContext(TripContext);