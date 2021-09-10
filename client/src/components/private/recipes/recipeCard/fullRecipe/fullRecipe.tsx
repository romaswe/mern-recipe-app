import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Groceri, GrocerisObj } from '../../../../../entities/groceries';
import { JwtData } from '../../../../../entities/jwt';
import { Ingrediens, Recipes } from '../../../../../entities/recipes';
import { isViewer } from '../../../../../utils/userUtils';
import { GrAdd } from 'react-icons/gr';
import './fullRecipe.css';
import { Link } from 'react-router-dom';

export const FullRecipe = (props: any) => {
	const recipe: Recipes = props.recipe;
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const addToGrocerieList = async (ingredient: Ingrediens) => {
		var token = localStorage.getItem('authToken') ?? '';
		const jwtData: JwtData = jwt_decode(token);
		setError('');
		if (isViewer(jwtData)) {
			alert("Du kan inte använda denna funktion, läs mer under 'om'");
			return;
		}

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
			};
			const grocerie: GrocerisObj = {
				name: 'MyList',
				groceries: [
					{
						name: `${ingredient.amount}${ingredient.unit} ${ingredient.name}`,
						amount: 1,
					},
				],
			};
			await axios.post('/api/private/groceries', grocerie, config);
			setSuccess('Ingrediens tillagd');
			setTimeout(() => {
				setSuccess('');
			}, 5000);
		} catch (error) {
			console.log(error);
			setError(error?.response?.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	const handleAddClick = async () => {
		var token = localStorage.getItem('authToken') ?? '';
		const jwtData: JwtData = jwt_decode(token);
		if (isViewer(jwtData)) {
			alert("Du kan inte använda denna funktion, läs mer under 'om'");
			return;
		}
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
			};
			let listToAdd: Array<Groceri> = [];
			if (recipe.ingrediens) {
				recipe.ingrediens.map((ingredient: Ingrediens, i: number) => {
					return listToAdd.push({
						name: `${ingredient.amount}${ingredient.unit} ${ingredient.name}`,
						amount: 1,
					});
				});

				if (listToAdd) {
					const grocerie: GrocerisObj = {
						name: 'MyList',
						groceries: listToAdd,
					};
					await axios.post(
						'/api/private/groceries',
						grocerie,
						config
					);

					setSuccess('Ingredienserna tillagd');
					setTimeout(() => {
						setSuccess('');
					}, 5000);
				}
			}
		} catch (error: any) {
			console.log(error);
			setError(error?.response?.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div className='row'>
			<div className='col-12'>
				{recipe.url && (
					<div className='col-12 url-wrapper'>
						<h3>Hemsida</h3>
						<a
							href={recipe.url}
							target='_blank'
							rel='noopener noreferrer'
						>
							<p>Länk till orginal receptet</p>
						</a>
					</div>
				)}
				<div className='col-12 url-wrapper'>
					<Link
						to={`/recipe/${recipe.name.replaceAll(' ', '_')}`}
						target='_blank'
						rel='noopener noreferrer'
					>
						Länk till att dela receptet
					</Link>
				</div>
				{/* We dont have support for categories yet but someday we will *wink*  
        {recipe.categories && checkArray(recipe.categories) && (
					<div className='col-6'>
						<h3>Kategorier</h3>
						<div className='row'>
							{recipe.categories.map(
								(categori: string, i: number) => {
									return (
										<div
											className='col-2 url-wrapper'
											key={i}
										>
											<p>{categori}</p>
										</div>
									);
								}
							)}
						</div>
					</div>
				)} */}
			</div>

			<div className='col-6'>
				{recipe.ingrediens && (
					<div>
						<h3>Ingridienser</h3>
						{recipe.ingrediens.map(
							(ingredient: Ingrediens, i: number) => {
								return (
									<div className='col-12' key={i}>
										<div className='row ingredent-row'>
											<div className='col-3'>
												<p>
													{ingredient.amount}{' '}
													{ingredient.unit}
												</p>
											</div>
											<div className='col-6'>
												<p>{ingredient.name}</p>
											</div>
											<div className='col-3 add-grocerie-recipe-button-wrapper'>
												<button
													className='add-grocerie-recipe-button'
													onClick={() =>
														addToGrocerieList(
															ingredient
														)
													}
												>
													<GrAdd />
												</button>
											</div>
										</div>
									</div>
								);
							}
						)}
					</div>
				)}
				<div className='col-12'>
					{error && <span className='error-message'>{error}</span>}
					{success && (
						<span className='success-message'>{success}</span>
					)}
				</div>

				<button className='submit-button' onClick={handleAddClick}>
					Lägg allt i inköpslistan
				</button>
			</div>
			<div className='col-6'>
				{recipe.instructions && recipe.instructions.length > 0 && (
					<div>
						<h3>Instruktioner</h3>
						{recipe.instructions.map((step: string, i: number) => {
							return (
								<div className='col-12' key={i}>
									<p>
										<b>{i + 1}.</b> {step}
									</p>
								</div>
							);
						})}
					</div>
				)}
			</div>
			{recipe.notes && (
				<div className='col-12 url-wrapper'>
					<h3>Notiser</h3>
					<p>{recipe.notes}</p>
				</div>
			)}
		</div>
	);
};
