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

import IconSurvey from '../static/icons/Variety=Survey, Status=untab, Size=L.svg';
import Logo from '../static/images/Logo.svg';

import styled from 'styled-components';

const Main = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const deviceToken = sessionStorage.getItem('deviceToken');
  const userKey = localStorage.getItem('userKey');

  const [modal, setModal] = useState('');
  const [writeModal, setWriteModal] = useState(false);

  //로그인을 한 유저가 알림 허용까지 했다면 deviceToken을 서버에 보냅니다
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
    if (localStorage.getItem('accessToken') && state.now === 'select') {
      setWriteModal(true);
      document.body.style.overflow = 'hidden';
    } else if (localStorage.getItem('accessToken') && state.now === 'room') {
      navigate('/write', { state });
    } else {
      setModal('로그인 후 사용 가능합니다.');
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <>
      {writeModal && (
        <ModalWrite
          setter={() => {
            setWriteModal(false);
            document.body.style.overflow = 'unset';
          }}
          write={() => {
            navigate('/write', { state: { now: state.now } });
            document.body.style.overflow = 'unset';
          }}
        />
      )}

      {modal && (
        <ModalBasic
          setter={() => {
            setModal('');
            document.body.style.overflow = 'unset';
          }}
        >
          {modal}
        </ModalBasic>
      )}

      <Header>
        <StLogo onClick={() => window.location.reload()}>
          <img src={Logo} alt="Logo" />
        </StLogo>
        <StIcon>
          <img src={IconSurvey} alt="IconSurvey" />
        </StIcon>
      </Header>

      {state.now === 'room' ? <MainRoom /> : <MainSelect />}

      <WriteButton onClick={writeButtonHandler} />

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
