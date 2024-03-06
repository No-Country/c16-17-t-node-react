import { useState } from 'react';

export function useUserProfile() {
  const [isVisibleModalUser, setIsVisibleModalUser] = useState(false);

  const toggleModalUser = () => setIsVisibleModalUser(state => !state);

  return {
    isVisibleModalUser,
    toggleModalUser,
  };
}
