import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import PetForm from './components/testPetForm/PetForm';

export function App() {

	return (
		<div>
			<PetForm />
		</div>
		// <HashRouter>
		// 	<AppRoutes />
		// </HashRouter>
	);
}
