import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authValidate } from './auth-thunk';

const initialState = {
  token: '',
  loginError: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    clearToken: (state) => {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(authValidate.pending, (state, action) => {
    //   state.isValidated = false;
    // });
    // builder.addCase(authValidate.fulfilled, (state, action) => {
    //   const response = action.payload;
    //   if (response?.error) {
    //     state.isValidated = true;
    //     state.isAuthenticated = false;
    //     return;
    //   }
    //   state.isValidated = true;
    //   state.isAuthenticated = response.data;
    // });

    builder.addCase(authLogin.pending, (state, action) => {
      state.loginError = '';
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      const response = action.payload;
      console.log(response);
      if (response?.error) {
        state.loginError = response.error;
        return;
      }
      state.token = response?.data || '';
      state.loginError = '';
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearToken } = authSlice.actions;

export default authSlice.reducer;
