import { useAuth } from './';

export function useFormRegister() {
  const { registerAndLoginToPetPal } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const lastName = formData.get('lastName');
    const password = formData.get('password');
    const email = formData.get('email');
    const data = {
      name,
      lastName,
      email,
      password
    };
    registerAndLoginToPetPal(data);
  };

  return {
    handleSubmit,
  };
};
