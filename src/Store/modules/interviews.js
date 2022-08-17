import { createSlice } from "@reduxjs/toolkit";

const initialState = { interviews: null };
const interviewsSlice = createSlice({
	name: "interviews",
	initialState,
	reducers: {
		setInterviews(state, { payload }) {
			state.interviews = payload;
		},
	},
});

export default interviewsSlice;
