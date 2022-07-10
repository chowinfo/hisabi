import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './app/store';

import './index.css';
import App from './organisms/App/App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
