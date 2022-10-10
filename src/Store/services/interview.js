import axios from "axios";
import constants from "../../Utils/constants";

const API_URL = `${constants.API_HOST}/api/interviews`;

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

// Delete interview process service
const deleteInterview = async (data, token) => {
	const headers = {
		"Content-type": "application/json",
		Authorization: `Bearer ${token}`,
	};
	const response = await axios.delete(API_URL, { data, headers });
	return response.data.data;
};

const interviewServices = {
	endInterview,
	deleteInterview,
};

export default interviewServices;
