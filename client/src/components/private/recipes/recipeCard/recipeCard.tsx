import { Recipes } from '../../../../entities/recipes';
import './recipeCard.css';

export const RecipeCard = (props: any) => {
	const recipe: Recipes = props.recipe;
	return (
		<div className='col-12 recipe-card-wrapper'>
			<h3>{recipe.name}</h3>
			<p>{recipe.description}</p>
		</div>
	);
};
