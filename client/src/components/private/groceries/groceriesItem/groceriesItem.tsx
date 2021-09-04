import './groceriesItem.css';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import axios from 'axios';
import { Data } from '../../../../entities/groceries';

const apiUrl = process.env.REACT_APP_BASE_URL;
export const GroceriesItem = (props: any) => {
	const grocerieName: string = props.grocerieName;
	const groceriesList = props.groceriesList;
	const setGroceriesList = props.setGroceriesList;
	const setGroceriesInfo = props.setGroceriesInfo;
	const groceriesInfo = props.groceriesInfo;

	const handleAddClick = async () => {
		var tempList = groceriesList.data.groceries;
		const indexToDelete = tempList.indexOf(grocerieName);
		tempList.splice(indexToDelete, 1);

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		const grocerie: Data = {
			name: 'MyList',
			groceries: tempList,
		};

		try {
			const { data } = await axios.put(
				apiUrl + '/api/private/groceries',
				grocerie,
				config
			);

			setGroceriesList({
				...groceriesList,
				data: {
					groceries: tempList,
				},
			});
			setGroceriesInfo({
				...groceriesInfo,
				data: {
					size: tempList.length,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='col-s-12 col-6'>
			<div className='grocerie-name-wrapper row'>
				<div className='col-10'>
					<p>{grocerieName}</p>
				</div>
				<div className='col-2 button-wrapper'>
					<button
						className='remove-grocerie-button'
						onClick={handleAddClick}
					>
						<RiDeleteBin2Fill />
					</button>
				</div>
			</div>
		</div>
	);
};
