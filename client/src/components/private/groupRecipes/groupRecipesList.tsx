import { useState } from 'react';

const GroupRecipesListComponent = () => {
	const [error, setError] = useState('');

	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='col-12'>heeeej</div>
	);
};

export default GroupRecipesListComponent;
