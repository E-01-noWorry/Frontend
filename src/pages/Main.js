import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainSelect from '../components/features/main/MainSelect';
import MainRoom from '../components/features/main/MainRoom';
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
      <div>
        <h1>로고</h1>
        <div>알람 아이콘</div>
      </div>
      {state === 'room' ? <MainRoom /> : <MainSelect />}
      <WriteButton onClick={writeButtonHandler} />
      <Footer />
    </>
  );
};

export default Main;
