import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import instance from '../app/module/instance';

import Header from '../components/common/Header';
import MainRoom from '../components/features/main/MainRoom';
import MainSelect from '../components/features/main/MainSelect';
import WriteButton from '../components/elements/WriteButton';
import Footer from '../components/common/Footer';
import { ModalBasic, ModalWrite } from '../components/common/Modal';

import { IconLarge } from '../shared/themes/iconStyle';

import IconArm from '../static/icons/Variety=arm, Status=untab.svg';
import Logo from '../static/images/Logo.svg';

import styled from 'styled-components';

const Main = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const deviceToken = sessionStorage.getItem('deviceToken');
  const userKey = localStorage.getItem('userKey');

  const [modal, setModal] = useState('');
  const [writeModal, setWriteModal] = useState(false);

  const postDeviceToken = useCallback(async () => {
    if (userKey && deviceToken) {
      try {
        instance.post('/token', { deviceToken });
      } catch (error) {
        console.log(error.response.data.errMsg);
      }
    }
  }, [deviceToken]);

  useEffect(() => {
    postDeviceToken();
  }, [postDeviceToken]);

  const writeButtonHandler = () => {
    if (localStorage.getItem('token') && state === 'select') {
      setWriteModal(true);
    } else if (localStorage.getItem('token') && state === 'room') {
      navigate('/write', { state });
    } else {
      setModal('로그인 후 사용 가능합니다.');
    }
  };

  return (
    <>
      {writeModal && (
        <ModalWrite
          setter={() => setWriteModal(false)}
          write={() => navigate('/write', { state })}
        />
      )}

      {modal && <ModalBasic setter={() => setModal('')}>{modal}</ModalBasic>}

      <Header>
        <StLogo>
          <img src={Logo} alt="Logo" />
        </StLogo>
        <StIcon>
          <img src={IconArm} alt="IconArm" />
        </StIcon>
      </Header>

      {state === 'room' ? <MainRoom /> : <MainSelect />}

      <WriteButton onClick={writeButtonHandler} state={state} />

      <Footer state={state} />
    </>
  );
};

export default Main;

const StLogo = styled.div`
  display: flex;
  align-items: center;

  height: 3.6rem;

  img {
    height: 100%;
  }
`;

const StIcon = styled.div`
  ${IconLarge};
`;
