import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const AdminContext = createContext({ isAdmin: false });

export const AdminProvider = ({ children }) => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    return (
        <AdminContext.Provider value={{ isAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext); 