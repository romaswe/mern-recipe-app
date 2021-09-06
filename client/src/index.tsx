import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LogRocket from 'logrocket';
import axios from 'axios';

const appVersion = process.env.REACT_APP_VERSION;
const logRocketUrl = process.env.REACT_APP_LOGROCKET ?? '';
const enviroment = process.env.REACT_APP_ENVIROMENT ?? 'prod';

if (enviroment === 'dev') {
	axios.defaults.baseURL = 'http://localhost:5000';
} else if ('prod') {
	LogRocket.init(logRocketUrl, {
		// https://docs.logrocket.com/reference
		release: appVersion,
		network: {
			requestSanitizer: (request) => {
				request.headers['Authorization'] = undefined; // remove Authorization header from logrocket
				request.headers['x-auth-token'] = undefined;
				return request;
			},
		},
	});
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
