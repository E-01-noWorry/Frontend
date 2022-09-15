import React, { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import instance from '../app/module/instance';

import Loading from './Loading';

const GoogleRedirect = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  const googleLogin = useCallback(async () => {
    try {
      const { data } = await instance.get(`/auth/google/callback?code=${code}`);

      localStorage.setItem('token', data.user.token);
      localStorage.setItem('nickname', data.user.nickname);
      localStorage.setItem('userKey', data.user.userKey);

      window.location.assign('/');
    } catch (error) {
      console.log(error);
    }
  }, [code]);

  useEffect(() => {
    googleLogin();
  }, [googleLogin]);

  return <Loading />;
};

export default GoogleRedirect;
