import axios from 'axios';
import { useEffect, useState } from 'react';
import { Recipes, RecipesListJSON } from '../../../entities/recipes';
import { RecipeCard } from './recipeCard/recipeCard';
import InfiniteScroll from 'react-infinite-scroll-component'; // npm i react-infinite-scroll-component
import './recipesList.css';

const RecipesListComponent = () => {
	const [error, setError] = useState('');
	const [recipesList, setRecipesList] = useState<Recipes[]>();
	const [recipeDoc, setRecipeDoc] = useState<RecipesListJSON>();

	const fetchMoreData = async () => {
		console.log('Fetch more data');

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

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
	};

	useEffect(() => {
		const fetchRecipesList = async () => {
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
					'/api/private/recipes',
					config
				);
				const mData: RecipesListJSON = data;
				setRecipeDoc(mData);
				setRecipesList(mData.data.docs);
			} catch (error: any) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		};
		fetchRecipesList();
	}, []);
	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='col-12'>
			{recipeDoc?.data && (
				<InfiniteScroll
					dataLength={recipesList?.length ?? 0} //This is important field to render the next data
					next={fetchMoreData}
					hasMore={recipeDoc.data.hasNextPage}
					loader={
						<div style={{ textAlign: 'center' }}>
							<h3>
								Just nu går det inte att hämta mer recept om det
								inte går att scrolla
							</h3>
							<h4>Testa gärna på en mindre skärm</h4>
						</div>
					}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>Alla recept är hämtade</b>
						</p>
					}
				>
					{recipesList && (
						<div className='row'>
							{recipesList.map((recipe: Recipes, i: number) => {
								return (
									<div
										className='col-s-12 col-6 col-xl-3'
										key={i}
									>
										<RecipeCard recipe={recipe} />
									</div>
								);
							})}
						</div>
					)}
				</InfiniteScroll>
			)}
		</div>
	);
};

export default RecipesListComponent;
