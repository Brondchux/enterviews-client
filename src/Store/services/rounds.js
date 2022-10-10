import axios from "axios";
import constants from "../../Utils/constants";

const API_URL = `${constants.API_HOST}/api/rounds`;

// Fetch interview rounds service
const getRounds = async ({ interviewId = 0 }, token) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(`${API_URL}/${interviewId}`, config);
	return response.data.data;
};

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
	const response = await axios.delete(API_URL, { data, headers });
	return response.data.data;
};

const roundServices = {
	getRounds,
	completeRound,
	deleteRound,
};

export default roundServices;
