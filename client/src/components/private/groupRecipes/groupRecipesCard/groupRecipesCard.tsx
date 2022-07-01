import { useState } from 'react';
import { Recipe } from '../../../../entities/groupRecipes';
import { FullRecipe } from '../../recipes/recipeCard/fullRecipe/fullRecipe';
import './groupRecipeCard.css';

export const GroupRecipeCard = (props: any) => {
	const groupRecipe = props.groupRecipe;
	const [showRecipes, setShowRecipes] = useState(false);

	const handleOnclick = () => {
		setShowRecipes(!showRecipes);
	};
	return (
		<div className='col-12 recipe-card-wrapper'>
			<div
				className='recipe-card-header'
				onClick={() => {
					handleOnclick();
				}}
			>
				<p>Name: {groupRecipe.groupName}</p>
				<p>Description: {groupRecipe.description}</p>
				<p>Notes: {groupRecipe.notes}</p>
				<p>Number of recipes: {groupRecipe.recipes.length}</p>
			</div>
			{showRecipes && (
				<div className='col-12'>
					<hr className='rounded'></hr>
					{groupRecipe.recipes && (
						<div className='row'>
							{groupRecipe.recipes.map(
								(recipe: Recipe, i: number) => {
									return (
										<div
											className='col-s-12 col-6 col-xl-3'
											key={i}
										>
											<FullRecipe
												recipe={groupRecipe.recipes[i]}
											/>
										</div>
									);
								}
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
