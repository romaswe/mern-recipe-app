import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GroupRecipes, GroupRecipesList } from '../../../entities/groupRecipes';
import { JwtData } from '../../../entities/jwt';
import { isAdmin } from '../../../utils/userUtils';
import { GroupRecipeCard } from './groupRecipesCard/groupRecipesCard';

const GroupRecipesListComponent = (props: any) => {
	const [error, setError] = useState('');
	const [groupRecipeDoc, setGroupRecipeDoc] = useState<GroupRecipesList>();
	const [groupRecipesList, setGroupRecipesList] = useState<GroupRecipes[]>();
	const [groupRecipeIdList, setGroupRecipeIdList] = useState<String[]>();
	const decodedJWT: JwtData = props.jwtData;

	const handleDeleteClick = async () => {
		console.log('Do the delete: ' + groupRecipeIdList);

		if (groupRecipeIdList) {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
				data: {
					ids: groupRecipeIdList,
				},
			};
			try {
				await axios.delete(`/api/admin/bulkDeleteGroupRecipes`, config);
				fetchGroupRecipesList();
				setGroupRecipeIdList([]);
			} catch (error: any) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
				setTimeout(() => {
					setError('');
				}, 5000);
			}
		}
	};
	const fetchMoreData = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};
		if (groupRecipeDoc?.data.hasNextPage) {
			try {
				const { data } = await axios.get(
					`/api/private/getGroupRecipespage=${groupRecipeDoc?.data.nextPage}`,
					config
				);
				const mData: GroupRecipesList = data;
				setGroupRecipeDoc(mData);
				if (groupRecipesList) {
					const newArray = [...groupRecipesList, ...mData.data.docs];
					setGroupRecipesList(newArray);
				}
			} catch (error: any) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		}
	};

	const fetchGroupRecipesList = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		try {
			const { data } = await axios.get(
				'/api/private/getGroupRecipes',
				config
			);
			const mData: GroupRecipesList = data;
			setGroupRecipeDoc(mData);
			setGroupRecipesList(mData.data.docs);
		} catch (error: any) {
			console.log(error.response.data.error);
			setError(error.response.data.error);
		}
	};

	useEffect(() => {
		fetchGroupRecipesList();
	}, []);

	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='col-12'>
			{groupRecipeDoc?.data && (
				<div className='row'>
					{isAdmin(decodedJWT) && (
						<div className='col-12'>
							<button
								className='remove-button'
								onClick={handleDeleteClick}
							>
								Delete {groupRecipeIdList?.length ?? '0'} marked
								recipes
							</button>
						</div>
					)}
					<div className='col-12'>
						<InfiniteScroll
							dataLength={groupRecipesList?.length ?? 0} //This is important field to render the next data
							next={fetchMoreData}
							hasMore={groupRecipeDoc.data.hasNextPage}
							loader={undefined}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>Alla recept är hämtade</b>
								</p>
							}
						>
							{groupRecipesList && (
								<div className='row'>
									{groupRecipesList.map(
										(
											groupRecipe: GroupRecipes,
											i: number
										) => {
											return (
												<div
													className='col-s-12 col-12 col-xl-6'
													key={i}
												>
													<GroupRecipeCard
														groupRecipe={
															groupRecipe
														}
														setGroupRecipeIdList={
															setGroupRecipeIdList
														}
														groupRecipeIdList={
															groupRecipeIdList
														}
													/>
												</div>
											);
										}
									)}
								</div>
							)}
						</InfiniteScroll>
						{groupRecipeDoc?.data.hasNextPage && (
							<button
								className='submit-button'
								onClick={fetchMoreData}
							>
								Hämta fler recept
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default GroupRecipesListComponent;
