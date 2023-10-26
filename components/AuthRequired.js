import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import Cookies from 'js-cookie';

export default function AuthRequired({ children, nextPage = '' }) {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (!token) {
      Cookies.remove('token');
      // Redirect to login page
      Router.replace('/login').then((_) => console.log('Go to login'));
    } else if (token && !!nextPage) {
      Router.push(nextPage).then((_) => console.log(`Go to ${nextPage}`));
    }
  }, [token, nextPage]);

  return (
    <React.Fragment>{token ? children : <h2>Loading...</h2>}</React.Fragment>
  );
}
