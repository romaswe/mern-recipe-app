import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GroupRecipes, GroupRecipesList } from '../../../entities/groupRecipes';
import { GroupRecipeCard } from './groupRecipesCard/groupRecipesCard';

const GroupRecipesListComponent = (props: any) => {
	const [error, setError] = useState('');
	const [groupRecipeDoc, setGroupRecipeDoc] = useState<GroupRecipesList>();
	const [groupRecipesList, setGroupRecipesList] = useState<GroupRecipes[]>();

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

	useEffect(() => {
		const fetchGroupRecipesList = async () => {
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

		fetchGroupRecipesList();
	}, []);

	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='col-12'>
			{groupRecipeDoc?.data && (
				<div>
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
									(groupRecipe: GroupRecipes, i: number) => {
										return (
											<div
												className='col-s-12 col-12 col-xl-6'
												key={i}
											>
												<GroupRecipeCard
													groupRecipe={groupRecipe}
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
			)}
		</div>
	);
};

export default GroupRecipesListComponent;
