import { createSlice } from '@reduxjs/toolkit';
import { getParamFromUrl } from "@/app/helpers";

export const editorSlice = createSlice({
    name: "editor",
    initialState: {
        sheet: getParamFromUrl("sheet")
    },
    reducers: {
        toggleEdit: (state, action) => {
            state.sheet = action.payload;
        }
    }
});

export const { toggleEdit } = editorSlice.actions;

export default editorSlice.reducer;