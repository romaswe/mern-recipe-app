import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LogRocket from 'logrocket';

const appVersion = process.env.REACT_APP_VERSION;
const logRocketUrl = process.env.REACT_APP_LOGROCKET ?? '';

// https://docs.logrocket.com/reference
LogRocket.init(logRocketUrl, {
	release: appVersion,
	network: {
		requestSanitizer: (request) => {
			request.headers['Authorization'] = undefined; // remove Authorization header from logrocket
			request.headers['x-auth-token'] = undefined;
			return request;
		},
	},
});
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
