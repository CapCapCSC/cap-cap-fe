import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
    const { user } = useAuth();
    const isAuthenticated = !!user;

    return (
        <NavbarContext.Provider value={{ isAuthenticated }}>
        {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => useContext(NavbarContext); 