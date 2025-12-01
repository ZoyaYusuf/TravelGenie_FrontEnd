import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userData, setUserData] = useState(() => {
        // load from localStorage when app opens
        const saved = localStorage.getItem("userData");
        return saved ? JSON.parse(saved) : { userId: null, email: "", username: "" };
    });

    useEffect(() => {
        // save to localStorage whenever userData changes
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
