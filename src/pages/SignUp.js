import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/common/Header';
import BodyPadding from '../components/common/BodyPadding';
import LoginSignUpInput from '../components/elements/LoginSignUpInput';
import GlobalButton from '../components/elements/GlobalButton';

import { fontBold, fontLarge, fontSmall } from '../shared/themes/textStyle';
import { IconLarge } from '../shared/themes/iconStyle';

import IconBack from '../static/icons/Variety=back, Status=untab, Size=L.svg';

import styled from 'styled-components';
import instance from '../app/module/instance';
import { ModalBasic } from '../components/common/Modal';

const SignUp = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState('');
  const [successModal, setSuccessModal] = useState('');
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

  const onClickSignUp = async () => {
    try {
      await instance.post('/user/signup', signUpInfo);
      setSuccessModal('회원가입을 완료했습니다.');
    } catch (error) {
      setModal(error.response.data.errMsg);
    }
  };

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
      {successModal && (
        <ModalBasic setter={() => navigate('/login')}>
          {successModal}
        </ModalBasic>
      )}

      {modal && <ModalBasic setter={() => setModal('')}>{modal}</ModalBasic>}

      <Header>
        <StHeaderIcon onClick={() => navigate(-1)}>
          <img src={IconBack} />
        </StHeaderIcon>
        <StHeaderTitle>회원가입</StHeaderTitle>
        <StHeaderIcon></StHeaderIcon>
      </Header>

      <BodyPadding>
        <SignUpContainer>
          <div>
            <StInnerTitle>아이디</StInnerTitle>
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
          </div>
          <div>
            <StInnerTitle>비밀번호</StInnerTitle>
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
              style={{ marginTop: '1.6rem' }}
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
          </div>
          <div>
            <StInnerTitle>닉네임</StInnerTitle>
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
          </div>

          <GlobalButton onClick={onClickSignUp}>가입하기</GlobalButton>
        </SignUpContainer>
      </BodyPadding>
    </div>
  );
};

export default SignUp;

const StHeaderIcon = styled.div`
  ${IconLarge};
`;

const StHeaderTitle = styled.div`
  ${fontLarge};
`;

const SignUpContainer = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    margin-top: 6.4rem;
    padding: 0 2rem;
    min-height: calc(100% - 6.4rem);
  }

  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin-top: 6.4rem;
  background-color: ${({ theme }) => theme.bg};
`;

const StInnerTitle = styled.div`
  margin-bottom: 1.6rem;

  ${fontBold};
  line-height: 2.4rem;
`;

const Correct = styled.p`
  margin: 0.8rem 0 0 1.2rem;

  ${fontSmall}
  line-height: 2rem;
  color: ${({ theme }) => theme.sub2};
`;

const Incorrect = styled(Correct)`
  color: ${({ theme }) => theme.warning};
`;
