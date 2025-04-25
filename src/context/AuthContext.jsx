import { createContext, useState, useContext, useEffect } from "react";
import userService from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize user from localStorage
    useEffect(() => {
        const storedUser = userService.getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUserProfile = async (userId, userData) => {
        try {
            const response = await userService.updateUser(userId, userData);
            // Update local user data
            setUser(prevUser => ({
                ...prevUser,
                ...response.user
            }));
            // Update localStorage
            localStorage.setItem('user', JSON.stringify({
                ...user,
                ...response.user
            }));
            return response;
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            updateUserProfile,
            loading 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
