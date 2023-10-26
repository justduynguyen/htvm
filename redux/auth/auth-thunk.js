import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { callAsync } from '../helpers';
import { makeCustomHeaders } from '../../utils/utilities';
import { ApiAuthenticateLogin } from '@/utils/endpoints';

export const authValidate = createAsyncThunk('auth/validate', async () => {
  const asyncCall = axios.get(ApiAuthenticateValidate, {
    headers: makeCustomHeaders(),
  });
  return await callAsync(asyncCall);
});

export const authLogin = createAsyncThunk(
  'auth/login',
  async (request, thunkAPI) => {
    const asyncCall = axios.post(ApiAuthenticateLogin, request, {
      headers: makeCustomHeaders(),
    });
    return await callAsync(asyncCall);
  }
);
