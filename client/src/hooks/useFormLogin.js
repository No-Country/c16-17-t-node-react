import { useAuth } from './';

export function useFormLogin() {
  const { loginToPetPal } = useAuth();

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const userData = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    loginToPetPal(userData);
  };

  return {
    handleSubmitLogin,
  };
};
