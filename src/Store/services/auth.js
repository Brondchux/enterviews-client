import axios from "axios";
import constants from "../../Utils/constants";

const API_URL = `${constants.API_HOST}/api/user`;

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

// Sign out user service
const signout = () => {
	localStorage.removeItem(constants.LS.USER);
	localStorage.removeItem(constants.LS.TOKEN);
	localStorage.removeItem(constants.LS.INTERVIEW);
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
	signout,
	account,
};

export default authService;
