import { Routes, Route } from 'react-router-dom';
import { Footer, FormLogin, Navbar } from '../components';
import { ErrorPage, Home, MyPets, PetFormView, PetProfile } from '../pages';
import PrivateRoute from './PrivateRoutes';
import FormRegistry from '../components/testFormRegUser/FormRegistry';

export function AppRoutes() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/login" element={<FormLogin />} />
				<Route path="/registro" element={<FormRegistry />} />
				<Route
					path="/petform"
					element={
						<PrivateRoute>
							<PetFormView />
						</PrivateRoute>
					}
				/>
				<Route
					path="/pets/:id"
					element={
						<PrivateRoute>
							<PetProfile />
						</PrivateRoute>
					}
				/>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path='/mypets'
					element={
						<PrivateRoute>
							<MyPets/>
						</PrivateRoute>
					}
				/>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
			<Footer />
		</>
	);
}
