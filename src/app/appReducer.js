import { createSlice } from '@reduxjs/toolkit';
import { getParamFromUrl, updateURLParam } from "@/app/helpers";

const initialData = {
    year: 2021,
    Info: {
        Name: 'XYZ',
        'Trade Name': 'ABC Pvt Ltd',
        PAN: 'AAAAA12345A',
        'Address 1': 'Line 1',
        'Address 2': 'Line 2',
    },
    T: {
        To: {
            'Opening Stock': 10450,
        },
        By: {
            'Closing Stock': 10650,
        },
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
};

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        // isEditing: false,
        template: getParamFromUrl("template"),
        data: localStorage.getItem('hisabi.data') ? JSON.parse(localStorage.getItem('hisabi.data')) : initialData,
    },
    reducers: {
        updateData: (state, action) => {
            state.data = action.payload;
            localStorage.setItem('hisabi.data', JSON.stringify(action.payload));
        },
        toggleTemplate: (state, action) => {
            state.template = action.payload.type;
            updateURLParam("template", action.payload.type);
        },
        updateSheet: (state, action) => {
            const { key, value, sheet } = action.payload;
            sheet.split('.').reduce((o, i) => o[i], state.data)[key] = value;
        },
        updateSheetKey: (state, action) => {
            const { key, newKey, sheet } = action.payload;
            const currentSheet = sheet.split('.').reduce((o, i) => o[i], state.data);
            if (key !== newKey && Object.keys(currentSheet).includes(newKey)) {
                console.error('Key already exists');
                return;
            }
            const newSheet = Object.keys(currentSheet).reduce((o, i) => {
                if (i === key) {
                    o[newKey] = currentSheet[i];
                } else {
                    o[i] = currentSheet[i];
                }
                return o;
            }, {});
            sheet.split('.').reduce((o, i, index) => {
                if (index === sheet.split('.').length - 1) {
                    o[i] = newSheet;
                } else {
                    o[i] = o[i] || {};
                }
                return o[i];
            }, state.data);
        },
        addSheetRow: (state, action) => {
            const { key, value, sheet } = action.payload;
            sheet.split('.').reduce((o, i) => o[i], state.data)[key] = value;
        },
    },
});

export const { updateData, toggleTemplate, updateSheet, updateSheetKey, addSheetRow } = appSlice.actions;

export default appSlice.reducer;
