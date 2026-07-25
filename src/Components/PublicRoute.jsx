import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { ScaleLoader } from "react-spinners";

const API = import.meta.env.VITE_BACKEND_URL;

export default function PublicRoute({ children }) {
    const { userData } = useUser();

    // Quick local check: Has the user logged in before?
    const hasLocalSession = Boolean(userData?.userId || localStorage.getItem("token"));

    // If no local session exists, don't block the UI with a server request!
    const [loading, setLoading] = useState(hasLocalSession);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        // If there's no stored session, user is definitely logged out -> render public page instantly
        if (!hasLocalSession) {
            setLoading(false);
            setIsAuth(false);
            return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s fallback timeout

        const checkAuth = async () => {
            try {
                const res = await fetch(`${API}/auth/check`, {
                    credentials: "include",
                    signal: controller.signal,
                });
                const data = await res.json();
                setIsAuth(data.loggedIn === true);
            } catch {
                // On error or timeout, treat user as logged out so they can see Login page
                setIsAuth(false);
            } finally {
                clearTimeout(timeoutId);
                setLoading(false);
            }
        };

        checkAuth();

        return () => {
            controller.abort();
            clearTimeout(timeoutId);
        };
    }, [hasLocalSession]);

    if (loading) {
        return (
            <div className="loader-container">
                <ScaleLoader color="#3e6af8" loading={loading} />
                <br />
                <p>Loading...</p>
            </div>
        );
    }

    // If user is logged in -> redirect to explore; otherwise render public page (Login/SignUp)
    return isAuth && userData?.userId ? <Navigate to={`/explore/${userData.userId}`} replace /> : children;
}
