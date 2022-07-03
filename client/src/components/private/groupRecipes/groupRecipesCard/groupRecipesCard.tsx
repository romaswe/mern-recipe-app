import { useEffect, useState } from 'react';
import { Recipe } from '../../../../entities/groupRecipes';
import { FullRecipe } from '../../recipes/recipeCard/fullRecipe/fullRecipe';
import './groupRecipeCard.css';

export const GroupRecipeCard = (props: any) => {
	const groupRecipe = props.groupRecipe;
	const setGroupRecipeIdList = props.setGroupRecipeIdList;
	const groupRecipeIdList: String[] = props.groupRecipeIdList;
	const [showRecipes, setShowRecipes] = useState(false);
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		if (checked) {
			console.log('Removing from list');
			const filteredItems = groupRecipeIdList.filter(
				(item) => item !== groupRecipe._id
			);
			setGroupRecipeIdList(filteredItems);
		} else {
			console.log('Adding to list');
			let newArray;
			if (groupRecipeIdList) {
				newArray = [...groupRecipeIdList, groupRecipe._id];
			} else {
				newArray = [groupRecipe._id];
			}
			setGroupRecipeIdList(newArray);
		}
		setChecked(!checked);
	};
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
				<label>
					<input
						type='checkbox'
						checked={checked}
						onChange={handleChange}
					/>
					Mark recipe
				</label>
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
