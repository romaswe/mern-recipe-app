import axios from 'axios';
import { useState } from 'react';
import { Ingrediens, Recipes } from '../../../../entities/recipes';
import MeasurementsComponent from '../../mesaurement/measurement';
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
	const [recipeDescription, setRecipeDescription] = useState('');
	const [recipeCategories, setRecipeCategories] = useState('');

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [showMeasurement, setShowMeasurement] = useState(false);

	const submitRecipe = async (e: any) => {
		e.preventDefault();

		const categories = recipeCategories
			.split(',')
			.map((item) => item.trim().toLowerCase())
			.filter((e) => e);

		const recipe: Recipes = {
			name: recipeName.trim(),
			url: recipeURL.trim(),
			categories: categories,
			notes: recipeNotes.trim(),
			description: recipeDescription.trim(),
			ingrediens: ingrediensList,
			instructions: stepsList,
		};

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		try {
			const { data } = await axios.post(
				'/api/admin/recipes',
				recipe,
				config
			);

			setSuccess(data.data);
			clearFields();
		} catch (error: any) {
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
		setRecipeDescription('');
		setRecipeCategories('');
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

				<div className='categories-input-wrapper'>
					<input
						className='col-6'
						type='text'
						id='categories'
						autoComplete='true'
						placeholder='Skriv kategorier'
						onChange={(e) => setRecipeCategories(e.target.value)}
						value={recipeCategories}
					/>
				</div>
				<div className='col-12'>
					<p>Kategorier sepperaras med , tecken</p>
					<p>
						Tillgängliga kategorier är:{' '}
						<b>
							kyckling, fisk, kött, förrätt, varmrätt, efterrätt,
							soppa, gryta, bröd, bakning, fermentering,
							konservering och matlådor
						</b>
					</p>
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

				<div className='description-input-wrapper'>
					<textarea
						className='col-6'
						id='notes'
						autoComplete='true'
						placeholder='Skriv beskrivning'
						onChange={(e) => setRecipeDescription(e.target.value)}
						value={recipeDescription}
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

					<button
						type='button'
						className='standard-button'
						onClick={() => setShowMeasurement(!showMeasurement)}
					>
						Visa enhetstabeller
					</button>
				</div>
			</form>

			{showMeasurement && (
				<div className='col-12'>
					<MeasurementsComponent />
				</div>
			)}
		</div>
	);
};

export default RecipesComponent;
