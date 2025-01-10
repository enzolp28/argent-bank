import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  email: string;
  firstName: string;
  lastName: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  email: '',
  firstName: '',
  lastName: '',
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<{ email: string; firstName: string; lastName: string }>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.error = null;
    },
  },
});

export const { setProfile, setProfileLoading, setProfileError, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
