import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';
import { authApi } from './auth/api';
import { profileApi } from './profile/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;