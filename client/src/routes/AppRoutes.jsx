import { Routes, Route } from 'react-router-dom';
import { FormLogin } from '../components';
import { ErrorPage, Home, PetFormView, PetProfile } from '../pages';
import PrivateRoute from './PrivateRoutes';



export function AppRoutes() {

	return (
		<>	
			<Routes>
				<Route path="/login" element={<FormLogin/>}/>
				<Route path="/petform" element={<PetFormView/>}/>
				<Route path="/pets/:id" element={
					<PrivateRoute>
						<PetProfile/>
					</PrivateRoute>
					}/>
				<Route path="/home" element={
					<PrivateRoute>
						<Home/>
					</PrivateRoute>}/>
				<Route path='*' element={<ErrorPage/>}/>
			</Routes>
		</>
	)
}
