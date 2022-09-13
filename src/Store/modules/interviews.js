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
			});
	},
});

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

export default interviewsSlice;
