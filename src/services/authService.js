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
            // Remove tokens from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return { message: 'Logged out successfully' };
        } catch (error) {
            throw error.response?.data || { message: 'Logout failed' };
        }
    }
};

export default authService; 