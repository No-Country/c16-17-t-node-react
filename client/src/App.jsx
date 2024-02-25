import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import PrivateRoute from './routes/PrivateRoutes';
import { FormLogin } from './components';
import { ErrorPage, Home } from './pages';
import { Button } from './components/Button/Button';



export function App() {

	return (
    <BrowserRouter>
			<AppRoutes/>
      <Button color={'success'}>Ingresar</Button>
		</BrowserRouter>
	);
}
