import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import instance from '../app/module/instance';

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const code = searchParams.get('code');

  const googleLogin = async () => {
    try {
      const { data } = await instance.get(`/auth/google/callback?code=${code}`);

      localStorage.setItem('token', data.user.token);
      localStorage.setItem('nickname', data.user.nickname);
      localStorage.setItem('userKey', data.user.userKey);

      navigate('/main', { state: 'select' });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    googleLogin();
  }, []);

  return <div>로그인 페이지</div>;
};

export default GoogleRedirect;
