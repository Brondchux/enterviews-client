import axios from "axios";

const API_URL = "/api/interviews";

// End interview process service
const endInterview = async (interviewData, token) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.put(API_URL, interviewData, config);
	return response.data.data;
};

const interviewServices = { endInterview };

export default interviewServices;
