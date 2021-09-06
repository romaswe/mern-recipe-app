import { useState } from 'react';
import { Recipes } from '../../../../entities/recipes';
import { FullRecipe } from './fullRecipe/fullRecipe';
import './recipeCard.css';

export const RecipeCard = (props: any) => {
	const recipe: Recipes = props.recipe;
	const [showRecipe, setShowRecipe] = useState(false);
	const [isHover, setIsHover] = useState(false);

	const handleOnclick = () => {
		setShowRecipe(!showRecipe);
	};

	return (
		<div
			className={`col-12 recipe-card-wrapper ${isHover && 'hover-class'}`}
		>
			<div
				className='recipe-card-header'
				onClick={() => {
					handleOnclick();
				}}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
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
