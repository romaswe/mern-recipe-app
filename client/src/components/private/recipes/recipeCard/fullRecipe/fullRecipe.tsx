import axios from 'axios';
import { useState } from 'react';
import { Data } from '../../../../../entities/groceries';
import { Ingrediens, Recipes } from '../../../../../entities/recipes';
import './fullRecipe.css';

const apiUrl = process.env.REACT_APP_BASE_URL;
export const FullRecipe = (props: any) => {
	const recipe: Recipes = props.recipe;
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleAddClick = async () => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
			};
			let listToAdd: Array<string> = [];
			if (recipe.ingrediens) {
				recipe.ingrediens.map((ingredient: Ingrediens, i: number) => {
					return listToAdd.push(
						`${ingredient.amount}${ingredient.unit} ${ingredient.name}`
					);
				});

				if (listToAdd) {
					const grocerie: Data = {
						name: 'MyList',
						groceries: listToAdd,
					};
					const { data } = await axios.post(
						apiUrl + '/api/private/groceries',
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

	const checkArray = (array: Array<string>) => {
		if (array.length > 0) {
			return true;
		}
		return false;
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
							<p>Länk till receptet</p>
						</a>
					</div>
				)}
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
											<div className='col-s-3 col-3'>
												<p>
													{ingredient.amount}{' '}
													{ingredient.unit}
												</p>
											</div>
											<div className='col-s-9 col-9'>
												<p>{ingredient.name}</p>
											</div>
										</div>
									</div>
								);
							}
						)}
					</div>
				)}
				{error && <span className='error-message'>{error}</span>}
				{success && <span className='success-message'>{success}</span>}
				<button className='submit-button' onClick={handleAddClick}>
					Lägg till inköpslistan
				</button>
			</div>
			<div className='col-6'>
				{recipe.instructions && checkArray(recipe.instructions) && (
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
