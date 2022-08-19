import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showModal: false,
	options: { description: null, proceedAction: null, proceedData: null },
};
const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setShowModal(state, { payload }) {
			state.showModal = payload;
		},
		setOptions(state, { payload }) {
			state.options = payload;
		},
	},
});

export default modalSlice;
