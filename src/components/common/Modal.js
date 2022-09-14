import React from 'react';

import { fontBold, fontMedium, fontSmall } from '../../shared/themes/textStyle';
import { IconLarge } from '../../shared/themes/iconStyle';

import IconClose from '../../static/icons/Variety=close, Status=L.svg';

import styled from 'styled-components';

export const ModalBasic = ({ children, setter }) => {
  return (
    <StModalBg>
      <StModalWindow>
        <StModalText>
          <span></span>
          <span>{children}</span>
        </StModalText>
        <StModalButton>
          <div onClick={setter}>확인</div>
        </StModalButton>
      </StModalWindow>
    </StModalBg>
  );
};

export const ModalDelete = ({ children, setter, leave, recommend }) => {
  return (
    <StModalBg>
      <StModalWindowWide>
        <StModalTextWide>
          <div>
            <StCancelIcon onClick={setter}>
              <img src={IconClose} alt="IconClose" />
            </StCancelIcon>
          </div>
          <div>고민을 해결에 도움을 준 사람을 추천해주세요</div>
          <div>*현재 채팅방에 남아 있는 사람입니다.</div>
          {children}
        </StModalTextWide>
        <StModalButton>
          <div onClick={recommend}>추천하기</div>
          <div onClick={leave}>채팅방 삭제</div>
        </StModalButton>
      </StModalWindowWide>
    </StModalBg>
  );
};

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
  padding: 0 1rem;
  background-color: #fff;

  border-radius: 2rem;

  line-height: 2.1rem;
`;

const StModalWindowWide = styled(StModalWindow)`
  width: 33rem;
`;

const StModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 1rem 0;

  min-height: 10.2rem;

  span {
    text-align: center;
  }

  span:nth-child(1) {
    ${fontBold}
  }

  span:nth-child(2) {
    ${fontMedium}
  }

  span:nth-child(3) {
    ${fontMedium}
    color: ${({ theme }) => theme.sub2};
  }
`;

const StModalTextWide = styled(StModalText)`
  min-height: 15.6rem;

  & > div:nth-child(1) {
    display: flex;
    justify-content: flex-end;

    width: 100%;
    height: 2.5rem;
  }

  & > div:nth-child(2) {
    ${fontBold};
    line-height: 2.4rem;
  }

  & > div:nth-child(3) {
    ${fontSmall};
    line-height: 1.3rem;
    color: ${({ theme }) => theme.sub2};
  }
`;

const StCancelIcon = styled.div`
  ${IconLarge};
`;

const StModalButton = styled.div`
  display: flex;
  align-items: center;

  height: 5.6rem;
  margin: 0 -1rem;

  border-top: 0.1rem solid #e7e7e7;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
  }

  div:nth-child(2) {
    border-left: 0.1rem solid #e7e7e7;
  }
`;
