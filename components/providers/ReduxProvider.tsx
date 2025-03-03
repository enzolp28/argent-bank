'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ReactNode, useEffect } from 'react';
import { setCredentials } from '@/redux/auth/slice';

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  useEffect(() => {
    // Check localStorage first, then sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      store.dispatch(setCredentials({ token }));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
