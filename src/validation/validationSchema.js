import * as Yup from "yup";

// LOGIN VALIDATION
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required!"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required!"),
});

// SIGNUP VALIDATION
export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// NEW TRIP VALIDATION
export const newTripSchema = Yup.object().shape({
  tripName: Yup.string()
    .min(3, "Trip name must be at least 3 characters")
    .required("Trip name is required"),

  city: Yup.string()
    .min(2, "Enter a valid city") //must be a string
    .required("City is required"),

  days: Yup.number()
    .min(1, "Days must be at least 1")
    .required("Duration is required"),

  startDate: Yup.date()  
    .min(new Date(), 'Date must be after the current date')
    .required("Start date is required"),

  // cover: Yup.string()
  //   .required("Cover image is required"),
});
