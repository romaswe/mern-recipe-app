import { RouteComponentProps } from 'react-router-dom';
import './publicRecipe.css';

type Props = {
	recipeName: string;
};
export const PublicRecipeComponent = ({
	match,
}: RouteComponentProps<Props>) => {
	return (
		<div className='somenametest'>
			<p>yoyo: {match.params.recipeName}</p>
		</div>
	);
};
