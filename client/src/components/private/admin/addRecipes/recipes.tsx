import { useState } from 'react';
import { Ingrediens, Recipes } from '../../../../entities/recipes';
import IngrediensComponent from './ingrediens/ingrediens';
import './recipes.css';
import StepsComponent from './steps/steps';

const RecipesComponent = () => {
	const [ingrediensList, setingrediensList] = useState<Ingrediens[]>([
		{ name: '', amount: '', unit: '' },
	]);
	const [stepsList, setstepsList] = useState<string[]>(['']);
	const [recipeName, setRecipeName] = useState('');
	const [recipeURL, setRecipeURL] = useState('');
	const [recipeNotes, setRecipeNotes] = useState('');

	const submitRecipe = async (e: any) => {
		e.preventDefault();
		const recipe: Recipes = {
			name: recipeName,
			url: recipeURL,
			notes: recipeNotes,
			ingrediens: ingrediensList,
			instructions: stepsList,
		};

		console.log(recipe);
		console.log(JSON.stringify(recipe));
		clearFields(); // Add if succes to add in DB else dont clear
	};

	const clearFields = () => {
		setingrediensList([{ name: '', amount: '', unit: '' }]);
		setstepsList(['']);
		setRecipeName('');
		setRecipeURL('');
		setRecipeNotes('');
	};

	return (
		<div className='add-recipes-wrapper col-12'>
			<h3>Add a new recipe</h3>
			<form onSubmit={submitRecipe}>
				<div className='name-input-wrapper'>
					<input
						className='col-6'
						type='text'
						required
						id='name'
						autoComplete='true'
						placeholder='Enter Name'
						onChange={(e) => setRecipeName(e.target.value)}
						value={recipeName}
					/>
				</div>

				<div className='url-input-wrapper'>
					<input
						className='col-6'
						type='url'
						id='url'
						autoComplete='true'
						placeholder='Enter URL'
						onChange={(e) => setRecipeURL(e.target.value)}
						value={recipeURL}
					/>
				</div>

				<div className='notes-input-wrapper'>
					<textarea
						className='col-6'
						id='notes'
						autoComplete='true'
						placeholder='Enter Notes'
						onChange={(e) => setRecipeNotes(e.target.value)}
						value={recipeNotes}
					/>
				</div>
				<div className='dynamic'>
					<IngrediensComponent
						ingrediensList={ingrediensList}
						setingrediensList={setingrediensList}
					/>
					<StepsComponent
						stepsList={stepsList}
						setstepsList={setstepsList}
					/>
				</div>
				<button type='submit' className='submit-button'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default RecipesComponent;
