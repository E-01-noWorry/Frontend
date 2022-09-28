import React from 'react';

import { TIME_ARR } from '../../../shared/Array';
import { fontBold, fontMedium } from '../../../shared/themes/textStyle';

import styled, { css } from 'styled-components';

const TimeSlide = ({ time, setTime }) => {
  //마감시간 설정 핸들러
  const timeHandler = (event) => {
    const chooseTime = event.target.getAttribute('time');
    setTime(chooseTime);
  };

  return (
    <StTimeSlide selectTime={time}>
      {TIME_ARR.map((item) => (
        <div key={item} time={item} onClick={timeHandler}>
          {item}시간
        </div>
      ))}
      <StInnerTime time={time}></StInnerTime>
    </StTimeSlide>
  );
};

export default TimeSlide;

const StTimeSlide = styled.div`
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
  }

  div:nth-child(1) {
    color: ${({ theme }) => theme.white};
    ${fontBold}
  }

  div:nth-child(2) {
    ${(props) =>
      parseInt(props.selectTime) !== 1 &&
      css`
        color: ${({ theme }) => theme.white};
        ${fontBold}
      `}
  }

  div:nth-child(3) {
    ${(props) =>
      parseInt(props.selectTime) !== 1 &&
      parseInt(props.selectTime) !== 4 &&
      css`
        color: ${({ theme }) => theme.white};
        ${fontBold}
      `}
  }

  div:nth-child(4) {
    ${(props) =>
      parseInt(props.selectTime) !== 1 &&
      parseInt(props.selectTime) !== 4 &&
      parseInt(props.selectTime) !== 8 &&
      css`
        color: ${({ theme }) => theme.white};
        ${fontBold}
      `}
  }

  div:nth-child(5) {
    ${(props) =>
      parseInt(props.selectTime) !== 1 &&
      parseInt(props.selectTime) !== 4 &&
      parseInt(props.selectTime) !== 8 &&
      parseInt(props.selectTime) !== 12 &&
      css`
        color: ${({ theme }) => theme.white};
        ${fontBold}
      `}
  }
`;

const StInnerTime = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  display: inline-block;

  width: ${(props) => {
    if (parseInt(props.time) === 1) {
      return '20%';
    } else if (parseInt(props.time) === 4) {
      return '40%';
    } else if (parseInt(props.time) === 8) {
      return '60%';
    } else if (parseInt(props.time) === 12) {
      return '80%';
    } else if (parseInt(props.time) === 24) {
      return '100%';
    }
  }};
  height: 4rem;
  background-color: ${({ theme }) => theme.sub1};

  transition-duration: 0.3s;
  border-radius: 2rem;

  z-index: 1;
`;
