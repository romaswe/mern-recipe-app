import { Recipes } from '../../../../entities/recipes';
import './recipeCard.css';

export const RecipeCard = (props: any) => {
	const recipe: Recipes = props.recipe;

	const handleOnclick = () => {
		console.log('clicked');
		console.log(recipe.name);
	};

	return (
		<div
			className='col-12 recipe-card-wrapper'
			onClick={() => {
				handleOnclick();
			}}
		>
			<h3>{recipe.name}</h3>
			<p>{recipe.description}</p>
		</div>
	);
};
