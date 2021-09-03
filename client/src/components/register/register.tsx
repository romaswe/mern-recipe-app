import './register.css';
import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Link, useHistory } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_BASE_URL;

const RegisterComponent = () => {
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const registerHandler = async (e: any) => {
		e.preventDefault();

		const config: AxiosRequestConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		if (password !== confirmpassword) {
			setPassword('');
			setConfirmPassword('');
			setTimeout(() => {
				setError('');
			}, 5000);
			console.log('Passwords do not match');
			return setError('Passwords do not match');
		}

		try {
			const { data } = await axios.post(
				apiUrl + '/api/auth/register',
				{
					username,
					email,
					password,
				},
				config
			);

			localStorage.setItem('authToken', data.token);

			history.push('/');
		} catch (error any) {
			console.log(error.response.data.error);
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div className='register-screen grid'>
			<div className='col-s-0 col-3'></div>
			<div className='col-s-12 col-6 form-wrapper'>
				<form
					onSubmit={registerHandler}
					className='register-screen__form'
				>
					<h3 className='register-screen__title'>Register</h3>
					{error && <span className='error-message'>{error}</span>}
					<div className='form-group row'>
						<label htmlFor='name' className='form-text-align col-6'>
							Username:
						</label>
						<input
							type='text'
							required
							id='name'
							placeholder='Enter username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className='form-group row'>
						<label
							htmlFor='email'
							className='form-text-align col-6'
						>
							Email:
						</label>
						<input
							type='email'
							required
							id='email'
							placeholder='Email address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='form-group row'>
						<label
							htmlFor='password'
							className='form-text-align col-s-12 col-6'
						>
							Password:
						</label>
						<input
							type='password'
							required
							id='password'
							autoComplete='true'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='form-group row'>
						<label
							htmlFor='confirmpassword'
							className='form-text-align col-6'
						>
							Confirm Password:
						</label>
						<input
							type='password'
							required
							id='confirmpassword'
							autoComplete='true'
							placeholder='Confirm password'
							value={confirmpassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className='button-wrapper col-12'>
						<button type='submit' className='standard-button'>
							Register
						</button>
					</div>
					<span className='register-screen__subtext'>
						Already have an account? <Link to='/login'>Login</Link>
					</span>
				</form>
			</div>
			<div className='col-s-0 col-3'></div>
		</div>
	);
};

export default RegisterComponent;
