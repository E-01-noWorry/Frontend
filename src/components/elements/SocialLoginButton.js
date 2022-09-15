import React from 'react';

import { KAKAO_AUTH_URL } from '../../shared/Oauth';
import { GOOGLE_AUTH_URL } from '../../shared/Oauth';

import { IconSmall } from '../../shared/themes/iconStyle';
import { fontMedium } from '../../shared/themes/textStyle';

import styled from 'styled-components';

const SocialLoginButton = () => {
  return (
    <StButtonWrap>
      <StSocialLoginButton href={KAKAO_AUTH_URL} bgc={'#FEE500'}>
        <StIcon></StIcon>
        <div>카카오</div>
      </StSocialLoginButton>

      <StSocialLoginButton href={GOOGLE_AUTH_URL} bgc={'#FFFFFF'}>
        <StIcon></StIcon>
        <div>구글</div>
      </StSocialLoginButton>
    </StButtonWrap>
  );
};

export default SocialLoginButton;

const StButtonWrap = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const StSocialLoginButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  width: 100%;
  height: 4.8rem;
  background-color: ${(props) => props.bgc};

  border-radius: 2rem;

  & > div:nth-child(2) {
    ${fontMedium};
    color: ${({ theme }) => theme.black};
  }
`;

const StIcon = styled.div`
  ${IconSmall};
  background-color: red;
`;
