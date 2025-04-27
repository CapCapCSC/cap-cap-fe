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

    // Get current user and token from localStorage for AuthContext initialization
    getCurrentUser: () => {
        const storedUser = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');
        if (!storedUser || !accessToken) return null;
        return { ...JSON.parse(storedUser), token: accessToken };
    }
};

export default userService; 