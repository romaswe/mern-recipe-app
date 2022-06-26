import { useState } from 'react';
import RecipiesComponent from './addRecipes/recipes';
import './admin.css';
import { ManageRolesComponent } from './manageRoles/manageRoles';

const AdminComponent = () => {
	const [showAddRecipes, setShowAddRecipes] = useState(false);
	const [showManageRoles, setShowManageRoles] = useState(false);
	const [showGroupRecipes, setShowGroupRecipes] = useState(false);

	return (
		<div className='row'>
			<div className='col-12'>
				<button
					type='button'
					className='standard-button'
					onClick={() => setShowAddRecipes(!showAddRecipes)}
				>
					Hide/Show Add recipes
				</button>
				<button
					type='button'
					className='standard-button'
					onClick={() => setShowManageRoles(!showManageRoles)}
				>
					Hide/Show Manage roles
				</button>
				<button
					type='button'
					className='standard-button'
					onClick={() => setShowGroupRecipes(!showGroupRecipes)}
				>
					Hide/Show Group recipes
				</button>
			</div>
			{showAddRecipes && (
				<div className='col-s-12 col-6'>
					<RecipiesComponent />
				</div>
			)}
			{showManageRoles && (
				<div className='col-s-12 col-6'>
					<ManageRolesComponent />
				</div>
			)}
		</div>
	);
};

export default AdminComponent;
