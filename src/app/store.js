import { configureStore } from '@reduxjs/toolkit';
import viewerReducer from '../features/viewer/viewerSlice';
import appReducer from './appReducer';

export default configureStore({
    reducer: { viewer: viewerReducer, app: appReducer },
});