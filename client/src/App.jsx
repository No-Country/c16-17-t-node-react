import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
	return (
		<HashRouter>
			<AppRoutes />
		</HashRouter>
	);
}
