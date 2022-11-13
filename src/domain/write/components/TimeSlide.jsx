import React from "react";

import { TIME_ARR } from "shared/utils/arr";
import { fontBold, fontMedium } from "shared/themes/textStyle";
import styled, { css } from "styled-components";

const TimeSlide = ({ time, setTime }) => {
  return (
    <S.TimeSlide selectTime={time}>
      {TIME_ARR.map((item) => (
        <div key={item} onClick={() => setTime(item)}>
          {item}시간
        </div>
      ))}
      <S.Time time={time} />
    </S.TimeSlide>
  );
};

const S = {
  TimeSlide: styled.div`
    position: relative;

    display: flex;

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 20%;
      height: 4rem;

      transition-delay: 0.1s;

      ${fontMedium}
      z-index: 2;

      cursor: pointer;
    }

    div:nth-child(1) {
      color: ${({ theme }) => theme.white};
      ${fontBold}
    }

    div:nth-child(2) {
      ${(props) =>
        Number(props.selectTime) !== 1 &&
        css`
          color: ${({ theme }) => theme.white};
          ${fontBold}
        `}
    }

    div:nth-child(3) {
      ${(props) =>
        Number(props.selectTime) !== 1 &&
        Number(props.selectTime) !== 4 &&
        css`
          color: ${({ theme }) => theme.white};
          ${fontBold}
        `}
    }

    div:nth-child(4) {
      ${(props) =>
        Number(props.selectTime) !== 1 &&
        Number(props.selectTime) !== 4 &&
        Number(props.selectTime) !== 8 &&
        css`
          color: ${({ theme }) => theme.white};
          ${fontBold}
        `}
    }

    div:nth-child(5) {
      ${(props) =>
        Number(props.selectTime) !== 1 &&
        Number(props.selectTime) !== 4 &&
        Number(props.selectTime) !== 8 &&
        Number(props.selectTime) !== 12 &&
        css`
          color: ${({ theme }) => theme.white};
          ${fontBold}
        `}
    }
  `,

  Time: styled.span`
    position: absolute;
    top: 0;
    left: 0;

    display: inline-block;

    width: ${(props) => {
      if (Number(props.time) === 1) {
        return "20%";
      } else if (Number(props.time) === 4) {
        return "40%";
      } else if (Number(props.time) === 8) {
        return "60%";
      } else if (Number(props.time) === 12) {
        return "80%";
      } else if (Number(props.time) === 24) {
        return "100%";
      }
    }};
    height: 4rem;
    background-color: ${({ theme }) => theme.sub1};

    transition-duration: 0.3s;
    border-radius: 2rem;

    z-index: 1;
  `,
};

export default TimeSlide;
