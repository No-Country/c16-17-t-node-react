// import { HashRouter } from 'react-router-dom';
// import { AppRoutes } from './routes/AppRoutes';

import FormLogin from "./components/formLogin/FormLogin";

export function App() {

	return (
		<div className="w-[900px] flex justify-center items-center p-5 m-auto">
			<FormLogin />
		</div>
		// <HashRouter>
		// 	<AppRoutes />
		// </HashRouter>
	);
}
