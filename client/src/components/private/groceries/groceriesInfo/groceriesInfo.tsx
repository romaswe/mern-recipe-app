import { GroceriesJson } from '../../../../entities/groceries';
import './groceriesInfo.css';

export const GroceriesInfo = (props: any) => {
	const groceriesInfo: GroceriesJson = props.groceriesInfo;

	// handle click event of the Remove button
	const handleRemoveClick = () => {
		console.log('nu tar vi bort allt');
	};
	return (
		<div className='col-s-12 col-6'>
			<div className='grocerie-info-wrapper'>
				<h4>Information</h4>
				<p>
					Antal i listan:{' '}
					{groceriesInfo && groceriesInfo.data
						? groceriesInfo?.data.size
						: '0'}
				</p>
				<div className='remove-button-wrapper'>
					<button
						className='remove-button'
						onClick={() => handleRemoveClick()}
					>
						Tabort allt i listan!
					</button>
				</div>
			</div>
		</div>
	);
};
