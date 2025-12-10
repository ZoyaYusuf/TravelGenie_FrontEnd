import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { useStat } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import { useUser } from "../UserContext";
import { signupSchema } from "/src/validation/validationSchema.js";
import loginImage from "/src/assets/Login.jpeg"
const API = import.meta.env.VITE_BACKEND_URL;

export default function Signup() {  
    const navigate = useNavigate();
    const { userData, setUserData } = useUser();    
    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const res = await fetch(`${API}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!data.user) {
                setStatus(data.message || "Signup failed");
                return;
            }
 
            if (data.token) { 
                localStorage.setItem("token", data.token); 
                setUserData(prev => ({
                ...prev,
                name: data.user.name,
                userId: data.user.userId,
                email: data.user.email
            }));
                navigate(`/Explore/${data.user.userId}`);

            }else {
                setStatus(data.message || "Login failed");
            }
            
        } catch (err) {
            setStatus("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
            <div className='sign-body'>
            <div className='sign-container'>
                <Formik
                    initialValues={{ name: "", email: "", password: "" }}
                    validationSchema={signupSchema}
                    onSubmit={handleSubmit}>
                    {({ status }) => (
                        <Form  className="form-box" id="signupBox"> 
                            <h2>Sign-Up</h2>
                            <Field name="name" placeholder="Name" className="signUpInput"/>
                            <ErrorMessage name="name" component="p" className="error" />

                            <Field name="email" placeholder="Email" className="signUpInput"/>
                            <ErrorMessage name="email" component="p" className="error" />
                            
                            <Field name="password" type="password" placeholder="Password" className="signUpInput" />
                            <ErrorMessage name="password" component="p" className="error" />

                            {status && <div className="server-error">{status}</div>}

                            <button type="submit" className="signUpBtn">Signup</button>

                            <div className="switch-link-signUp ">
                                <Link to="/login">Already have an account? Login</Link>
                            </div>
                        </Form>
                )}
                </Formik>
                <div id="signup" class="signupImage">
                    <img src={loginImage}/> 
                </div> 
            </div>
            </div>
         
    );
}  