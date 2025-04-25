# API Implementation Guide for Frontend

This document outlines how API services are implemented and used in the Cạp Cạp frontend.

## Services Structure

API services are organized in the `src/services` directory:

- `api.js` - Base API configuration using Axios
- `authService.js` - Authentication-related API calls
- `userService.js` - User-related API calls

## API Configuration

The `api.js` file configures the base Axios instance with:
- Base URL
- Default headers
- Token injection via interceptors

```javascript
// api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to request header if available
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
```

## Authentication Service

The `authService.js` file handles authentication operations:

```javascript
// authService.js
import API from './api';

export const authService = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await API.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Registration failed' };
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            const response = await API.post('/auth/login', credentials);
            // Store tokens in localStorage
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    // Logout user
    logout: async () => {
        try {
            await API.post('/auth/logout');
            // Remove tokens from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            return { message: 'Logged out successfully' };
        } catch (error) {
            throw error.response?.data || { message: 'Logout failed' };
        }
    }
};

export default authService;
```

## User Service

The `userService.js` file handles user-related operations:

```javascript
// userService.js
import API from './api';

const userService = {
    // Get user information including vouchers and badges
    getUserById: async (userId) => {
        try {
            const response = await API.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch user information' };
        }
    },

    // Update user information
    updateUser: async (userId, userData) => {
        try {
            const response = await API.put(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update user information' };
        }
    },

    // Delete user (Admin only)
    deleteUser: async (userId) => {
        try {
            const response = await API.delete(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete user' };
        }
    },

    // Add badge to user (Admin only)
    addBadgeToUser: async (userId, badgeId) => {
        try {
            const response = await API.post(`/users/${userId}/badge`, { badgeId });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to add badge to user' };
        }
    },

    // Add voucher to user (Admin only)
    addVoucherToUser: async (userId, voucherId) => {
        try {
            const response = await API.post(`/users/${userId}/voucher`, { voucherId });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to add voucher to user' };
        }
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export default userService;
```

## Using the API Services in React Components

Here's how to use these services in your React components:

### Authentication Example

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import authService from '@/services/authService';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        
        try {
            const userData = await authService.login({ email, password });
            toast.success('Login successful!');
            login(userData.user);
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Rest of component...
};
```

### User Profile Example

```jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import userService from '@/services/userService';
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
    const { id } = useParams();
    const { user: currentUser, updateUserProfile } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Check if viewing own profile
    const isOwnProfile = currentUser && currentUser.id === id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const userData = await userService.getUserById(id);
                setUser(userData);
            } catch (error) {
                toast.error(error.message || 'Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleUpdateProfile = async (formData) => {
        if (!isOwnProfile) {
            toast.error('You can only edit your own profile');
            return;
        }
        
        try {
            await updateUserProfile(id, formData);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
        }
    };

    // Rest of component...
};
```

## Integration with AuthContext

The API services are integrated with the AuthContext to manage global authentication state:

```jsx
// AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import userService from '../services/userService';

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
```

## Error Handling

All API service methods include try/catch blocks to handle errors properly. The error handling follows this pattern:

1. Attempt to extract the error message from the API response
2. Fall back to a generic error message if the API response doesn't contain an error message
3. Throw the error up to the component level where it can be displayed to the user

This approach ensures that all API errors are handled consistently across the application.

## Best Practices

1. Always use async/await with try/catch for API calls
2. Display loading states during API calls
3. Show toast notifications for success and error states
4. Use the AuthContext to manage authentication state globally
5. Store tokens and user data in localStorage
6. Include proper error handling and fallback messages 