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
    setProfile: (state, action: PayloadAction<ResponseProfile>) => {
      state.email = action.payload.body?.email;
      state.firstName = action.payload.body?.firstName;
      state.lastName = action.payload.body?.lastName;
    },
    // setProfileLoading: (state, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload;
    // },
    // setProfileError: (state, action: PayloadAction<string | null>) => {
    //   state.error = action.payload;
    // },
    clearProfile: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.error = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
