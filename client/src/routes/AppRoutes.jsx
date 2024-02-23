import { Routes, Route } from 'react-router-dom';
import { FormLogin, PetForm } from '../components';
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
				<Route path="/petform" element={
					<PrivateRoute>
						<PetForm/>
					</PrivateRoute>}/>
				<Route path='*' element={<ErrorPage/>}/>
			</Routes>
		</>
	)
}
