import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
	
	return (
		<>
			<BrowserRouter>
				<ToastContainer autoClose={1500} position='top-center' />
				<AppRoutes/>
			</BrowserRouter>
		</>
	);
}
