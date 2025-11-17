import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
