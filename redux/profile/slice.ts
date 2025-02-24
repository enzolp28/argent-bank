import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ResponseProfile {
  status: number;
  message: string;
  body: {
    email: string;
    firstName: string;
    lastName: string;
  }
}

interface Profile {
  firstName: string;
  lastName: string;
}
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
    setProfile: (state, action: PayloadAction<Profile>) => {
      const { firstName, lastName } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
    },

    clearProfile: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.error = null;
    }
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
