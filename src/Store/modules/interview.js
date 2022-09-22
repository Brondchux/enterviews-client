import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import interviewServices from "../services/interview";

const initialState = {
	interview: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

const interviewSlice = createSlice({
	name: "interview",
	initialState,
	reducers: {
		setInterview(state, { payload }) {
			state.interview = payload;
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
			.addCase(endInterview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(endInterview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.interview = { ...state.interview, ...payload };
			})
			.addCase(endInterview.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			})
			.addCase(deleteInterview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteInterview.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.interview = null;
			})
			.addCase(deleteInterview.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			});
	},
});

// End interview process
export const endInterview = createAsyncThunk(
	"interview/endInterview",
	async (interviewData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token;
			return await interviewServices.endInterview(interviewData, token);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Delete interview process
export const deleteInterview = createAsyncThunk(
	"interview/deleteInterview",
	async (interviewData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token;
			return await interviewServices.deleteInterview(interviewData, token);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export default interviewSlice;
