import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyPadding from '../components/common/BodyPadding';

import { isLogin } from '../shared/isLogin';
import { detectInAppBrowser, detectIphone } from '../shared/DeviceDetector';

import Logo from '../static/images/Logo.svg';

import styled from 'styled-components';
import { ModalBasic } from '../components/common/Modal';

const Start = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (detectInAppBrowser(window.navigator.userAgent)) {
      if (detectIphone(window.navigator.userAgent)) {
        setModal(true);
      } else {
        window.location.href =
          'intent://www.gomgom.site#Intent;scheme=http;package=com.android.chrome;end)';
      }
    } else {
      setTimeout(() => {
        if (isLogin()) {
          navigate('/main', { state: 'select' });
        } else navigate('/welcome');
      }, 1000);
    }
  }, [navigate]);

  return (
    <>
      {modal && (
        <ModalBasic setter={() => setModal(false)}>
          <span>
            아쉽게도 인앱브라우저는 지원이 안됩니다. <br />
            Safari로 접속해주세요! <br />
          </span>
          <span>
            1. 하단에 공유하기 버튼 클릭 <br />
            2. Safari로 열기 클릭
          </span>
        </ModalBasic>
      )}

      <BodyPadding>
        <StLogo>
          <img src={Logo} alt="Logo" />
        </StLogo>
      </BodyPadding>
    </>
  );
};

export default Start;

const StLogo = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;
