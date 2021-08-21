import { Redirect, Route } from 'react-router-dom';
//TODO: This should be converted to Typescript
const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('authToken') ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};

export default PrivateRoute;
