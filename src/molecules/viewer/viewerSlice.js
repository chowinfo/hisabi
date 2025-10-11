import { createSlice } from '@reduxjs/toolkit';
import { updateURLParam, getParamFromUrl } from "@/app/helpers";

export const viewerSlice = createSlice({
    name: "viewer",
    initialState: {
        sheet: getParamFromUrl("sheet")
    },
    reducers: {
        toggleSheet: (state, action) => {
            state.sheet = action.payload;
            updateURLParam("sheet", action.payload);
        }
    }
});

export const { toggleSheet } = viewerSlice.actions;

export default viewerSlice.reducer;