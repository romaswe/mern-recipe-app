import axios from 'axios';
import { useEffect, useState } from 'react';
import { User, UserJSON } from '../../../../entities/users';
import './manageRoles.css';
import { UserCardComponent } from './userCard/userCard';

const apiUrl = process.env.REACT_APP_BASE_URL;
export const ManageRolesComponent = () => {
	const [userList, setUserList] = useState<UserJSON>();
	const [error, setError] = useState('');
	useEffect(() => {
		const fetchUserList = async () => {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
			};

			try {
				const { data } = await axios.get(
					apiUrl + '/api/private/getUsers',
					config
				);
				setUserList(data);
			} catch (error: any) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		};
		fetchUserList();
	}, []);

	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='row'>
			<div className='col-12'>
				<h3>Users</h3>
			</div>

			<div className='col-12'>
				{userList?.data && (
					<div className='row'>
						{userList?.data.map((user: User, i: number) => {
							return (
								<div className='col-s-12 col-6' key={i}>
									<UserCardComponent user={user} />
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};
