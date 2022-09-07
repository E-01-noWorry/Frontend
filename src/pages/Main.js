import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/common/Header';
import BodyPadding from '../components/common/BodyPadding';
import MainRoom from '../components/features/main/MainRoom';
import MainSelect from '../components/features/main/MainSelect';
import WriteButton from '../components/elements/WriteButton';
import Footer from '../components/common/Footer';

import { IconLarge } from '../shared/themes/iconStyle';

import styled from 'styled-components';

const Main = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const writeButtonHandler = () => {
    navigate('/write', { state });
  };

  return (
    <>
      <Header>
        <StLogo>로고</StLogo>
        <StIcon></StIcon>
      </Header>

      <BodyPadding>
        {state === 'room' ? <MainRoom /> : <MainSelect />}
        <WriteButton onClick={writeButtonHandler} />
      </BodyPadding>

      <Footer state={state} />
    </>
  );
};

export default Main;

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
