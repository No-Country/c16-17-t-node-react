import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from '../components';
import { ErrorPage, Home, LoginView, LostPetsView, MyPets, PetFormView, PetProfile, Profile } from '../pages';
import PrivateRoute from './PrivateRoutes';
import FormRegistry from '../components/testFormRegUser/FormRegistry';

export function AppRoutes() {

	return (
		<>
			<Header />
			<Routes>
				<Route path="/login" element={<LoginView />} />
				<Route path="/registro" element={<FormRegistry />} />
				<Route path="/"element={<Home />} />
				<Route path="/lostpets"element={<LostPetsView />} />
				<Route path="/pets/:id"element={<PetProfile />} />
				<Route
					path="/petform"
					element={
						<PrivateRoute>
							<PetFormView />
						</PrivateRoute>
					}
				/>
				<Route
					path='/mypets'
					element={
						<PrivateRoute>
							<MyPets/>
						</PrivateRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
			<Footer />
		</>
	);
}
