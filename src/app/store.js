import { configureStore } from '@reduxjs/toolkit';
import viewerReducer from '../molecules/viewer/viewerSlice';
import editorReducer from '../molecules/editor/editorSlice';
import appReducer from './appReducer';

export default configureStore({
	reducer: { viewer: viewerReducer, editor: editorReducer, app: appReducer },
});
