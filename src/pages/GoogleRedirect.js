import React, { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import instance from '../app/module/instance';

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  const googleLogin = useCallback(async () => {
    try {
      const { data } = await instance.get(`/auth/google/callback?code=${code}`);

      localStorage.setItem('token', data.user.token);
      localStorage.setItem('nickname', data.user.nickname);
      localStorage.setItem('userKey', data.user.userKey);

      navigate('/main', { state: 'select' });
    } catch (error) {
      console.log(error);
    }
  }, [code, navigate]);

  useEffect(() => {
    googleLogin();
  }, [googleLogin]);

  return <div>로그인 페이지</div>;
};

export default GoogleRedirect;
