import axios from "axios";
import constants from "../../Utils/constants";

const API_URL = "/api/user";

// Create user account service
const signup = async (userData) => {
	const response = await axios.post(`${API_URL}/signup`, userData);
	if (response.data) {
		localStorage.setItem(constants.LS.USER, JSON.stringify(response.data.data));
	}
	return response.data;
};

// Sign user in to account service
const signin = async (userData) => {
	const response = await axios.post(`${API_URL}/signin`, userData);
	if (response.data) {
		localStorage.setItem(constants.LS.USER, JSON.stringify(response.data.data));
	}
	return response.data;
};

const authService = {
	signup,
	signin,
};

export default authService;
