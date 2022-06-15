import { createSlice } from '@reduxjs/toolkit';

export const viewerSlice = createSlice({
    name: "viewer",
    initialState: {
        view: "BS"
    },
    reducers: {
        toggleView: (state, action) => {
            state.view = action.payload;
        }
    }
});

export const { toggleView } = viewerSlice.actions;

export default viewerSlice.reducer;