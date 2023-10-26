import { authLogin } from '@/redux/auth/auth-thunk';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function Login() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!token) return;
    Cookies.set('token', token, { expires: 2 });

    Router.push('/').then((_) => console.log('Go to game'));
  }, [token]);

  const onSubmit = () => {
    //TODO: authen
    dispatch(authLogin({ userName, password }));
  };
  return (
    <Card shadow={false} className='flex items-center mt-8'>
      <Typography variant='h4' color='blue-gray'>
        Đăng nhập
      </Typography>
      <div className='max-w-screen-lg mt-8 mb-2 w-80 sm:w-96'>
        <div className='flex flex-col gap-6 mb-4'>
          <Input
            type='text'
            name='userName'
            size='lg'
            label='Tài khoản'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type='password'
            name='password'
            size='lg'
            label='Mật khẩu'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={onSubmit} className='mt-6 bg-blue-600' fullWidth>
          Đăng nhập
        </Button>
      </div>
    </Card>
  );
}
