import axios from 'axios';
import { useEffect, useState } from 'react';
import { Recipes, RecipesListJSON } from '../../../entities/recipes';
import { RecipeCard } from './recipeCard/recipeCard';
import InfiniteScroll from 'react-infinite-scroll-component'; // npm i react-infinite-scroll-component
import './recipesList.css';
import { isAdmin } from '../../../utils/userUtils';
import { JwtData } from '../../../entities/jwt';

const RecipesListComponent = (props: any) => {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [recipesList, setRecipesList] = useState<Recipes[]>();
	const [recipeDoc, setRecipeDoc] = useState<RecipesListJSON>();
	const [recipeIdList, setRecipeIdList] = useState<String[]>();
	const decodedJWT: JwtData = props.jwtData;
	const [groupRecipeName, setGroupRecipeName] = useState('');
	const [recipeDescription, setRecipeDescription] = useState('');
	const [recipeNotes, setRecipeNotes] = useState('');

	const handleAddToGroupClick = async (e: any) => {
		e.preventDefault();

		const groupRecipe = {
			groupName: groupRecipeName.trim(),
			description: recipeDescription.trim() ?? '',
			notes: recipeNotes.trim() ?? '',
			recipes: recipeIdList ?? [],
		};
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		try {
			const { data } = await axios.post(
				'/api/admin/setGroupRecipes',
				groupRecipe,
				config
			);

			setSuccess(data.data);
			clearFields();
		} catch (error: any) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	const clearFields = () => {
		setRecipeNotes('');
		setRecipeDescription('');
		setGroupRecipeName('');
	};

	const handleDeleteClick = async () => {
		console.log('Do the delete: ' + recipeIdList);

		if (recipeIdList) {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
				data: {
					ids: recipeIdList,
				},
			};
			try {
				await axios.delete(`/api/admin/bulkDeleteRecipes`, config);
				fetchRecipesList();
			} catch (error: any) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
				setTimeout(() => {
					setError('');
				}, 5000);
			}
		}
	};

	const fetchRecipesList = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		try {
			const { data } = await axios.get('/api/private/recipes', config);
			const mData: RecipesListJSON = data;
			setRecipeDoc(mData);
			setRecipesList(mData.data.docs);
		} catch (error: any) {
			console.log(error.response.data.error);
			setError(error.response.data.error);
		}
	};

	const fetchMoreData = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};
		if (recipeDoc?.data.hasNextPage) {
			try {
				const { data } = await axios.get(
					`/api/private/recipes?page=${recipeDoc?.data.nextPage}`,
					config
				);
				const mData: RecipesListJSON = data;
				setRecipeDoc(mData);
				if (recipesList) {
					const newArray = [...recipesList, ...mData.data.docs];
					setRecipesList(newArray);
				}
			} catch (error: any) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		}
	};

	useEffect(() => {
		fetchRecipesList();
	}, []);
	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='col-12'>
			{success && <span className='success-message'>{success}</span>}

			{recipeDoc?.data && (
				<div className='row'>
					{isAdmin(decodedJWT) && (
						<div className='col-12'>
							<h3>Skapa en grupp av recept</h3>
							<div className='row'>
								<form
									className='row'
									onSubmit={handleAddToGroupClick}
								>
									<div className='input-wrapper'>
										<input
											className='col-6'
											type='text'
											required
											id='name'
											autoComplete='true'
											placeholder='Skriv Namn'
											onChange={(e) =>
												setGroupRecipeName(
													e.target.value
												)
											}
											value={groupRecipeName}
										/>
									</div>
									<div className='input-wrapper'>
										<input
											className='col-6'
											type='text'
											id='description'
											autoComplete='true'
											placeholder='Skriv beskrivning'
											onChange={(e) =>
												setRecipeDescription(
													e.target.value
												)
											}
											value={recipeDescription}
										/>
									</div>
									<div className='input-wrapper'>
										<input
											className='col-6'
											type='text'
											id='notes'
											autoComplete='true'
											placeholder='Skriv notis'
											onChange={(e) =>
												setRecipeNotes(e.target.value)
											}
											value={recipeNotes}
										/>
									</div>
									<div className='col-12'>
										<button
											type='submit'
											className='submit-button'
										>
											Add {recipeIdList?.length ?? '0'}{' '}
											marked recipes to group
										</button>
									</div>
								</form>
							</div>
							<div className='col-12'>
								<button
									className='remove-button'
									onClick={handleDeleteClick}
								>
									Delete {recipeIdList?.length ?? '0'} marked
									recipes
								</button>
							</div>
						</div>
					)}
					<div className='col-12'>
						<InfiniteScroll
							dataLength={recipesList?.length ?? 0} //This is important field to render the next data
							next={fetchMoreData}
							hasMore={recipeDoc.data.hasNextPage}
							loader={undefined}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>Alla recept är hämtade</b>
								</p>
							}
						>
							{recipesList && (
								<div className='row'>
									{recipesList.map(
										(recipe: Recipes, i: number) => {
											return (
												<div
													className='col-s-12 col-6 col-xl-3'
													key={i}
												>
													<RecipeCard
														recipe={recipe}
														setRecipeIdList={
															setRecipeIdList
														}
														recipeIdList={
															recipeIdList
														}
													/>
												</div>
											);
										}
									)}
								</div>
							)}
						</InfiniteScroll>
						{recipeDoc?.data.hasNextPage && (
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

export default RecipesListComponent;
