import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Ingrediens, Recipes, SingleRecipe } from '../../entities/recipes';
import './publicRecipe.css';

type Props = {
	recipeName: string;
};
export const PublicRecipeComponent = ({
	match,
}: RouteComponentProps<Props>) => {
	const recipeName = match.params.recipeName.replaceAll('_', ' ');
	const homepageUrl = process.env.REACT_APP_HOMEPAGE_URL;
	const homepageCleanedURL = homepageUrl?.split('https://').pop();

	const [recipe, setRecipe] = useState<Recipes>();
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchRecipe = async () => {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
			};

			try {
				const { data } = await axios.get(
					`/api/public/recipe/${match.params.recipeName}`,
					config
				);
				const mData: SingleRecipe = data;
				console.log(mData);

				setRecipe(mData.data);
			} catch (error: any) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		};
		fetchRecipe();
	}, [match.params.recipeName]);

	return (
		<div className='container'>
			<nav className='navbar-fixed'>
				<ul className='navbar'>
					<li className='navbar-title'>
						<Link
							to={`/recipe/${match.params.recipeName}`}
							rel='noopener noreferrer'
						>
							<h3>{decodeURIComponent(recipeName)}</h3>
						</Link>
					</li>
				</ul>
			</nav>

			{error ? (
				<span className='error-message'>{error}</span>
			) : (
				<div>
					{recipe && (
						<div className='info-container row'>
							<div className='col-12 card'>
								<h3>{recipe?.name}</h3>
								<p>{recipe?.description}</p>
								{recipe.url && (
									<a
										href={recipe.url}
										target='_blank'
										rel='noopener noreferrer'
									>
										<h4>Länk till orginal receptet</h4>
									</a>
								)}
							</div>
							{recipe?.notes && (
								<div className='col-12 card'>
									<h3>Notiser</h3>
									{recipe.notes}
								</div>
							)}
							<div className='col-6 card'>
								{recipe.ingrediens && (
									<div>
										<h3>Ingridienser</h3>
										{recipe.ingrediens.map(
											(
												ingredient: Ingrediens,
												i: number
											) => {
												return (
													<div
														className='col-12'
														key={i}
													>
														<div className='row ingredent-row'>
															<div className='col-s-3 col-2'>
																<p>
																	{
																		ingredient.amount
																	}{' '}
																	{
																		ingredient.unit
																	}
																</p>
															</div>
															<div className='col-s-9 col-10'>
																<p>
																	{
																		ingredient.name
																	}
																</p>
															</div>
														</div>
													</div>
												);
											}
										)}
									</div>
								)}
							</div>
							<div className='col-6 card'>
								{recipe.instructions &&
									recipe.instructions.length > 0 && (
										<div>
											<h3>Instruktioner</h3>
											{recipe.instructions.map(
												(step: string, i: number) => {
													return (
														<div
															className='col-12'
															key={i}
														>
															<p>
																<b>{i + 1}.</b>{' '}
																{step}
															</p>
														</div>
													);
												}
											)}
										</div>
									)}
							</div>
						</div>
					)}
				</div>
			)}

			<div className='col-12 card'>
				<h3>För fler recept besök</h3>
				<Link to={``} rel='noopener noreferrer'>
					<h4>{homepageCleanedURL}</h4>
				</Link>
			</div>
		</div>
	);
};
