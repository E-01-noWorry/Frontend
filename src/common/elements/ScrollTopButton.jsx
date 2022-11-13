import React from "react";
import { fontMedium } from "shared/themes/textStyle";
import styled from "styled-components";

const ScrollTopButton = () => {
  return (
    <S.Container>
      <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>맨위로</span>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
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
  `,
};

export default ScrollTopButton;
