import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
	name: "app",
	initialState: {
		isEditing: false,
		data: {
			year: 2021,
			Info: {
				Name: "XYZ",
				"Trade Name": "ABC Pvt Ltd",
				PAN: "AAAAA12345A",
				"Address 1": "Line 1",
				"Address 2": "Line 2",
			},
			T: {
				To: {},
				By: {},
			},
			PL: {
				To: {},
				By: {},
			},
			BS: {
				To: {},
				By: {},
			},
			CS: {},
		},
	},
	reducers: {
		updateData: (state, action) => {
			state.data = action.payload;
		},
		toggleEditMode: (state, action) => {
			state.isEditing = action.payload.type === "edit";
		},
		updateInfo: (state, action) => {
			const { key, value } = action.payload;
			state.data.Info[key] = value;
		},
		updateTPLTo: (state, action) => {
			const { key, value } = action.payload;
			state.data.T.To[key] = value;
		},
		updateTPLBy: (state, action) => {
			const { key, value } = action.payload;
			state.data.T.By[key] = value;
		},
		updateBSTo: (state, action) => {
			const { key, value } = action.payload;
			state.data.BS.To[key] = value;
		},
		updateBSBy: (state, action) => {
			const { key, value } = action.payload;
			state.data.BS.By[key] = value;
		},
		updateCS: (state, action) => {
			const { key, value } = action.payload;
			state.data.CS[key] = value;
		},
	},
});

export const {
	updateData,
	toggleEditMode,
	updateInfo,
	updateTPLBy,
	updateTPLTo,
	updateBSBy,
	updateBSTo,
	updateCS,
} = appSlice.actions;

export default appSlice.reducer;
