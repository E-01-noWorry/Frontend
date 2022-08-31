import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainSelect from '../components/features/main/MainSelect';
import MainWorry from '../components/features/main/MainWorry';
import WriteButton from '../components/elements/WriteButton';
import Footer from '../components/common/Footer';

const Main = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const writeButtonHandler = () => {
    navigate('/write', { state });
  };

  return (
    <>
      {state === 'select' ? <MainSelect /> : <MainWorry />}
      <WriteButton onClick={writeButtonHandler} />
      <button onClick={() => navigate('/login')}>로그인</button>
      <Footer />
    </>
  );
};

export default Main;
