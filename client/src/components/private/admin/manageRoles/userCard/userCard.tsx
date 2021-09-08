import axios from 'axios';
import { useState } from 'react';
import { User } from '../../../../../entities/users';
import './userCard.css';

export const UserCardComponent = (props: any) => {
	const user: User = props.user;
	interface formItem {
		name: string;
		value: string;
	}
	const [userRole, setuserRole] = useState(user.role);
	const [error, setError] = useState('');
	const handleChangeRole = async (e: any) => {
		const item: formItem = e.target;
		setuserRole(item.value);

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		const body = {
			userID: user._id,
			role: item.value,
		};

		try {
			await axios.put('/api/private/changeUserRole', body, config);
		} catch (error: any) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};
	return (
		<div className='row user-card-wrapper'>
			<div className='col-12'>
				<h4>
					{user.email} ({user.username})
				</h4>
				{error && <span className='error-message'>{error}</span>}
				<select
					name='role'
					value={userRole}
					onChange={(e) => handleChangeRole(e)}
				>
					<option value='admin'>Admin</option>
					<option value='user'>User</option>
					<option value='viewer'>Viewer</option>
				</select>
			</div>

			{user.resetPasswordToken && (
				<div className='col-12'>
					<hr className='rounded'></hr>
					<h4>Återställ Lösenord</h4>
					<a href='recipe.forsth.dev/passwordreset/{user.resetPasswordToken}'>
						Reset link
					</a>
					<p>Giltig till: {user.resetPasswordExpire}</p>
				</div>
			)}
		</div>
	);
};
