import { useState } from 'react';
import { Recipes } from '../../../../entities/recipes';
import { FullRecipe } from './fullRecipe/fullRecipe';
import './recipeCard.css';

export const RecipeCard = (props: any) => {
	const recipe: Recipes = props.recipe;
	const [showRecipe, setShowRecipe] = useState(false);

	const handleOnclick = () => {
		console.log('clicked');
		console.log(recipe.name);
		setShowRecipe(!showRecipe);
	};

	return (
		<div className='col-12 recipe-card-wrapper'>
			<div
				className='recipe-card-header'
				onClick={() => {
					handleOnclick();
				}}
			>
				<h3>{recipe.name}</h3>
				<p>{recipe.description}</p>
			</div>

			{showRecipe && (
				<div className='col-12'>
					<hr className='rounded'></hr>
					<FullRecipe recipe={recipe} />
				</div>
			)}
		</div>
	);
};
