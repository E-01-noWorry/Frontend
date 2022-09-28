import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalButton from '../components/elements/GlobalButton';

import {
  fontExtra,
  fontExtraBold,
  fontMedium,
} from '../shared/themes/textStyle';

import GomGomVote from '../static/images/GomGomVote.svg';
import GomGomRoom from '../static/images/GomGomRoom.svg';
import GomGomAnswer from '../static/images/GomGomAnswer.svg';

import IconBack from '../static/icons/Variety=back, Status=untab, Size=L.svg';
import IconOnboarding from '../static/icons/Variety=onboarding, Status=untab, Size=L.svg';
import Logo from '../static/images/Logo.svg';

import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const OnBoarding = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(1);
  const prevNavi = useRef(null);
  const nextNavi = useRef(null);

  return (
    <StContensWrap>
      {pagination < 4 && (
        <StNavi pagination={pagination}>
          {[1, 2, 3].map((i) => (
            <div key={i}></div>
          ))}
        </StNavi>
      )}

      <StSwiper
        navigation={{ prevEl: prevNavi.current, nextEl: nextNavi.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevNavi.current;
          swiper.params.navigation.nextEl = nextNavi.current;
        }}
        slidesPerView={1}
        centeredSlides={true}
        onSlideChange={(e) => setPagination(e.activeIndex + 1)}
        effect={'fade'}
        modules={[EffectFade, Navigation]}
      >
        <StPrev ref={prevNavi} page={pagination}>
          {pagination === 4 ? (
            <img src={IconBack} alt="IconBack" />
          ) : (
            <img src={IconOnboarding} alt="IconOnboarding" />
          )}
        </StPrev>

        <StNext ref={nextNavi} page={pagination}>
          <img src={IconOnboarding} alt="IconOnboarding" />
        </StNext>

        <StSwiperSlide>
          <StTitle>고민투표</StTitle>
          <StBody>
            선택에 어려움이 있나요? <br />
            투표를 열어 고민을 해결해보세요!
          </StBody>
          <StGomGom>
            <img src={GomGomVote} alt="GomGomVote" />
          </StGomGom>
        </StSwiperSlide>
        <StSwiperSlide>
          <StTitle>고민상담</StTitle>
          <StBody>
            주변에 말하기 어려운 고민이 있나요? <br />
            익명으로 안심하고 고민을 말할 수 있어요!
          </StBody>
          <StGomGom>
            <img src={GomGomRoom} alt="GomGomRoom" />
          </StGomGom>
        </StSwiperSlide>
        <StSwiperSlide>
          <StTitle>곰곰해답</StTitle>
          <StBody>
            해결하기 힘든 고민이 있나요? <br />
            곰곰의 명쾌한 해답을 들어보세요!
          </StBody>
          <StGomGom>
            <img src={GomGomAnswer} alt="GomGomAnswer" />
          </StGomGom>
        </StSwiperSlide>
        <StSwiperSlide>
          <StWrap>
            <StLogo>
              <img src={Logo} alt="Logo" />
              <span>같이 고민해요, 곰곰</span>
            </StLogo>
            <StButtonWrap>
              <GlobalButton onClick={() => navigate('/login')}>
                시작하기
              </GlobalButton>
              <GlobalButton
                bgc={({ theme }) => theme.white}
                font={({ theme }) => theme.main2}
                onClick={() => navigate('/main', { state: { now: 'select' } })}
              >
                서비스 둘러보기
              </GlobalButton>
            </StButtonWrap>
          </StWrap>
        </StSwiperSlide>
      </StSwiper>
    </StContensWrap>
  );
};

export default OnBoarding;

const StPrev = styled.div`
  position: absolute;
  top: ${(props) => (props.page !== 4 ? '50%' : '4.8%')};
  left: ${(props) => (props.page !== 4 ? '1.2rem' : '2rem')};
  transform: translateY(-50%);

  display: ${(props) => (props.page !== 1 ? 'flex' : 'none')};

  width: 3.2rem;
  height: 3.2rem;

  z-index: 9;

  cursor: pointer;
`;

const StNext = styled.div`
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translateY(-50%);

  display: ${(props) => (props.page !== 4 ? 'flex' : 'none')};

  width: 3.2rem;
  height: 3.2rem;

  z-index: 9;

  cursor: pointer;

  img {
    transform: rotate(180deg);
  }
`;

const StContensWrap = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
  }

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

const StGomGom = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const StTitle = styled.h1`
  position: absolute;
  top: 8rem;
  left: 4rem;

  ${fontExtra};
  ${fontExtraBold};
`;

const StBody = styled.span`
  position: absolute;
  top: 14rem;
  left: 4rem;

  line-height: 2.4rem;
`;

const StWrap = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;

  width: 100%;
`;

const StLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;

  span {
    ${fontMedium};
    ${fontExtraBold};
    color: ${({ theme }) => theme.main2};
  }
`;

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
  padding: 0 2rem;

  z-index: 9;
`;
