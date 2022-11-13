import React from "react";
import { useNavigate } from "react-router-dom";
import GlobalButton from "common/elements/GlobalButton";
import { fontExtraBold, fontMedium } from "shared/themes/textStyle";
import Logo from "static/images/Logo.svg";
import styled from "styled-components";

const LastSwiper = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Logo>
        <img src={Logo} alt="Logo" />
        <span>같이 고민해요, 곰곰</span>
      </S.Logo>

      <S.ButtonContainer>
        <GlobalButton onClick={() => navigate("/login")}>시작하기</GlobalButton>
        <GlobalButton
          bgc={({ theme }) => theme.white}
          font={({ theme }) => theme.main2}
          onClick={() => navigate("/select")}
        >
          서비스 둘러보기
        </GlobalButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10rem;

    width: 100%;
  `,

  Logo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;

    span {
      ${fontMedium};
      ${fontExtraBold};
      color: ${({ theme }) => theme.main2};
    }
  `,

  ButtonContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    width: 100%;
    padding: 0 2rem;

    z-index: 9;
  `,
};

export default LastSwiper;
