import axios from 'axios';
import { useState } from 'react';
import { Ingrediens, Recipes } from '../../../../entities/recipes';
import MeasurementsComponent from '../../mesaurement/measurement';
import IngrediensComponent from './ingrediens/ingrediens';
import './recipes.css';
import StepsComponent from './steps/steps';

const RecipesComponent = () => {
	const apiUrl = process.env.REACT_APP_BASE_URL;
	const [ingrediensList, setingrediensList] = useState<Ingrediens[]>([
		{ name: '', amount: '', unit: '' },
	]);
	const [stepsList, setstepsList] = useState<string[]>(['']);
	const [recipeName, setRecipeName] = useState('');
	const [recipeURL, setRecipeURL] = useState('');
	const [recipeNotes, setRecipeNotes] = useState('');

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

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
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		try {
			const { data } = await axios.post(
				apiUrl + '/api/private/recipes',
				recipe,
				config
			);

			setSuccess(data.data);
			clearFields();
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
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
			{error && <span className='error-message'>{error}</span>}
			{success && <span className='success-message'>{success}</span>}
			<h3>Lägg till nytt recept</h3>
			<form className='recipe-form' onSubmit={submitRecipe}>
				<div className='name-input-wrapper'>
					<input
						className='col-6'
						type='text'
						required
						id='name'
						autoComplete='true'
						placeholder='Skriv Namn'
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
						placeholder='Skriv URL'
						onChange={(e) => setRecipeURL(e.target.value)}
						value={recipeURL}
					/>
				</div>

				<div className='notes-input-wrapper'>
					<textarea
						className='col-6'
						id='notes'
						autoComplete='true'
						placeholder='Skriv notiser'
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
				<div className='submit-wrapper'>
					<button type='submit' className='submit-button'>
						Spara
					</button>
				</div>
			</form>

			<MeasurementsComponent />
		</div>
	);
};

export default RecipesComponent;
