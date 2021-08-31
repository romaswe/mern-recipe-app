import './groceriesItem.css';

export const GroceriesItem = (props: any) => {
	const grocerieName: string = props.grocerieName;

	return (
		<div className='col-s-12 col-6'>
			<div className='grocerie-name-wrapper'>
				<p>{grocerieName}</p>
			</div>
		</div>
	);
};
