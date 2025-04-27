import { createContext, useState, useContext, useEffect } from "react";
import userService from "../services/userService";

const AuthContext = createContext();

// Add helper to check JWT expiration
const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize user from localStorage with token expiration check
    useEffect(() => {
        const storedUser = userService.getCurrentUser();
        if (storedUser && storedUser.token && !isTokenExpired(storedUser.token)) {
            setUser(storedUser);
        } else {
            localStorage.removeItem('user');
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

    // Auto logout when token expires
    useEffect(() => {
        if (user && user.token) {
            try {
                const payload = JSON.parse(atob(user.token.split('.')[1]));
                const expiryTime = payload.exp * 1000 - Date.now();
                if (expiryTime > 0) {
                    const timer = setTimeout(() => {
                        logout();
                    }, expiryTime);
                    return () => clearTimeout(timer);
                } else {
                    logout();
                }
            } catch {
                logout();
            }
        }
    }, [user]);

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
