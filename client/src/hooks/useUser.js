import { useUserStore } from '../store/user';

export function useUser() {
  const user = useUserStore(state => state.user);

  return {
    user,
  };
}
