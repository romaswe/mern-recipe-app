import { useState } from 'react';
import { Recipes } from '../../../../entities/recipes';
import { FullRecipe } from './fullRecipe/fullRecipe';
import './recipeCard.css';

export const RecipeCard = (props: any) => {
	const recipe: Recipes = props.recipe;
	const setRecipeIdList = props.setRecipeIdList;
	const recipeIdList: String[] = props.recipeIdList;
	const [showRecipe, setShowRecipe] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		if (checked) {
			console.log('Removing from list');
			const filteredItems = recipeIdList.filter(
				(item) => item !== recipe._id
			);
			setRecipeIdList(filteredItems);
		} else {
			console.log('Adding to list');
			let newArray;
			if (recipeIdList) {
				newArray = [...recipeIdList, recipe._id];
			} else {
				newArray = [recipe._id];
			}
			setRecipeIdList(newArray);

			// add to list
		}
		setChecked(!checked);
	};
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
				<label>
					<input
						type='checkbox'
						checked={checked}
						onChange={handleChange}
					/>
					Mark recipe
				</label>
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
