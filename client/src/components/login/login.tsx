import './login.css';
import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Link, useHistory } from 'react-router-dom';

const LoginComponent = () => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			history.push('/');
		}
	}, [history]);

	const loginHandler = async (e: any) => {
		e.preventDefault();

		const config: AxiosRequestConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await axios.post(
				'/api/auth/login',
				{ email, password },
				config
			);

			localStorage.setItem('authToken', data.token);

			history.push('/');
		} catch (error: any) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div className='login-screen grid'>
			<div className='col-s-0 col-3'></div>
			<div className='col-s-12 col-6 form-wrapper'>
				<form onSubmit={loginHandler} className='login-screen__form'>
					<h3 className='login-screen__title'>Login</h3>
					{error && <span className='error-message'>{error}</span>}
					<div className='form-group row'>
						<label htmlFor='email' className='col-12'>
							Email:
						</label>
						<div className='email-input-wrapper col-12'>
							<input
								type='email'
								required
								id='email'
								placeholder='Email address'
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								tabIndex={1}
							/>
						</div>
					</div>
					<div className='form-group row'>
						<label htmlFor='password' className='col-12'>
							Password:{' '}
							<Link
								to='/forgotpassword'
								className='login-screen__forgotpassword'
							>
								Forgot Password?
							</Link>
						</label>
						<div className='password-input-wrapper col-12'>
							<input
								className='col-6'
								type='password'
								required
								id='password'
								autoComplete='true'
								placeholder='Enter password'
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								tabIndex={2}
							/>
						</div>
					</div>
					<div className='button-wrapper col-12'>
						<button
							type='submit'
							className='standard-button col-s-12 col-6 col-xl-3'
							tabIndex={3}
						>
							Login
						</button>
					</div>
					<div className='register-wrapper row'>
						<span className='login-screen__subtext col-12'>
							Don't have an account?{' '}
							<Link to='/register'>Register</Link>
						</span>
					</div>
				</form>
			</div>
			<div className='col-s-0 col-3'></div>
		</div>
	);
};

export default LoginComponent;
