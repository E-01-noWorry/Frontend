import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginSignUpInput from '../components/elements/LoginSignUpInput';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../app/module/loginSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KakaoLogin from '../components/features/KakaoLogin';
import GoogleLogin from '../components/features/GoogleLogin';
import { fontSmall } from '../shared/themes/textStyle';
import Header from '../components/common/Header';
import BodyPadding from '../components/common/BodyPadding';
import { fontLarge } from '../shared/themes/textStyle';
import GlobalButton from '../components/elements/GlobalButton';

const Login = () => {
  const dispatch = useDispatch();
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
      <BodyPadding>
        <Header>
          <HeaderContainer>
            <Link to="/">
              <Aarow>&#8592;</Aarow>
            </Link>
            <LoginHeader>로그인</LoginHeader>
          </HeaderContainer>
        </Header>
        <LoginContainer>
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
          <GlobalButton
            onClick={() => {
              onClickLogin();
            }}
          >
            로그인
          </GlobalButton>
          <ToastContainer />
          <KakaoLogin />
          <GoogleLogin />

          <LetterContainer>
            <Black>계정을 잊으셨나요? </Black>
            <Blue>ID찾기 </Blue>
            <Black>또는 </Black>
            <Blue>비밀번호 찾기</Blue>
          </LetterContainer>

          <LetterContainer2>
            <LightBold>아직 회원이 아닌가요?</LightBold>
            <Link to="/signup">
              <SignUp>
                <LinkTag>회원가입 &#62;</LinkTag>
              </SignUp>
            </Link>
          </LetterContainer2>
        </LoginContainer>
      </BodyPadding>
    </div>
  );
};

export default Login;

const HeaderContainer = styled.div`
  width: 100%;
`;

const Aarow = styled.span`
  color: #000;
  font-size: 3rem;
  position: relative;
`;

const LoginHeader = styled.p`
  text-align: center;
  display: inline;
  width: 100%;
  position: absolute;
  right: 0px;
  top: 2.2rem;
  ${fontLarge}
  z-index: -1;
`;

const LoginContainer = styled.div``;

const LetterContainer = styled.p`
  text-align: center;
  margin-top: 3.5rem;
`;

const LoginErrorMsg = styled.p`
  color: #ff7878;
  ${fontSmall}
`;

const Black = styled.span`
  color: #000;
  font-size: 1.2rem;
`;
const Blue = styled.span`
  color: #00c2ff;
  font-size: 1.2rem;
`;

const LetterContainer2 = styled.p`
  position: fixed;
  bottom: 3.2rem;
  text-align: center;
  width: 100%;
  padding-right: 40px;
`;

const LightBold = styled.span`
  font-weight: 400;
  color: #767676;
  ${fontSmall}
  margin-right: 1.5rem;
`;

const SignUp = styled.span`
  ${fontSmall}
`;

const LinkTag = styled.span`
  color: #000;
`;
