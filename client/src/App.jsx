import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import PrivateRoute from './routes/PrivateRoutes';
import { FormLogin } from './components';
import { ErrorPage, Home } from './pages';



export function App() {

	return (
    <BrowserRouter>
			<AppRoutes/>
		</BrowserRouter>
	);
}
