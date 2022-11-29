import React from "react";

import { fontMedium } from "../../shared/themes/textStyle";

import styled from "styled-components";

export const ModalBasic = ({ children, setter }) => {
  return (
    <>
      <StModalWindow>
        <StModalText>
          <span>{children}</span>
        </StModalText>
        <StModalButton>
          <div onClick={setter}>확인</div>
        </StModalButton>
      </StModalWindow>
      <StModalBg onClick={setter} />
    </>
  );
};

const StModalBg = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
  }

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);

  z-index: 99;
`;

const StModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 29rem;
  background-color: #fff;

  border-radius: 2rem;

  line-height: 2.1rem;

  z-index: 999;
`;

const StModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  min-height: 7.2rem;
  padding: 1rem;

  span {
    text-align: center;
    line-height: 2.5rem;
  }

  span:nth-child(1) {
    ${fontMedium}
  }

  span:nth-child(2) {
    ${fontMedium}
    color: ${({ theme }) => theme.sub2};
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

    width: 100%;
    height: 100%;

    ${fontMedium}

    cursor: pointer;
  }

  div:nth-child(2) {
    border-left: 0.1rem solid #e7e7e7;
  }
`;
