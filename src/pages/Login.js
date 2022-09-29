import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import instance from '../app/module/instance';

import LoginSignUpInput from '../components/elements/LoginSignUpInput';
import Header from '../components/common/Header';
import BodyPadding from '../components/common/BodyPadding';
import GlobalButton from '../components/elements/GlobalButton';
import SocialLoginButton from '../components/elements/SocialLoginButton';

import { fontSmall, fontLarge } from '../shared/themes/textStyle';
import { IconLarge, IconSmall } from '../shared/themes/iconStyle';

import IconBack from '../static/icons/Variety=back, Status=untab, Size=L.svg';
import IconJoin from '../static/icons/Variety=Join membership, Status=untab, Size=S.svg';

import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [login, setLogin] = useState({
    userId: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const onClickLogin = async () => {
    try {
      const data = await instance.post('/user/login', login);

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('nickname', data.data.nickname);
      localStorage.setItem('userKey', data.data.userKey);

      window.location.replace('/');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <Header>
        <StHeaderIcon onClick={() => navigate(-1)}>
          <img src={IconBack} alt="IconBack" />
        </StHeaderIcon>
        <StHeaderTitle>로그인</StHeaderTitle>
        <StHeaderIcon></StHeaderIcon>
      </Header>

      <BodyPadding>
        <StLoginWrap>
          <StInputWrap>
            <LoginSignUpInput
              onChange={onChangeHandler}
              name="userId"
              type="text"
              placeholder="아이디를 입력해주세요"
              maxLength={12}
            />
            <LoginSignUpInput
              onChange={onChangeHandler}
              name="password"
              type="password"
              placeholder="패스워드를 입력해주세요"
            />
            {error ? (
              <LoginErrorMsg>*아이디와 비밀번호를 확인해주세요</LoginErrorMsg>
            ) : null}
          </StInputWrap>

          <StButtonWrap>
            <GlobalButton
              onClick={() => {
                onClickLogin();
              }}
            >
              로그인
            </GlobalButton>

            <SocialLoginButton />
          </StButtonWrap>

          <StNaviLogin>
            <div>아직 회원이 아닌가요?</div>
            <div onClick={() => navigate('/signUp')}>
              회원가입
              <StIcon>
                <img src={IconJoin} alt="IconJoin" />
              </StIcon>
            </div>
          </StNaviLogin>
        </StLoginWrap>
      </BodyPadding>
    </div>
  );
};

export default Login;

const StHeaderIcon = styled.div`
  ${IconLarge};
`;

const StHeaderTitle = styled.div`
  ${fontLarge};
`;

const StLoginWrap = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    margin-top: 6.4rem;
    padding: 2rem 2rem 0 2rem;
    min-height: calc(100% - 6.4rem);
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.4rem;

  margin-top: 8.4rem;
  background-color: ${({ theme }) => theme.bg};
`;

const StInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
`;

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
`;

const LoginErrorMsg = styled.p`
  color: #ff7878;
  ${fontSmall}
`;

const StNaviLogin = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  div:nth-child(1) {
    ${fontSmall}
    color: ${({ theme }) => theme.sub2};
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;

    ${fontSmall}
  }
`;

const StIcon = styled.div`
  ${IconSmall}

  img {
    width: 2rem;
    height: 2rem;
  }
`;
