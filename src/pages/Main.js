import React, { useEffect, useInsertionEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainSelect from '../components/features/main/MainSelect';
import MainWorry from '../components/features/main/MainWorry';
import WriteButton from '../components/elements/WriteButton';
import Footer from '../components/common/Footer';
import { useDispatch } from 'react-redux';
import { kakaoLoginThunk } from '../app/module/kakaoSlice';

const Main = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();

  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');

  useEffect(() => {
    dispatch(kakaoLoginThunk(code));
  }, [dispatch]);

  const writeButtonHandler = () => {
    navigate('/write', { state });
  };

  return (
    <>
      {state === 'select' ? <MainSelect /> : <MainWorry />}
      <WriteButton onClick={writeButtonHandler} />
      {localStorage.getItem('token') ? null : (
        <button onClick={() => navigate('/login')}>로그인</button>
      )}

      <Footer />
    </>
  );
};

export default Main;
