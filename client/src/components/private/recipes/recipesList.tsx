import axios from 'axios';
import { useEffect, useState } from 'react';
import { Recipe, RecipesListJSON } from '../../../entities/recipes';
import { RecipeCard } from './recipeCard/recipeCard';
import './recipesList.css';

const apiUrl = process.env.REACT_APP_BASE_URL;
const RecipesListComponent = () => {
	const [error, setError] = useState('');
	const [recipesList, setRecipesList] = useState<RecipesListJSON>();

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
					apiUrl + '/api/private/recipes',
					config
				);
				setRecipesList(data);
			} catch (error) {
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
			{recipesList?.data ? (
				<div className='row'>
					{recipesList?.data.map((recipe: Recipe, i: number) => {
						return (
							<div className='col-s-12 col-6 col-xl-3' key={i}>
								<RecipeCard recipe={recipe} />
							</div>
						);
					})}
				</div>
			) : (
				<div className='col-12'>
					<p>Just nu finns det inga recept att visa</p>
				</div>
			)}
		</div>
	);
};

export default RecipesListComponent;
