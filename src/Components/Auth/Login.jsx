import { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "/src/validation/validationSchema.js";
import { useUser } from "../UserContext";
import loginImage from "/src/assets/Login.jpeg"
import SignUpImage from "/src/assets/SignUp.jpeg"

const API = import.meta.env.VITE_BACKEND_URL;

export default function Login() { 
    const navigate = useNavigate(); 
    const { userData, setUserData } = useUser();  //gobal var / context --user

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try { 
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
                credentials: "include"
            });

            console.log("user data in login as values", values) 
 
            const data = await res.json();

             if (!data.user) {
                setStatus(data.message || "Login failed");
                return;
            }
 
            setUserData(prev => ({
            ...prev,
            name: data.user.name,
            userId: data.user.userId,
            email: data.user.email
            }));

            if (data.token) { 
                navigate(`/Explore/${data.user.userId}`);

            } else {
                setStatus(data.message || "Login failed");
            }
        } catch (err) {
            setStatus("Something went wrong");
        } finally { 
            setSubmitting(false);
        }
    };

    useEffect(()=>{
            console.log("user data in login", userData) 
    },[userData])

    return (
        <div className="login-body">
            <div className="login-container">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}>
                    {({ status }) => (
                        <Form className="form-box" id="loginBox">
                            <h2>Login</h2>

                            <Field name="email" placeholder="Email" className="loginInput"/>
                            <ErrorMessage name="email" component="div" className="error" />

                            <Field name="password" type="password" placeholder="Password" className="loginInput"/>
                            <ErrorMessage name="password" component="div" className="error"/>

                            {status && <div className="server-error">{status}</div>}

                            <button type="submit" className="loginBtn">Login</button>

                            <div className="switch-link-login">
                                <Link to="/signup">Don't have an account? Signup</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div id="loginInfo" className="loginImage">
                    <img src={SignUpImage}/> 
                </div> 
            </div>
        </div>
    );
}