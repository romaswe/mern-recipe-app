import { Ingrediens } from '../../../../../entities/recipes';
import './ingrediens.css';

const IngrediensComponent = (props: any) => {
	const setingrediensList = props.setingrediensList;
	const ingrediensList = props.ingrediensList;

	interface formItem {
		name: string;
		value: string;
	}

	// handle input change
	const handleIngrediensInputChange = (e: any, index: number) => {
		const item: formItem = e.target;
		const list = [...ingrediensList];
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

		setingrediensList(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...ingrediensList];
		list.splice(index, 1);
		setingrediensList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setingrediensList([
			...ingrediensList,
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
			<h4>Ingredienser</h4>
			{ingrediensList.map((x: Ingrediens, i: number) => {
				return (
					<div className='row' key={i}>
						<div className='col-12'>
							<input
								name='name'
								placeholder='Skriv Namn'
								value={x.name}
								onChange={(e) =>
									handleIngrediensInputChange(e, i)
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
									handleIngrediensInputChange(e, i)
								}
							/>

							<select
								className=''
								name='unit'
								placeholder='Skriv Enhet'
								value={x.unit}
								onChange={(e) =>
									handleIngrediensInputChange(e, i)
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
							{ingrediensList.length !== 1 && (
								<button
									className='remove-button'
									onClick={() => handleRemoveClick(i)}
								>
									Ta bort
								</button>
							)}
							{ingrediensList.length - 1 === i && (
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

export default IngrediensComponent;
