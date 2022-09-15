import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLoginThunk } from '../app/module/kakaoSlice';

const KakaoRedirect = () => {
  const dispatch = useDispatch();

  let params = new URL(document.URL).searchParams;
  let code = params.get('code');

  useEffect(() => {
    dispatch(kakaoLoginThunk(code));
  }, [dispatch]);

  return <p>잠시만 기다려 주세요! 로그인 중입니다.</p>;
};

export default KakaoRedirect;
