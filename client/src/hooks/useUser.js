import { toast } from 'react-toastify';
import { useUserStore } from '../store/user';
import { config } from '../config';
import { useNavigate } from 'react-router-dom';

export function useUser() {
  const user = useUserStore(state => state.user);
  const { token } = useUserStore()
  const { apiUrl } = config;
  const navigate = useNavigate()

  const editUserData = () => {}
  const deleteProfile = async (id) => {
    const result = await toast.promise(fetch(`${apiUrl}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    {
      pending: 'Eliminando Cuenta...',
      success: 'Cuenta eliminada, hasta pronto...',
      error: 'Ocurrió un error...'
    })
    const response = await result.json()
    .then(()=> localStorage.clear())
    .then(()=>location.reload())
  }

  return {
    user,
    editUserData,
    deleteProfile
  };
}
