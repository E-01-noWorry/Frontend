import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { kakaoLoginThunk } from '../app/module/kakaoSlice';

import Loading from './Loading';

const KakaoRedirect = () => {
  const dispatch = useDispatch();

  let params = new URL(document.URL).searchParams;
  let code = params.get('code');

  useEffect(() => {
    dispatch(kakaoLoginThunk(code));
  }, [dispatch]);

  return <Loading />;
};

export default KakaoRedirect;
