import RecipiesComponent from './addRecipes/recipes';
import './admin.css';
import { ManageRolesComponent } from './manageRoles/manageRoles';

const AdminComponent = () => {
	return (
		<div className='row'>
			<div className='col-s-12 col-6'>
				<RecipiesComponent />
			</div>
			<div className='col-s-12 col-6'>
				<ManageRolesComponent />
			</div>
		</div>
	);
};

export default AdminComponent;
