import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginThunk } from '../app/module/loginSlice';

import LoginSignUpInput from '../components/elements/LoginSignUpInput';
import Header from '../components/common/Header';
import BodyPadding from '../components/common/BodyPadding';
import GlobalButton from '../components/elements/GlobalButton';

import { fontSmall, fontLarge } from '../shared/themes/textStyle';
import { IconLarge, IconSmall } from '../shared/themes/iconStyle';

import IconBack from '../static/icons/Variety=back, Status=untab.svg';
import IconNext from '../static/icons/Variety=next, Status=untab.svg';

import styled from 'styled-components';
import SocialLoginButton from '../components/elements/SocialLoginButton';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.login);

  const [login, setLogin] = useState({
    userId: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const onClickLogin = () => {
    dispatch(loginThunk(login));
  };

  return (
    <div>
      <Header>
        <StHeaderIcon onClick={() => navigate(-1)}>
          <img src={IconBack} />
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
            />
            <LoginSignUpInput
              onChange={onChangeHandler}
              name="password"
              type="password"
              placeholder="패스워드를 입력해주세요"
            />
            {loginState?.error?.errMsg ? (
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
                <img src={IconNext} alt="IconNext" />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.4rem;

  margin-top: 8.4rem;
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
  position: absolute;
  bottom: 3.2rem;

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
