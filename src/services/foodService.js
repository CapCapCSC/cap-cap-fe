import API from "./api";

export const getRandomFoods = async () => {
    const response = await API.get("/foods/random");
    return response.data;
};

export const getFoods = async (page = 1, limit = 10, tags) => {
    const params = { page, limit };
    if (tags) params.tags = tags.join(',');
    const response = await API.get('/foods', { params });
    return response.data;
};

export const getFoodById = async (id) => {
    const response = await API.get(`/foods/${id}`);
    return response.data;
}; 

export const editFood = async (id, foodData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role !== 'admin') {
        throw new Error('Unauthorized - Admin access required');
    }
    const response = await API.put(`/foods/${id}`, foodData);
    return response.data;
};

export const deleteFood = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role !== 'admin') {
        throw new Error('Unauthorized - Admin access required');
    }
    const response = await API.delete(`/foods/${id}`);
    return response.data;
};

export const createFood = async (foodData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role !== 'admin') {
        throw new Error('Unauthorized - Admin access required');
    }
    const response = await API.post('/foods', foodData);
    return response.data;
};

