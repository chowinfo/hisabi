import { configureStore } from '@reduxjs/toolkit';
import viewerReducer from '../features/viewer/viewerSlice';
import editorReducer from '../features/editor/editorSlice';
import appReducer from './appReducer';

export default configureStore({
	reducer: { viewer: viewerReducer, editor: editorReducer, app: appReducer },
});
