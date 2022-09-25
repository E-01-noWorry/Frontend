import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import GlobalButton from '../components/elements/GlobalButton';
import { ModalInfo } from '../components/common/Modal';

import { IconLarge } from '../shared/themes/iconStyle';
import { fontBold } from '../shared/themes/textStyle';

import ImageBubble1 from '../static/images/speach bubble1.svg';
import ImageBubble2 from '../static/images/speach bubble2.svg';
import ImageCharacter1 from '../static/images/Character1.svg';
import ImageCharacter2 from '../static/images/Character2.svg';
import IconSurvey from '../static/icons/Variety=Survey grey, Status=untab, Size=L.svg';
import Logo from '../static/images/Logo.svg';

const Answer = () => {
  const { state } = useLocation();
  const [infoText, setIntoText] = useState(true);
  const [gomgomThink, setGomgomThink] = useState(false);
  const [gomgomAnswer, setGomgomAnswer] = useState('');

  const vh = window.innerHeight * 0.01;
  const screenSize = useCallback(() => {
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [vh]);

  useEffect(() => {
    screenSize();
  }, [screenSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntoText(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const clickAnswerHandler = () => {
    setGomgomThink(true);
    setGomgomAnswer(false);

    setTimeout(() => {
      setGomgomAnswer('해답 나오는 부분');
      setGomgomThink(false);
    }, 2000);
  };

  return (
    <>
      {infoText && <ModalInfo />}
      <StAnswerWrap>
        <StHeader>
          <StLogo onClick={() => window.location.reload()}>
            <img src={Logo} alt="Logo" />
          </StLogo>
          <a
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSeHPoDci-rlaFfTEteUDaJXwnoVvvLUKDBQ831gb1o1U6fF5A/viewform"
          >
            <StIcon>
              <img src={IconSurvey} alt="IconSurvey" />
            </StIcon>
          </a>
        </StHeader>
        <StContentsWrap>
          {gomgomAnswer ? (
            <>
              <img src={ImageBubble2} alt="ImageBubble2" />
              <img src={ImageCharacter2} alt="ImageCharacter2" />
            </>
          ) : (
            <>
              <img src={ImageBubble1} alt="ImageBubble1" />
              <img src={ImageCharacter1} alt="ImageCharacter1" />
            </>
          )}

          {gomgomThink ? (
            <StThinking>곰곰히 생각하는 중...</StThinking>
          ) : gomgomAnswer ? (
            <StThinking>{gomgomAnswer}</StThinking>
          ) : null}
        </StContentsWrap>
        <StGlobalButton
          think={gomgomThink}
          onClick={gomgomThink ? null : clickAnswerHandler}
        >
          {gomgomAnswer ? '곰곰의 해답 다시 듣기' : '곰곰의 해답 듣기'}
        </StGlobalButton>
        <Footer state={state} />
      </StAnswerWrap>
    </>
  );
};

export default Answer;

const StThinking = styled.div`
  position: absolute;
  left: 50%;
  top: 1.9rem;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 21rem;
  height: 6rem;
  background-color: #f8f3eb;

  ${fontBold};
  text-align: center;

  z-index: 9;
`;

const StAnswerWrap = styled.div`
  position: relative;

  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: radial-gradient(
    15rem 32rem at 50% 45%,
    #ff9b25 0%,
    #000000 82.03%
  );

  border-left: 2rem solid transparent;
  border-right: 2rem solid transparent;
`;

const StHeader = styled(Header)`
  background-color: transparent;
`;

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

const StContentsWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 41.4rem;

  img:nth-child(1) {
    position: absolute;
    top: 0;
  }

  img:nth-child(2) {
    position: absolute;
    bottom: 0;
  }
`;

const StGlobalButton = styled(GlobalButton)`
  position: absolute;
  bottom: 9.6rem;

  ${(props) =>
    props.think &&
    css`
      background-color: #ba8c57;
      color: #d1c4b5;
    `}
`;
