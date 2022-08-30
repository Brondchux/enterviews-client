import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// get user from localstorage
const lsUser = JSON.parse(localStorage.getItem("ESVU"));

const initialState = {
	user: lsUser ? lsUser : null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: "",
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: () => {},
});

export default authSlice;
