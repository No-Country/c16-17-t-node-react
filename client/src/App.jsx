import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import PetForm from './components/testPetForm/PetForm';

export function App() {

	return (
		<div className='flex justify-center items-center w-full h-full mt-5'>
			<PetForm />
		</div>
		// <HashRouter>
		// 	<AppRoutes />
		// </HashRouter>
	);
}
