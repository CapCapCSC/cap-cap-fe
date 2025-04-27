import API from './api';

export const uploadAvatar = async (userId, file) => {
    try {
        // Tạo FormData
        const formData = new FormData();
        formData.append('avatar', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        // Gửi request
        const response = await API.put(`/users/${userId}/avatar`, formData, config);

        return response.data;
    } catch (error) {
        console.error('Avatar upload error:', error);
        throw error.response?.data || error;
    }
};




