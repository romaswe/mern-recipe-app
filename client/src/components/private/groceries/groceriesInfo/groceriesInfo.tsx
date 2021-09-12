import axios from 'axios';
import { useState } from 'react';
import { GrocerisObj, GroceriesJson } from '../../../../entities/groceries';
import { ModalPrompt } from '../../../../entities/modalPrompt';
import { PromptEnums } from '../../../../entities/promptEnums';
import { ModalBoxComponent } from '../../../modalBox/modalBox';
import './groceriesInfo.css';

export const GroceriesInfo = (props: any) => {
	const setGroceriesInfo = props.setGroceriesInfo;
	const groceriesInfo: GroceriesJson = props.groceriesInfo;
	const groceriesList = props.groceriesList;
	const setGroceriesList = props.setGroceriesList;

	const [error, setError] = useState('');
	const [showModal, setShowModal] = useState(false);

	// handle click event of the Remove button
	const handleRemoveClick = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		const grocerie: GrocerisObj = {
			name: 'MyList',
			groceries: [],
		};

		try {
			await axios.put('/api/private/groceries', grocerie, config);

			setGroceriesList({
				...groceriesList,
				data: {
					groceries: [],
				},
			});

			setGroceriesInfo({
				...groceriesInfo,
				data: {
					size: 0,
				},
			});
		} catch (error: any) {
			console.log(error);
			setError(error.response.data.error);
		}
	};

	const modal: ModalPrompt = {
		type: PromptEnums.warning,
		headerText: 'Tabort inköpslistan',
		message:
			'Du håller nu på att ta bort allt innehåll i inköpslistan. Är du säker på att du vill göra det?',
		showModal: { set: setShowModal, get: showModal },
		negativeButton: { name: 'Tabort', action: handleRemoveClick },
	};
	return (
		<div className='col-s-12 col-6'>
			<div className='grocerie-info-wrapper'>
				<h4>Information</h4>
				{error && <span className='error-message'>{error}</span>}
				<p>
					Antal i listan:{' '}
					{groceriesInfo && groceriesInfo.data
						? groceriesInfo?.data.size
						: '0'}
					{(groceriesInfo?.data?.size ?? 0) >= 75 && (
						<h4 className='max-groceries'>
							Max antal i inköpslistan, Tabort innan du lägger
							till fler
						</h4>
					)}
				</p>
				<div className='remove-button-wrapper'>
					<button
						className='remove-button'
						onClick={() => setShowModal(!showModal)}
					>
						Tabort allt i listan!
					</button>
				</div>
			</div>
			{showModal && <ModalBoxComponent prompt={modal} />}
		</div>
	);
};
