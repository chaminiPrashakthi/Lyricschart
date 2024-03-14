import api from "../helpers/util";

export const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
};

export const registerNewUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response?.data;
    } catch (error) {
        console.error('Error registering a user:', error.message);
        throw new Error("Error registering a user:", error);
    }
}

export const loginUser = async (loginData) => {
    try {
        const response = await api.post('/login', loginData);
        return response?.data;
    } catch (error) {
        console.error('Error login user:', error.message);
        throw new Error("Error login user:", error);
    }
}