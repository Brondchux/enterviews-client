import { configureStore } from "@reduxjs/toolkit";
import interviewSlice from "./modules/interview";
import interviewsSlice from "./modules/interviews";
import modalSlice from "./modules/modal";
import authSlice from "./modules/auth";
import { signup, signin, account } from "./modules/auth";

export const thunks = {
	signup,
	signin,
	account,
};

export const actions = {
	interview: interviewSlice.actions,
	interviews: interviewsSlice.actions,
	modal: modalSlice.actions,
	auth: authSlice.actions,
};

export default configureStore({
	reducer: {
		interview: interviewSlice.reducer,
		interviews: interviewsSlice.reducer,
		modal: modalSlice.reducer,
		auth: authSlice.reducer,
	},
});
