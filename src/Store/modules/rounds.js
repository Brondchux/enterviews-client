import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roundsServices from "../services/rounds";

const initialState = {
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	rounder: null,
};

const roundSlice = createSlice({
	name: "rounds",
	initialState,
	reducers: {
		setRounds(state, action) {
			state.rounder = action.payload;
		},
		reset(state) {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getRounds.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRounds.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.rounder = action.payload;
			})
			.addCase(getRounds.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(completeRound.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(completeRound.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.rounder = action.payload;
			})
			.addCase(completeRound.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteRound.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteRound.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.rounder = null;
			})
			.addCase(deleteRound.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

// Fetch interview rounds
export const getRounds = createAsyncThunk(
	"rounds/getRounds",
	async (interviewData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token;
			return await roundsServices.getRounds(interviewData, token);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Mark round as completed
export const completeRound = createAsyncThunk(
	"rounds/completeRound",
	async (roundData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token;
			return await roundsServices.completeRound(roundData, token);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Delete interview round
export const deleteRound = createAsyncThunk(
	"rounds/deleteRound",
	async (roundData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token;
			return await roundsServices.deleteRound(roundData, token);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export default roundSlice;
