import './resetPassword.css';
import { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL;

type Props = {
	resetToken: string;
};

const ResetPasswordComponent = ({ match }: RouteComponentProps<Props>) => {
	//	const history = useHistory();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const resetPasswordHandler = async (e: any) => {
		e.preventDefault();

		const config: AxiosRequestConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		if (password !== confirmPassword) {
			setPassword('');
			setConfirmPassword('');
			setTimeout(() => {
				setError('');
			}, 5000);
			return setError("Passwords don't match");
		}

		try {
			const { data } = await axios.put(
				apiUrl + `/api/auth/resetpassword/${match.params.resetToken}`,
				{
					password,
				},
				config
			);

			console.log(data);
			setSuccess(data.data);
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div className='resetpassword-screen grid'>
			<div className='col-s-0 col-3'></div>
			<div className='col-s-12 col-6 form-wrapper'>
				<form
					onSubmit={resetPasswordHandler}
					className='resetpassword-screen__form'
				>
					<h3 className='resetpassword-screen__title'>
						Forgot Password
					</h3>
					{error && <span className='error-message'>{error} </span>}
					{success && (
						<span className='success-message'>
							{success} <Link to='/login'>Login</Link>
						</span>
					)}
					<div className='form-group row'>
						<label
							htmlFor='password'
							className='form-text-align form-text-align-center col-s-12 col-3'
						>
							New Password:
						</label>
						<input
							type='password'
							required
							id='password'
							placeholder='Enter new password'
							autoComplete='true'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='form-group row'>
						<label
							htmlFor='confirmpassword'
							className='form-text-align col-s-12 col-3'
						>
							Confirm New Password:
						</label>
						<input
							type='password'
							required
							id='confirmpassword'
							placeholder='Confirm new password'
							autoComplete='true'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<button type='submit' className='standard-button'>
						Reset Password
					</button>
				</form>
			</div>
			<div className='col-s-0 col-3'></div>
		</div>
	);
};

export default ResetPasswordComponent;
