import React from 'react';

import styled from 'styled-components';
import { fontBold, fontMedium } from '../../shared/themes/textStyle';

export const ModalExit = ({ leave, setter }) => {
  return (
    <StModalBg>
      <StModalWindow>
        <StModalText>
          <span>채팅방 나가기</span>
          <span>나가기를 하면 작성자의 추천을 받을 수 없어요.</span>
          <span>(추천을 받으면 등급을 올릴 수 있어요!)</span>
        </StModalText>
        <StModalButton>
          <div onClick={setter}>취소</div>
          <div onClick={leave}>나가기</div>
        </StModalButton>
      </StModalWindow>
    </StModalBg>
  );
};

const StModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  z-index: 99;
`;

const StModalWindow = styled.div`
  width: 29rem;
  background-color: #fff;

  border-radius: 2rem;
`;

const StModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  height: 10.2rem;

  span:nth-child(1) {
    ${fontBold}
  }

  span:nth-child(2) {
    ${fontMedium}
  }

  span:nth-child(3) {
    ${fontMedium}
  }
`;

const StModalButton = styled.div`
  display: flex;
  align-items: center;

  height: 5.6rem;

  border-top: 0.1rem solid #e7e7e7;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50%;
    height: 100%;
  }

  div:nth-child(1) {
    border-right: 0.1rem solid #e7e7e7;
  }
`;
