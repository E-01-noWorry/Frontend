import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalButton from '../components/elements/GlobalButton';

import { fontExtra, fontExtraBold } from '../shared/themes/textStyle';

import styled, { css } from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

const OnBoarding = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(1);

  const vh = window.innerHeight * 0.01;
  const screenSize = useCallback(() => {
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [vh]);

  useEffect(() => {
    screenSize();
  }, [screenSize]);

  return (
    <StContensWrap>
      <StNavi pagination={pagination}>
        {[1, 2, 3].map((i) => (
          <div key={i}></div>
        ))}
      </StNavi>

      <StSwiper
        slidesPerView={1}
        centeredSlides={true}
        onSlideChange={(e) => setPagination(e.activeIndex + 1)}
        effect={'fade'}
        modules={[EffectFade]}
      >
        <StSwiperSlide>
          <StTitle>고민투표</StTitle>
          <StBody>
            선택에 어려움이 있나요? <br />
            투표를 열어 고민을 해결해보세요!
          </StBody>
        </StSwiperSlide>
        <StSwiperSlide>
          <StTitle>고민상담</StTitle>
          <StBody>
            주변에 말하기 어려운 고민이 있나요? <br />
            익명으로 안심하고 고민을 말할 수 있어요!
          </StBody>
        </StSwiperSlide>
        <StSwiperSlide>
          <StTitle>곰곰해답</StTitle>
          <StBody>
            해결하기 힘든 고민이 있나요? <br />
            곰곰의 명쾌한 해답을 들어보세요!
          </StBody>
        </StSwiperSlide>
      </StSwiper>

      <StButtonWrap pagination={pagination}>
        <GlobalButton onClick={() => pagination === 3 && navigate('/login')}>
          시작하기
        </GlobalButton>

        <GlobalButton
          bgc={({ theme }) => theme.white}
          font={({ theme }) => theme.main2}
          onClick={() =>
            pagination === 3 && navigate('/main', { state: { now: 'select' } })
          }
        >
          서비스 둘러보기
        </GlobalButton>
      </StButtonWrap>
    </StContensWrap>
  );
};

export default OnBoarding;

const StContensWrap = styled.div`
  position: relative;

  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
`;

const StNavi = styled.div`
  position: absolute;
  top: 4rem;
  right: 4rem;

  display: flex;
  gap: 0.8rem;

  width: 4rem;
  height: 0.8rem;

  div {
    width: 0.8rem;
    height: 0.8rem;
    background-color: ${({ theme }) => theme.sub3};

    border-radius: 50%;
  }

  div:nth-child(${(props) => props.pagination}) {
    background-color: ${({ theme }) => theme.sub1};
  }

  z-index: 9;
`;

const StSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const StSwiperSlide = styled(SwiperSlide)`
  background-color: ${({ theme }) => theme.bg};
`;

const StTitle = styled.h1`
  position: absolute;
  top: 8.8rem;
  left: 4rem;

  ${fontExtra};
  ${fontExtraBold};
`;

const StBody = styled.span`
  position: absolute;
  top: 15.2rem;
  left: 4rem;

  line-height: 2.4rem;
`;

const StButtonWrap = styled.div`
  position: absolute;
  bottom: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
  padding: 0 2rem;

  z-index: 9;

  // 마지막 페이지가 아닐때 버튼 비활성화
  ${(props) =>
    props.pagination !== 3 &&
    css`
      div:nth-child(1) {
        background-color: ${({ theme }) => theme.inactive};
        color: ${({ theme }) => theme.sub4};
      }

      div:nth-child(2) {
        color: ${({ theme }) => theme.inactive};
      }
    `}
`;
