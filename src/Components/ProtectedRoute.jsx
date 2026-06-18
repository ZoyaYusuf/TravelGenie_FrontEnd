import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {ScaleLoader} from "react-spinners";
const API = import.meta.env.VITE_BACKEND_URL; 

export default function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${API}/auth/check`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                    credentials: "include",  
                });

                const data = await res.json();
                setIsAuth(data.loggedIn === true);
            } catch (err) {
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <ScaleLoader color="#3e6af8" loading={loading}></ScaleLoader>

    return isAuth ? <Outlet /> : <Navigate to="/Login" />;
}
