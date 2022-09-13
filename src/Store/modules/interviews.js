import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import interviewsServices from "../services/interviews";

const initialState = {
	interviews: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

const interviewsSlice = createSlice({
	name: "interviews",
	initialState,
	reducers: {
		setInterviews(state, { payload }) {
			state.interviews = payload;
		},
		reset(state) {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getInterviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInterviews.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.interviews = action.payload;
			})
			.addCase(getInterviews.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addInterview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addInterview.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.interviews = null;
			})
			.addCase(addInterview.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

// Get user interviews
export const getInterviews = createAsyncThunk(
	"interviews/getInterviews",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token;
			return await interviewsServices.getInterviews(token);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Add user interview
export const addInterview = createAsyncThunk(
	"interviews/addInterview",
	async (interviewData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token;
			return await interviewsServices.addInterview(interviewData, token);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export default interviewsSlice;
