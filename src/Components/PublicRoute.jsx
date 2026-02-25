import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
const API = import.meta.env.VITE_BACKEND_URL;
import { useUser } from "./UserContext";
import {ScaleLoader} from "react-spinners";

export default function PublicRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const { userData, setUserData } = useUser();    
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
            const res = await fetch(`${API}/auth/check`
                , {
                        credentials: "include"
                    }
            );
                const data = await res.json();
                setIsAuth(data.loggedIn === true);
            } catch {
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <ScaleLoader color="#3e6af8" loading={loading}></ScaleLoader>;

    // If user is logged in → prevent access to login/signup
    return isAuth ? <Navigate to={`/explore/${userData.userId}`}  /> : children;
}
