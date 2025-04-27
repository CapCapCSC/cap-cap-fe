
import API from './api';

export const uploadAvatar = async (userId, avatar) => {
    const response = await API.put(`/users/${userId}/avatar`, { avatar });
    return response.data;
};



