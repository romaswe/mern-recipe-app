import './forgotPassword.css';
import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL;
const ForgotPasswordComponent = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const forgotPasswordHandler = async (e: any) => {
		e.preventDefault();

		const config: AxiosRequestConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await axios.post(
				apiUrl + '/api/auth/forgotpassword',
				{ email },
				config
			);

			setSuccess(data.data);
		} catch (error: any) {
			setError(error.response.data.error);
			setEmail('');
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div className='forgotpassword-screen grid'>
			<div className='col-s-0 col-3'></div>
			<div className='col-s-12 col-6 form-wrapper'>
				<form
					onSubmit={forgotPasswordHandler}
					className='forgotpassword-screen__form'
				>
					<h3 className='forgotpassword-screen__title'>
						Forgot Password
					</h3>
					{error && <span className='error-message'>{error}</span>}
					{success && (
						<span className='success-message'>{success}</span>
					)}
					<div className='form-group '>
						<p className='forgotpassword-screen__subtext'>
							Please enter the email address you register your
							account with.
						</p>
						<p className='forgotpassword-screen__subtext'>
							This function is still under development, Please
							contact the administrator to get your password reset
							link
						</p>
						<label
							htmlFor='email'
							className='forgotpassword-email-label'
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
					<button type='submit' className='standard-button'>
						Send Email
					</button>
				</form>
			</div>
			<div className='col-s-0 col-3'></div>
		</div>
	);
};

export default ForgotPasswordComponent;
