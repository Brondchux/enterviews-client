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

// Add user interview service
const addInterview = async (interviewData, token) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(API_URL, interviewData, config);
	return response.data.data;
};

const interviewsServices = {
	getInterviews,
	addInterview,
};

export default interviewsServices;
