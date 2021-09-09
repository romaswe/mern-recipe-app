import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { GrocerisObj } from '../../../../entities/groceries';
import { JwtData } from '../../../../entities/jwt';
import { isViewer } from '../../../../utils/userUtils';
import './addGroceries.css';

export const AddGroceries = (props: any) => {
	const groceriesList = props.groceriesList;
	const setGroceriesList = props.setGroceriesList;
	const setGroceriesInfo = props.setGroceriesInfo;
	const groceriesInfo = props.groceriesInfo;

	const [addGrocerie, setAddGrocerie] = useState('');
	const [error, setError] = useState('');

	const handleAddClick = async () => {
		var token = localStorage.getItem('authToken') ?? '';
		const jwtData: JwtData = jwt_decode(token);
		setError('');
		if (isViewer(jwtData)) {
			alert("Du kan inte använda denna funktion, läs mer under 'om'");
			return;
		}

		if (!addGrocerie) {
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
				groceries: [{ name: addGrocerie, amount: 1 }],
			};
			await axios.post('/api/private/groceries', grocerie, config);

			if (groceriesList.data) {
				setGroceriesList({
					...groceriesList,
					data: {
						groceries: [
							...groceriesList.data.groceries,
							{ name: addGrocerie, amount: 1 },
						],
					},
				});

				setGroceriesInfo({
					...groceriesInfo,
					data: {
						size: groceriesList.data.groceries.length + 1,
					},
				});
			} else {
				setGroceriesList({
					...groceriesList,
					data: {
						groceries: [{ name: addGrocerie, amount: 1 }],
					},
				});

				setGroceriesInfo({
					...groceriesInfo,
					data: {
						size: 1,
					},
				});
			}

			setAddGrocerie('');
		} catch (error: any) {
			console.log(error);
			setError(error?.response?.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
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
