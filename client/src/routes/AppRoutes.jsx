import { Routes, Route } from 'react-router-dom';
import { FormLogin } from '../components';
import { ErrorPage, Home } from '../pages';
import PrivateRoute from './PrivateRoutes';

export function AppRoutes() {

	return (
		<>	
			<Routes>
				<Route path="/login" element={<FormLogin/>}/>
				<Route path="/home" element={
					<PrivateRoute>
						<Home/>
					</PrivateRoute>}/>
				<Route path='*' element={<ErrorPage/>}/>
			</Routes>
		</>
	)
}
