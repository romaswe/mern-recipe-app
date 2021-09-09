import axios from 'axios';
import { useEffect, useState } from 'react';
import { User, UserJSON } from '../../../../entities/users';
import './manageRoles.css';
import InfiniteScroll from 'react-infinite-scroll-component'; // npm i react-infinite-scroll-component
import { UserCardComponent } from './userCard/userCard';

export const ManageRolesComponent = () => {
	const [userList, setUserList] = useState<User[]>();
	const [userDoc, setUserDoc] = useState<UserJSON>();
	const [error, setError] = useState('');

	const fetchMoreData = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};
		if (userDoc?.data.hasNextPage) {
			try {
				const { data } = await axios.get(
					`/api/private/getUsers?page=${userDoc?.data.nextPage}`,
					config
				);
				const mData: UserJSON = data;
				setUserDoc(mData);
				if (userList) {
					const newArray = [...userList, ...mData.data.docs];
					setUserList(newArray);
				}
			} catch (error: any) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		}
	};

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
					'/api/private/getUsers',
					config
				);
				const mData: UserJSON = data;
				setUserDoc(mData);
				setUserList(mData.data.docs);
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
				{userDoc?.data && (
					<div>
						<InfiniteScroll
							dataLength={userList?.length ?? 0} //This is important field to render the next data
							next={fetchMoreData}
							hasMore={userDoc.data.hasNextPage}
							loader={undefined}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>Alla användare är hämtade</b>
								</p>
							}
						>
							{userList && (
								<div className='row'>
									{userList.map((user: User, i: number) => {
										return (
											<div
												className='col-s-12 col-6'
												key={i}
											>
												<UserCardComponent
													user={user}
												/>
											</div>
										);
									})}
								</div>
							)}
						</InfiniteScroll>
						{userDoc?.data.hasNextPage && (
							<button
								className='submit-button'
								onClick={fetchMoreData}
							>
								Hämta fler användare
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
