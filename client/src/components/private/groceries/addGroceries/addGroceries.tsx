import axios from 'axios';
import { useState } from 'react';
import { Data } from '../../../../entities/groceries';
import './addGroceries.css';

const apiUrl = process.env.REACT_APP_BASE_URL;
export const AddGroceries = (props: any) => {
	const groceriesList = props.groceriesList;
	const setGroceriesList = props.setGroceriesList;

	const [addGrocerie, setAddGrocerie] = useState('');
	const [error, setError] = useState('');
	const handleAddClick = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		const grocerie: Data = {
			name: 'MyList',
			groceries: [addGrocerie],
		};
		try {
			const { data } = await axios.post(
				apiUrl + '/api/private/groceries',
				grocerie,
				config
			);

			// TODO: We need to refresh the list in grocerie view
			setAddGrocerie('');
		} catch (error) {
			console.log(error);
			setError(error.response.data.error);
		}
	};

	return (
		<div className='col-s-12 col-6'>
			<div className='add-grocerie-wrapper row'>
				<div className='col-12'>
					<h3>Lägg till inköpslistan</h3>
					{error && <span className='error-message'>{error}</span>}
				</div>
				<div className='col-6'>
					<input
						name='add'
						placeholder='Lägg till'
						value={addGrocerie}
						required
						onChange={(e) => setAddGrocerie(e.target.value)}
					/>
				</div>
				<div className='col-s-12 col-6 add-grocerie-button'>
					<button className='add-button' onClick={handleAddClick}>
						Lägg till
					</button>
				</div>
			</div>
		</div>
	);
};
