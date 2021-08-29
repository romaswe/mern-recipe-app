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

	return (
		<div>
			<h3>Ingrediens</h3>
			{ingrediensList.map((x: Ingrediens, i: number) => {
				return (
					<div className='row' key={i}>
						<div className='col-12'>
							<input
								name='name'
								placeholder='Enter Name'
								value={x.name}
								onChange={(e) =>
									handleIngrediensInputChange(e, i)
								}
							/>
							<input
								className=''
								name='amount'
								placeholder='Enter amount'
								value={x.amount}
								onChange={(e) =>
									handleIngrediensInputChange(e, i)
								}
							/>
							<input
								className=''
								name='unit'
								placeholder='Enter unit'
								value={x.unit}
								onChange={(e) =>
									handleIngrediensInputChange(e, i)
								}
							/>
						</div>
						<div className='btn-box col-12'>
							{ingrediensList.length !== 1 && (
								<button
									className='remove-button'
									onClick={() => handleRemoveClick(i)}
								>
									Remove
								</button>
							)}
							{ingrediensList.length - 1 === i && (
								<button
									className='add-button'
									onClick={handleAddClick}
								>
									Add
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
