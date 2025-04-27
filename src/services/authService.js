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
    },
    
    // Forgot password
    forgotPassword: async (email) => {
        try {
            console.log("Sending forgot password request for email:", email);
            // Thử với endpoint khác nếu endpoint hiện tại không hoạt động
            const response = await API.post('/auth/forgot-password', { email });
            // Nếu endpoint trên không hoạt động, hãy thử endpoint dưới đây
            // const response = await API.post('/users/forgot-password', { email });
            console.log("Forgot password response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Forgot password error:", error);
            console.error("Error response:", error.response);
            throw error.response?.data || { message: 'Failed to send reset password email' };
        }
    },
    
    // Reset password
    resetPassword: async (token, newPassword) => {
        try {
            const response = await API.post('/auth/reset-password', { token, newPassword });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to reset password' };
        }
    },
    
    // Verify reset token
    verifyResetToken: async (token) => {
        try {
            const response = await API.post('/auth/verify-reset-token', { token });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Invalid or expired token' };
        }
    }
};

export default authService; 