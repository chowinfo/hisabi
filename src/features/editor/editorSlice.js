import { createSlice } from '@reduxjs/toolkit';

export const editorSlice = createSlice({
    name: "editor",
    initialState: {
        edit: "TPL"
    },
    reducers: {
        toggleEdit: (state, action) => {
            state.edit = action.payload;
        }
    }
});

export const { toggleEdit } = editorSlice.actions;

export default editorSlice.reducer;