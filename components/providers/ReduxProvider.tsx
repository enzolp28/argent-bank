'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ReactNode, useEffect } from 'react';
import { setCredentials } from '@/redux/auth/slice';
import { setProfile } from '@/redux/profile/slice';

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  useEffect(() => {
    // Only check localStorage for persistent auth
    const token = sessionStorage.getItem('token');
    if (token) {
      store.dispatch(setCredentials({ token }));
      const firstName = sessionStorage.getItem('firstName');
      const lastName = sessionStorage.getItem('lastName');
      store.dispatch(setProfile({ firstName, lastName }));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
