import { createSlice } from '@reduxjs/toolkit';

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
                "Address 1": "",
                "Address 2": "",
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
            CS: {}
        }
    },
    reducers: {
        updateData: (state, action) => {
            state.data = action.payload;
        },
        toggleEditMode: (state, action) => {
            state.isEditing = action.payload.type === "edit";
        }
    }
});

export const { updateData, toggleEditMode } = appSlice.actions;

export default appSlice.reducer;