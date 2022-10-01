import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import instance from '../app/module/instance';

import Header from '../components/common/Header';
import MainRoom from '../components/features/main/MainRoom';
import MainSelect from '../components/features/main/MainSelect';
import WriteButton from '../components/elements/WriteButton';
import Footer from '../components/common/Footer';
import { ModalLogin, ModalWrite } from '../components/common/Modal';

import { isLogin } from '../shared/isLogin';

import { IconLarge } from '../shared/themes/iconStyle';
import {
  fontBold,
  fontExtraSmall,
  fontMedium,
} from '../shared/themes/textStyle';

import IconNext from '../static/icons/Variety=next, Status=untab, Size=M.svg';
import IconSurvey from '../static/icons/Variety=Survey, Status=untab, Size=L.svg';

import Logo from '../static/images/Logo.svg';

import styled from 'styled-components';

import _ from 'lodash';

const Main = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const deviceToken = sessionStorage.getItem('deviceToken');

  const [loginModal, setLoginModal] = useState(false);
  const [writeModal, setWriteModal] = useState(false);

  const [feedbackBadge, setFeedbackBadge] = useState(false);
  const [scrollState, setScrollState] = useState(false);

  //피드백 뱃지 on/off
  useEffect(() => {
    setFeedbackBadge(true);

    setTimeout(() => {
      setFeedbackBadge(false);
    }, 1500);
  }, []);

  //로그인을 한 유저가 알림 허용까지 했다면 deviceToken을 서버에 보냅니다
  const postDeviceToken = useCallback(async () => {
    if (isLogin() && deviceToken) {
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

  //일정 스크롤이 내려가면 맨위로 버튼 on
  const scrollEvent = _.debounce((event) => {
    const myHeight = event.srcElement.scrollingElement.scrollTop;

    setScrollState(myHeight > 200);
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
  }, [scrollEvent]);

  //메인화면 글 작성 버튼
  const writeButtonHandler = () => {
    if (isLogin() && state.now === 'select') {
      setWriteModal(true);
      document.body.style.overflow = 'hidden';
    } else if (isLogin() && state.now === 'room') {
      navigate('/write', { state });
    } else {
      setLoginModal(true);
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <>
      {writeModal && (
        <ModalWrite
          setter={() => {
            setWriteModal(false);
            document.body.style.overflow = 'overlay';
          }}
          write={() => {
            navigate('/write', { state: { now: state.now } });
            document.body.style.overflow = 'overlay';
          }}
        />
      )}

      {loginModal && (
        <ModalLogin
          setter={() => {
            setLoginModal(false);
            document.body.style.overflow = 'overlay';
          }}
          login={() => {
            navigate('/login');
            document.body.style.overflow = 'overlay';
          }}
        />
      )}

      <Header>
        <StLogo onClick={() => window.location.reload()}>
          <img src={Logo} alt="Logo" />
        </StLogo>
        <StIcon>
          <span style={{ opacity: `${feedbackBadge ? 1 : 0}` }}>
            피드백 남기기
            <img src={IconNext} alt="IconNext" />
          </span>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSeHPoDci-rlaFfTEteUDaJXwnoVvvLUKDBQ831gb1o1U6fF5A/viewform"
          >
            <img src={IconSurvey} alt="IconSurvey" />
          </a>
        </StIcon>
      </Header>

      {state?.now === 'room' ? <MainRoom /> : <MainSelect />}

      <StButtonWrap>
        <WriteButton onClick={writeButtonHandler} />
      </StButtonWrap>

      {scrollState && (
        <StToTop
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span>맨위로</span>
        </StToTop>
      )}

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
    width: 4.5rem;
  }
`;

const StButtonWrap = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    width: ${({ theme }) => theme.style.width};
  }

  position: fixed;
  bottom: 7.2rem;

  display: flex;
  justify-content: flex-end;
  padding-bottom: 2rem;
  padding-right: 2rem;

  width: 100%;
`;

const StIcon = styled.div`
  display: flex;

  ${IconLarge};

  span {
    animation: motion 0.4s linear 0s infinite alternate;
    transition: opacity 0.3s;

    @keyframes motion {
      0% {
        margin-right: 0;
      }
      100% {
        margin-right: 0.3rem;
      }
    }

    position: absolute;
    right: 5.2rem;

    display: flex;
    align-items: center;

    padding: 0.5rem 0 0.5rem 0.5rem;
    margin-right: 0;
    background-color: ${({ theme }) => theme.main2};

    border-radius: 1.15rem;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

    ${fontExtraSmall};
    ${fontBold};
    color: ${({ theme }) => theme.white};

    img {
      height: 1.6rem;
    }
  }
`;

const StToTop = styled.div`
  position: fixed;
  bottom: 10rem;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 9.3rem;
  height: 3.7rem;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.inactive};

  border-radius: 1.85rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

  cursor: pointer;

  span {
    ${fontMedium};
    color: ${({ theme }) => theme.white};
  }
`;
