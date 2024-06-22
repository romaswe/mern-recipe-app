import { Ingredients } from '../../../../../entities/recipes';
import './ingredients.css';

const IngredientsComponent = (props: any) => {
	const setingredientsList = props.setingredientsList;
	const ingredientsList = props.ingredientsList;

	interface formItem {
		name: string;
		value: string;
	}

	// handle input change
	const handleIngredientsInputChange = (e: any, index: number) => {
		const item: formItem = e.target;
		const list = [...ingredientsList];
		switch (item.name) {
			case 'amount':
				list[index].amount = item.value;
				break;
			case 'unit':
				list[index].unit = item.value;
				break;
			case 'name':
				list[index].name = item.value;
				break;
			default:
				console.log(item);

				break;
		}

		setingredientsList(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...ingredientsList];
		list.splice(index, 1);
		setingredientsList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setingredientsList([
			...ingredientsList,
			{ name: '', amount: '', unit: '' },
		]);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const regexp = /^[0-9]/;

		if (
			e.key === 'Backspace' ||
			e.key === 'Tab' ||
			e.key === ',' ||
			e.key === '.'
		) {
			return;
		}

		if (!regexp.test(e.key)) {
			e.preventDefault();
		}
	};

	return (
		<div>
			<h4>Ingredientser</h4>
			{ingredientsList.map((x: Ingredients, i: number) => {
				return (
					<div className='row' key={i}>
						<div className='col-12'>
							<input
								name='name'
								placeholder='Skriv Namn'
								value={x.name}
								required
								onChange={(e) =>
									handleIngredientsInputChange(e, i)
								}
							/>
							<input
								className=''
								name='amount'
								type='number'
								min='0'
								step='0.01'
								placeholder='Skriv Mängd'
								value={x.amount}
								onKeyDown={(e) => handleKeyDown(e)}
								onChange={(e) =>
									handleIngredientsInputChange(e, i)
								}
							/>

							<select
								className=''
								name='unit'
								placeholder='Skriv Enhet'
								value={x.unit}
								onChange={(e) =>
									handleIngredientsInputChange(e, i)
								}
							>
								<option disabled value=''>
									{' '}
									-- Välj Enhet --{' '}
								</option>
								<option value='st'>st</option>
								<option value='g'>Gram</option>
								<option value='kg'>Kilogram</option>
								<option value='krm'>Kryddmått</option>
								<option value='tsk'>Tesked</option>
								<option value='msk'>Matsked</option>
								<option value='ml'>Milliliters </option>
								<option value='cl'>Centiliter </option>
								<option value='dl'>Deciliters</option>
								<option value='l'>Liter</option>
							</select>
						</div>
						<div className='btn-box col-12'>
							{ingredientsList.length !== 1 && (
								<button
									className='remove-button'
									onClick={() => handleRemoveClick(i)}
								>
									Ta bort
								</button>
							)}
							{ingredientsList.length - 1 === i && (
								<button
									className='add-button'
									onClick={handleAddClick}
								>
									Lägg till
								</button>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default IngredientsComponent;
