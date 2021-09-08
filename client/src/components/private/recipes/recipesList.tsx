import axios from 'axios';
import { useEffect, useState } from 'react';
import { Recipes, RecipesListJSON } from '../../../entities/recipes';

import { RecipeCard } from './recipeCard/recipeCard';
import './recipesList.css';

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
					'/api/private/recipes',
					config
				);
				setRecipesList(data);
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
			{recipesList?.data && (
				<div className='row'>
					{recipesList?.data.docs.map(
						(recipe: Recipes, i: number) => {
							return (
								<div
									className='col-s-12 col-6 col-xl-3'
									key={i}
								>
									<RecipeCard recipe={recipe} />
								</div>
							);
						}
					)}
				</div>
			)}
		</div>
	);
};

export default RecipesListComponent;
