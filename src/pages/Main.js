import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/common/Header';
import MainRoom from '../components/features/main/MainRoom';
import MainSelect from '../components/features/main/MainSelect';
import WriteButton from '../components/elements/WriteButton';
import Footer from '../components/common/Footer';

import { IconLarge } from '../shared/themes/iconStyle';

import { ModalBasic } from '../components/common/Modal';

import IconArm from '../static/icons/Variety=arm, Status=untab.svg';

import styled from 'styled-components';

const Main = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [modal, setModal] = useState('');

  const writeButtonHandler = () => {
    if (localStorage.getItem('token')) {
      navigate('/write', { state });
    } else {
      setModal('로그인 후 사용 가능합니다.');
    }
  };

  return (
    <>
      {modal && <ModalBasic setter={() => setModal('')}>{modal}</ModalBasic>}

      <Header>
        <StLogo>로고</StLogo>
        <StIcon>
          <img src={IconArm} />
        </StIcon>
      </Header>

      {state === 'room' ? <MainRoom /> : <MainSelect />}

      <WriteButton onClick={writeButtonHandler} />

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
`;
