import { configureStore } from "@reduxjs/toolkit";
import interviewSlice from "./modules/interview";
import interviewsSlice from "./modules/interviews";
import modalSlice from "./modules/modal";

export const actions = {
	interview: interviewSlice.actions,
	interviews: interviewsSlice.actions,
	modal: modalSlice.actions,
};

export default configureStore({
	reducer: {
		interview: interviewSlice.reducer,
		interviews: interviewsSlice.reducer,
		modal: modalSlice.reducer,
	},
});
