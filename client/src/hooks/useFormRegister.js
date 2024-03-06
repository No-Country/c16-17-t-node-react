import { useState } from 'react';
import { useAuth } from './';

export function useFormRegister() {
  const [invalid, setInvalid] = useState({
    name: null,
    lastName: null,
    password: null,
    repeatPassword: null,
    email: null,
  });
  const { registerAndLoginToPetPal } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const telephone = formData.get('telephone');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    if (name === '' || lastName === '' || email === '' || password === '' || repeatPassword === '') {
      setInvalid({
        name: name === '' ? 'Por favor ingresa tu nombre' : null,
        lastName: lastName === '' ? 'Por favor ingresa tu apellido' : null,
        email: email === '' ? 'Por favor ingresa tu email' : null,
        password: password === '' ? 'Por favor ingresa una contraseña' : null,
        repeatPassword: repeatPassword === '' ? 'Por favor ingresa una contraseña' : null,
      });
      return;
    }

    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/).test(password)) {
      setInvalid({
        name: null,
        lastName: null,
        email: null,
        password: 'Mínimo 8 carácteres. Máximo 15. Al menos una letra mayúscula. Al menos una letra minuscúla. No espacios en blanco. Al menos 1 carácter especial',
        repeatPassword: null,
      });
      return;
    }

    if (password !== repeatPassword) {
      setInvalid({
        name: null,
        lastName: null,
        email: null,
        password: null,
        repeatPassword: 'Las contraseñas deben coincidir',
      });
      return
    }


    const data = {
      name,
      lastName,
      email,
      telephone,
      password
    };

    registerAndLoginToPetPal(data);
  };

  return {
    invalid,
    handleSubmit,
  };
};
