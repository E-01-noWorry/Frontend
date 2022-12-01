import React from "react";

import { KAKAO_AUTH_URL } from "shared/utils/OAuth";
import { GOOGLE_AUTH_URL } from "shared/utils/OAuth";
import { fontMedium } from "shared/themes/textStyle";

import kakaoIcon from "static/images/kakao.svg";
import googleIcon from "static/images/google.svg";
import styled from "styled-components";

const SocialLoginButton = () => {
  return (
    <S.ButtonContainer>
      <S.Button href={KAKAO_AUTH_URL} bgc={"#FEE500"}>
        <img src={kakaoIcon} alt="kakaoIcon" />
        <span>카카오</span>
      </S.Button>

      <S.Button href={GOOGLE_AUTH_URL} bgc={"#FFF"}>
        <img src={googleIcon} alt="googleIcon" />
        <span>구글</span>
      </S.Button>
    </S.ButtonContainer>
  );
};

export default SocialLoginButton;

const S = {
  ButtonContainer: styled.article`
    display: flex;
    gap: 1.6rem;
  `,

  Button: styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;

    width: 100%;
    height: 4.8rem;
    background-color: ${(props) => props.bgc};

    border-radius: 2rem;

    span {
      ${fontMedium};
      color: ${({ theme }) => theme.black};
    }
  `,
};
