import axios from "axios";
import constants from "../../Utils/constants";

const API_URL = "/api/user";

// Register user service
const signup = async (userData) => {
	const response = await axios.post(`${API_URL}/signup`, userData);
	if (response.data) {
		localStorage.setItem(constants.LS.USER, JSON.stringify(response.data.data));
	}
	return response.data;
};

const authService = {
	signup,
};

export default authService;
