import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth";

const initialState = {
	user: null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: "",
};

// Create user account
export const signup = createAsyncThunk(
	"auth/signup",
	async (user, thunkAPI) => {
		try {
			return await authService.signup(user);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Sign user into account
export const signin = createAsyncThunk(
	"auth/signin",
	async (user, thunkAPI) => {
		try {
			return await authService.signin(user);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signup.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(signup.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(signin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(signin.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			});
	},
});

export default authSlice;
