import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Screens
import LoginComponent from './components/login/login'
import RegisterComponent from './components/register/register';
import ForgotPasswordComponent from './components/forgotPassword/forgotPassword';
import ResetPasswordComponent from './components/resetPassword/resetPassword';
import PrivateComponent from './components/private/private';

const App = () => {
	return (
		<Router>
			<div className='app'>
				<Switch>
					<PrivateRoute exact path='/' component={PrivateComponent} />
					<Route exact path='/login' component={LoginComponent} />
					<Route exact path='/register' component={RegisterComponent} />
					<Route
						exact
						path='/forgotpassword'
						component={ForgotPasswordComponent}
					/>
					<Route
						exact
						path='/passwordreset/:resetToken'
						component={ResetPasswordComponent}
					/>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
