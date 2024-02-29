import { useState } from 'react';
import { useAuth } from './';

export function useFormLogin() {
  const [invalid, setInvalid] = useState({ email: null, password: null });
  const { loginToPetPal } = useAuth();

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const userData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    if (userData.email === '' || userData.password === '') {
      setInvalid({
        email: userData.email === '' ? 'Por favor ingresar email' : null,
        password: userData.password === '' ? 'Por favor ingresar contraseña' : null,
      });
      return;
    }

    loginToPetPal(userData);
  };

  return {
    invalid,
    handleSubmitLogin,
  };
};
