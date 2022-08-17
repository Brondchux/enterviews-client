import { createSlice } from "@reduxjs/toolkit";

const initialState = { interview: null };
const interviewSlice = createSlice({
	name: "interview",
	initialState,
	reducers: {
		setInterview(state, { payload }) {
			state.interview = payload;
		},
	},
});

export default interviewSlice;
