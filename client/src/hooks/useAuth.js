import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserStore } from '../store/user';

export function useAuth() {
	const registerAndLogin = useUserStore(state => state.registerAndLogin);
  const login = useUserStore(state => state.login);
  const navigate = useNavigate();

	const registerAndLoginToPetPal  = async (data) => {
    try {
      await toast.promise(registerAndLogin(data),
        {
          pending: 'Enviando...',
          success: 'Registro exitoso!. Ingresando...',
          error: 'Error en el Servidor',
        });
      navigate('/profile');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginToPetPal = async (userData) => {
    try {
      await toast.promise(login(userData),
      {
        pending: 'Ingresando...',
        success: 'Ingreso correcto',
        error: 'Usuario o contraseña incorrectos',
      });
      navigate('/profile');
    } catch (error) {
      toast.error(error.message);
    }
  };

	return {
		registerAndLoginToPetPal,
    loginToPetPal,
	};
}
