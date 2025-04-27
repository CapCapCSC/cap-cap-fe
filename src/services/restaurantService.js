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
