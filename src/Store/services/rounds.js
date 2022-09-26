import axios from "axios";

const API_URL = "/api/rounds";

// Mark as complete service
const completeRound = async (roundData, token) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.put(API_URL, roundData, config);
	return response.data.data;
};

// Delete interview round service
const deleteRound = async (data, token) => {
	const headers = {
		"Content-type": "application/json",
		Authorization: `Bearer ${token}`,
	};
	const response = await axios.delete(API_URL, data, headers);
	return response.data.data;
};

const roundServices = {
	completeRound,
	deleteRound,
};

export default roundServices;
