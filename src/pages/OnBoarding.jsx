import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import Layout from "components/common/Layout";
import Navi from "components/features/onboarding/Navi";
import LastSwiper from "components/features/onboarding/LastSwiper";

import { fontExtra, fontExtraBold } from "shared/themes/textStyle";
import GomGomVote from "static/images/GomGomVote.svg";
import GomGomRoom from "static/images/GomGomRoom.svg";
import GomGomAnswer from "static/images/GomGomAnswer.svg";
import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import IconOnboarding from "static/icons/Variety=onboarding, Status=untab, Size=L.svg";

import styled from "styled-components";

const OnBoarding = () => {
  const [pagination, setPagination] = useState(1);
  const prevNavi = useRef(null);
  const nextNavi = useRef(null);

  return (
    <Layout>
      <Navi pagination={pagination} />

      <S.Swiper
        navigation={{ prevEl: prevNavi.current, nextEl: nextNavi.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevNavi.current;
          swiper.params.navigation.nextEl = nextNavi.current;
        }}
        slidesPerView={1}
        centeredSlides={true}
        onSlideChange={(event) => setPagination(event.activeIndex + 1)}
        modules={[Navigation]}
      >
        <S.Prev ref={prevNavi} page={pagination}>
          {pagination === 4 ? (
            <img src={IconBack} alt="IconBack" />
          ) : (
            <img src={IconOnboarding} alt="IconOnboarding" />
          )}
        </S.Prev>

        <S.Next ref={nextNavi} page={pagination}>
          <img src={IconOnboarding} alt="IconOnboarding" />
        </S.Next>

        <S.SwiperSlide>
          <h1>고민투표</h1>
          <span>
            선택에 어려움이 있나요? <br />
            투표를 열어 고민을 해결해보세요!
          </span>
          <img src={GomGomVote} alt="GomGomVote" />
        </S.SwiperSlide>

        <S.SwiperSlide>
          <h1>고민상담</h1>
          <span>
            주변에 말하기 어려운 고민이 있나요? <br />
            익명으로 안심하고 고민을 말할 수 있어요!
          </span>
          <img src={GomGomRoom} alt="GomGomRoom" />
        </S.SwiperSlide>

        <S.SwiperSlide>
          <h1>곰곰해답</h1>
          <span>
            해결하기 힘든 고민이 있나요? <br />
            곰곰의 명쾌한 해답을 들어보세요!
          </span>
          <img src={GomGomAnswer} alt="GomGomAnswer" />
        </S.SwiperSlide>

        <S.SwiperSlide>
          <LastSwiper />
        </S.SwiperSlide>
      </S.Swiper>
    </Layout>
  );
};

export default OnBoarding;

const S = {
  Swiper: styled(Swiper)`
    width: 100%;
    height: 100%;
  `,

  SwiperSlide: styled(SwiperSlide)`
    background-color: ${({ theme }) => theme.bg};

    > h1 {
      position: absolute;
      top: 8rem;
      left: 4rem;

      ${fontExtra};
      ${fontExtraBold};
    }

    > span {
      position: absolute;
      top: 14rem;
      left: 4rem;

      line-height: 2.4rem;
    }

    > img {
      position: absolute;
      bottom: 5rem;
      left: 50%;
      transform: translateX(-50%);
    }
  `,

  Prev: styled.div`
    position: absolute;
    top: ${(props) => (props.page !== 4 ? "50%" : "4.8%")};
    left: ${(props) => (props.page !== 4 ? "1.2rem" : "2rem")};
    transform: translateY(-50%);

    display: ${(props) => (props.page !== 1 ? "flex" : "none")};

    width: 3.2rem;
    height: 3.2rem;

    z-index: 9;

    cursor: pointer;
  `,

  Next: styled.div`
    position: absolute;
    top: 50%;
    right: 1.2rem;
    transform: translateY(-50%);

    display: ${(props) => (props.page !== 4 ? "flex" : "none")};

    width: 3.2rem;
    height: 3.2rem;

    z-index: 9;

    cursor: pointer;

    img {
      transform: rotate(180deg);
    }
  `,
};
