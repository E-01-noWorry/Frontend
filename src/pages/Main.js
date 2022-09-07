import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainSelect from '../components/features/main/MainSelect';
import MainRoom from '../components/features/main/MainRoom';
import WriteButton from '../components/elements/WriteButton';
import Footer from '../components/common/Footer';
import BodyPadding from '../components/common/BodyPadding';
import styled from 'styled-components';
import { IconLarge } from '../shared/themes/iconStyle';

const Main = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const writeButtonHandler = () => {
    navigate('/write', { state });
  };

  return (
    <>
      <StHeader>
        <StLogo>로고</StLogo>
        <StIcon></StIcon>
      </StHeader>

      <BodyPadding>
        {state === 'room' ? <MainRoom /> : <MainSelect />}
        <WriteButton onClick={writeButtonHandler} />
      </BodyPadding>

      <Footer state={state} />
    </>
  );
};

export default Main;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 2rem;

  width: 100%;
  height: 6.4rem;
`;

const StLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 9.1rem;
  height: 3.6rem;
  background-color: green;
`;

const StIcon = styled.div`
  ${IconLarge};
  background-color: green;
`;
