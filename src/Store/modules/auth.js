import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth";

const initialState = {
	user: null,
	token: null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
		setToken: (state, { payload }) => {
			state.token = payload;
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
				state.user = null;
				state.token = action.payload;
			})
			.addCase(signup.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
				state.token = null;
			})

			.addCase(signin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = null;
				state.token = action.payload;
			})
			.addCase(signin.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
				state.token = null;
			})

			.addCase(account.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(account.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(account.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(signout.fulfilled, (state) => {
				state.user = null;
				state.token = null;
			});
	},
});

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

// Sign out user
export const signout = createAsyncThunk("auth/signout", async () => {
	authService.signout();
});

// Get user details using token
export const account = createAsyncThunk(
	"auth/account",
	async (userToken, thunkAPI) => {
		try {
			return await authService.account(userToken);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export default authSlice;
