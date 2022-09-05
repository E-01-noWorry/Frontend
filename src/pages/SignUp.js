import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginSignUpInput from '../components/elements/LoginSignUpInput';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpThunk } from '../app/module/signUpSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import BodyPadding from '../components/common/BodyPadding';
import Header from '../components/common/Header';
import { fontLarge, fontSmall } from '../shared/themes/textStyle';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpState = useSelector((state) => state.signUp);

  //회원가입 오류시 오류메시지 alert
  useEffect(() => {
    if (signUpState.error?.errMsg) {
      toast.error(`${signUpState.error?.errMsg}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    }
  }, [signUpState.error]);

  const [signUpInfo, setSignUpInfo] = useState({
    userId: '',
    password: '',
    confirm: '',
    nickname: '',
  });

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };

  const onClickSignUp = () => {
    dispatch(signUpThunk(signUpInfo));
  };

  //회원가입 완료시 로그인으로 이동
  if (signUpState.error?.msg !== undefined) {
    navigate('/login');
  }

  //유효성 검사
  const userIdRegEx = /^[A-Za-z0-9]{6,20}$/;
  const nicknameRegEx = /^[가-힣,A-Za-z0-9]{2,10}$/;
  const passwordRegEx = /^[A-Za-z0-9]{6,20}$/;

  //onFocus, onBlur시 보이는 표시
  const [userIdValid, setUserIdValid] = useState();
  const onFocusUserIdValid = () => {
    setUserIdValid(true);
  };
  const onBlurUserIdValid = () => {
    setUserIdValid(false);
  };

  const [nicknameValid, setNicknameValid] = useState();
  const onFocusNicknameValid = () => {
    setNicknameValid(true);
  };
  const onBlurNicknameValid = () => {
    setNicknameValid(false);
  };

  const [passwordValid, setPasswordValid] = useState();
  const onFocusPasswordValid = () => {
    setPasswordValid(true);
  };
  const onBlurPasswordValid = () => {
    setPasswordValid(false);
  };

  const [passwordCheckValid, setPasswordCheckValid] = useState();
  const onFocusPasswordCheckValid = () => {
    setPasswordCheckValid(true);
  };
  const onBlurPasswordCheckValid = () => {
    setPasswordCheckValid(false);
  };

  return (
    <div>
      <BodyPadding>
        <Header>
          <HeaderContainer>
            <Link to="/login">
              <Aarow>&#8592;</Aarow>
            </Link>
            <SignUpHeader>회원가입</SignUpHeader>
          </HeaderContainer>
        </Header>
        <SignUpContainer>
          아이디
          <LoginSignUpInput
            signUpInfo
            userIdRegEx
            name="userId"
            onFocus={onFocusUserIdValid}
            onBlur={onBlurUserIdValid}
            onChange={onChangeHandler}
            placeholder="아이디 입력"
            type="text"
          />
          {userIdValid === true &&
          signUpInfo.userId.match(userIdRegEx) === null ? (
            <Incorrect>
              *영문과 숫자만 사용하여 6~12자의 아이디를 입력해주세요.
            </Incorrect>
          ) : userIdValid === true &&
            signUpInfo.userId.match(userIdRegEx) !== null ? (
            <Correct>*사용가능한 아이디 입니다</Correct>
          ) : userIdValid === false &&
            signUpInfo.userId.match(userIdRegEx) === null ? (
            <Incorrect>
              *영문과 숫자만 사용하여 6~12자의 아이디를 입력해주세요.
            </Incorrect>
          ) : userIdValid === false &&
            signUpInfo.userId.match(userIdRegEx) !== null ? (
            <Correct>*사용가능한 아이디 입니다</Correct>
          ) : null}
          비밀번호
          <LoginSignUpInput
            name="password"
            onFocus={onFocusPasswordValid}
            onBlur={onBlurPasswordValid}
            onChange={onChangeHandler}
            placeholder="영문,숫자로만 6자리 이상"
            type="password"
          />
          {passwordValid === true && signUpInfo.password.length < 6 ? (
            <Incorrect>*6자리 이상 입력해주세요</Incorrect>
          ) : passwordValid === true &&
            signUpInfo.password.match(passwordRegEx) !== null ? (
            <Correct>*사용가능한 비밀번호 입니다</Correct>
          ) : passwordValid === false && signUpInfo.password.length < 6 ? (
            <Incorrect>*6자리 이상 입력해주세요</Incorrect>
          ) : passwordValid === false &&
            signUpInfo.password.match(passwordRegEx) !== null ? (
            <Correct>*사용가능한 비밀번호 입니다</Correct>
          ) : passwordValid === true &&
            signUpInfo.password.match(passwordRegEx) === null &&
            signUpInfo.password.length < 20 ? (
            <Incorrect>*영문, 숫자로만 입력하세요</Incorrect>
          ) : passwordValid === false &&
            signUpInfo.password.match(passwordRegEx) === null &&
            signUpInfo.password.length < 20 ? (
            <Incorrect>*영문, 숫자로만 입력하세요</Incorrect>
          ) : passwordValid === true &&
            signUpInfo.password.match(passwordRegEx) === null &&
            signUpInfo.password.length > 20 ? (
            <Incorrect>*비밀번호는 최대 20자입니다</Incorrect>
          ) : passwordValid === false &&
            signUpInfo.password.match(passwordRegEx) === null &&
            signUpInfo.password.length > 20 ? (
            <Incorrect>*비밀번호는 최대 20자입니다</Incorrect>
          ) : null}
          <LoginSignUpInput
            name="confirm"
            onFocus={onFocusPasswordCheckValid}
            onBlur={onBlurPasswordCheckValid}
            onChange={onChangeHandler}
            placeholder="비밀번호 재입력"
            type="password"
          />
          {passwordCheckValid === true &&
          signUpInfo.password !== signUpInfo.confirm ? (
            <Incorrect>*비밀번호가 일치하지 않습니다</Incorrect>
          ) : passwordCheckValid === true &&
            signUpInfo.password === signUpInfo.confirm ? (
            <Correct>*비밀번호와 일치합니다</Correct>
          ) : passwordCheckValid === false &&
            signUpInfo.password !== signUpInfo.confirm ? (
            <Incorrect>
              *비밀번호가 일치하지 않습니다. 다시 입력해주세요
            </Incorrect>
          ) : passwordCheckValid === false &&
            signUpInfo.password === signUpInfo.confirm ? (
            <Correct>*비밀번호와 일치합니다</Correct>
          ) : null}
          닉네임
          <LoginSignUpInput
            name="nickname"
            onFocus={onFocusNicknameValid}
            onBlur={onBlurNicknameValid}
            onChange={onChangeHandler}
            placeholder="최소 2자 입력"
            type="text"
          />
          {nicknameValid === true &&
          signUpInfo.nickname.match(nicknameRegEx) === null ? (
            <Incorrect>*한글, 영문, 숫자로만 2~10자로 입력해주세요</Incorrect>
          ) : nicknameValid === true &&
            signUpInfo.nickname.match(nicknameRegEx) !== null ? (
            <Correct>*익명으로 안심하고 고민을 이야기할 수 있어요.</Correct>
          ) : nicknameValid === false &&
            signUpInfo.nickname.match(nicknameRegEx) === null ? (
            <Incorrect>*한글, 영문, 숫자로만 2~10자로 입력해주세요</Incorrect>
          ) : nicknameValid === false &&
            signUpInfo.nickname.match(nicknameRegEx) !== null ? (
            <Correct>*익명으로 안심하고 고민을 이야기할 수 있어요.</Correct>
          ) : null}
          <SignUpButton onClick={onClickSignUp}>가입하기</SignUpButton>
          <ToastContainer />
        </SignUpContainer>
      </BodyPadding>
    </div>
  );
};

export default SignUp;

const HeaderContainer = styled.div`
  width: 100%;
`;

const Aarow = styled.span`
  color: #000;
  font-size: 3rem;
  position: relative;
`;
const SignUpHeader = styled.p`
  text-align: center;
  display: inline;
  width: 100%;
  position: absolute;
  right: 0px;
  top: 1.8rem;
  ${fontLarge}
  z-index: -1;
`;

const SignUpContainer = styled.div``;
const Incorrect = styled.p`
  color: #ff7878;
  ${fontSmall}
  margin-bottom: 1.6rem;
`;
const Correct = styled.p`
  color: #5f5f5f;
  ${fontSmall}
  margin-bottom: 1.6rem;
`;

const SignUpButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: #fff;
  width: 100%;
  height: 5.6rem;
  font-size: 1.6rem;
  background: #000000;
  border-radius: 20px;
`;
