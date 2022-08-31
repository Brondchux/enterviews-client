import axios from "axios";
import constants from "../../Utils/constants";

const API_URL = "/api/user";

// Create user account service
const signup = async (userData) => {
	const response = await axios.post(`${API_URL}/signup`, userData);
	if (response.data) {
		localStorage.setItem(
			constants.LS.TOKEN,
			JSON.stringify(response.data.data.token)
		);
	}
	return response.data.data.token;
};

// Sign user in to account service
const signin = async (userData) => {
	const response = await axios.post(`${API_URL}/signin`, userData);
	if (response.data) {
		localStorage.setItem(
			constants.LS.TOKEN,
			JSON.stringify(response.data.data.token)
		);
	}
	return response.data.data.token;
};

// Get user details using token service
const account = async (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(`${API_URL}/me`, config);
	if (response.data) {
		localStorage.setItem(constants.LS.USER, JSON.stringify(response.data.data));
	}
	return response.data.data;
};

const authService = {
	signup,
	signin,
	account,
};

export default authService;
