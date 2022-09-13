import axios from "axios";

const API_URL = "/api/interviews";

// Get user interviews service
const getInterviews = async (token) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL, config);
	return response.data.data;
};

const interviewsServices = {
	getInterviews,
};

export default interviewsServices;
