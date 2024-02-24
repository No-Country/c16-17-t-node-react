import { Routes, Route } from 'react-router-dom';
import { FormLogin } from '../components';
import { ErrorPage, Home, PetFormView, PetProfile } from '../pages';
import PrivateRoute from './PrivateRoutes';
import FormRegistry from '../components/testFormRegUser/FormRegistry';



export function AppRoutes() {

	return (
		<>	
			<Routes>
				<Route path="/login" element={<FormLogin/>}/>
				<Route path="/registro" element={<FormRegistry/>}/>
				<Route path="/petform" element={
					<PrivateRoute>
						<PetFormView/>
					</PrivateRoute>
					}/>
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
