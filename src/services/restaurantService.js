import API from "./api";

export const getRestaurantById = async (id) => {
    const response = await API.get(`/restaurants/${id}`);
    return response.data;
};

export const getRestaurants = async (districtId) => {
    const response = await API.get("/restaurants", {
        params: districtId ? { districtId } : {},
    });
    return response.data;
};

export const getRandom3Restaurants = async (districtId) => {
    const response = await API.get("/restaurants/random", {
        params: { districtId },
    });
    return response.data;
};

export const createRestaurant = async (restaurantData) => {
    const response = await API.post("/restaurants", restaurantData);
    return response.data;
};

export const editRestaurant = async (id, restaurantData) => {
    const response = await API.put(`/restaurants/${id}`, restaurantData);
    return response.data;
};

export const deleteRestaurant = async (id) => {
    const response = await API.delete(`/restaurants/${id}`);
    return response.data;
};
