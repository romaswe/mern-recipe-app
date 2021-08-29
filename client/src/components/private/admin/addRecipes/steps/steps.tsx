import './steps.css';

const StepsComponent = (props: any) => {
	const setstepsList = props.setstepsList;
	const stepsList = props.stepsList;

	interface formItem {
		name: string;
		value: string;
	}

	// handle input change
	const handleStepsInputChange = (e: any, index: number) => {
		const item: formItem = e.target;
		const list = [...stepsList];
		switch (item.name) {
			case 'step':
				list[index] = item.value;
				break;
			default:
				break;
		}

		setstepsList(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...stepsList];
		list.splice(index, 1);
		setstepsList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setstepsList([...stepsList, '']);
	};

	return (
		<div>
			<h4>Steg</h4>
			{stepsList.map((x: string, i: number) => {
				return (
					<div className='row' key={i}>
						<div className='col-12'>
							<input
								name='step'
								placeholder='Skriv steg'
								value={x}
								onChange={(e) => handleStepsInputChange(e, i)}
							/>
						</div>
						<div className='btn-box col-12'>
							{stepsList.length !== 1 && (
								<button
									className='remove-button'
									onClick={() => handleRemoveClick(i)}
								>
									Ta bort
								</button>
							)}
							{stepsList.length - 1 === i && (
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

export default StepsComponent;
