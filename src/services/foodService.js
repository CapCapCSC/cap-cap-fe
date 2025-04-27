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