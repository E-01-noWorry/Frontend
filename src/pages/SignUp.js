import React,{useEffect, useState} from "react";
import styled from "styled-components";
import LoginSignUpInput from "../components/elements/LoginSignUpInput"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk } from "../app/module/signUpSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpState = useSelector((state)=>state.signUp)


 //회원가입 오류시 오류메시지 alert 
  useEffect(()=>{
    if(signUpState.error?.errMsg){
    toast.error(`${signUpState.error?.errMsg}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }
  },[signUpState.error])

  const [signUpInfo, setSignUpInfo] = useState({
    userId: "",
    password: "",
    confirm: "",
    nickname: "",
  });

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };

  const onClickSignUp = () => {
    dispatch(signUpThunk(signUpInfo));
  };

//회원가입 완료시 로그인으로 이동
  if(signUpState.error?.msg !== undefined){
    navigate('/login')
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
        <Logo>
            로고입니다
        </Logo>
        <SignUpContainer>
        아이디<LoginSignUpInput name="userId" onFocus={onFocusUserIdValid} onBlur={onBlurUserIdValid} onChange={onChangeHandler} type="text"/>
        {userIdValid === true &&
          signUpInfo.userId.match(userIdRegEx) === null ? (
            <Incorrect>&#10006;영문,숫자 6~20자</Incorrect>
          ) : userIdValid === true &&
            signUpInfo.userId.match(userIdRegEx) !== null ? (
            <Correct>&#10004;사용가능한 아이디 입니다</Correct>
          ) : userIdValid === false &&
            signUpInfo.userId.match(userIdRegEx) === null ? (
            <Incorrect>&#10006;영문,숫자 6~20자</Incorrect>
          ) : userIdValid === false &&
            signUpInfo.userId.match(userIdRegEx) !== null ? (
            <Correct>&#10004;사용가능한 아이디 입니다</Correct>
          ) : null}

        닉네임<LoginSignUpInput name="nickname" onFocus={onFocusNicknameValid} onBlur={onBlurNicknameValid} onChange={onChangeHandler} type="text"/>
        {nicknameValid === true &&
          signUpInfo.nickname.match(nicknameRegEx) === null ? (
            <Incorrect>&#10006;한글,영문,숫자 2~10자</Incorrect>
          ) : nicknameValid === true &&
            signUpInfo.nickname.match(nicknameRegEx) !== null ? (
            <Correct>&#10004;멋진 닉네임이군요</Correct>
          ) : nicknameValid === false &&
            signUpInfo.nickname.match(nicknameRegEx) === null ? (
            <Incorrect>&#10006;한글,영문,숫자 2~10자</Incorrect>
          ) : nicknameValid === false &&
            signUpInfo.nickname.match(nicknameRegEx) !== null ? (
            <Correct>&#10004;멋진 닉네임이군요</Correct>
          ) : null}

        비밀번호<LoginSignUpInput name="password" onFocus={onFocusPasswordValid} onBlur={onBlurPasswordValid} onChange={onChangeHandler} type="password"/>
        {passwordValid === true &&
          signUpInfo.password.match(passwordRegEx) === null ? (
            <Incorrect>&#10006;영문,숫자 6~20자</Incorrect>
          ) : passwordValid === true &&
            signUpInfo.password.match(passwordRegEx) !== null ? (
            <Correct>&#10004;사용가능한 비밀번호 입니다</Correct>
          ) : passwordValid === false &&
            signUpInfo.password.match(passwordRegEx) === null ? (
            <Incorrect>&#10006;영문,숫자 6~20자</Incorrect>
          ) : passwordValid === false &&
            signUpInfo.password.match(passwordRegEx) !== null ? (
            <Correct>&#10004;사용가능한 비밀번호 입니다</Correct>
          ) : null}

        비밀번호 확인<LoginSignUpInput name="confirm" onFocus={onFocusPasswordCheckValid} onBlur={onBlurPasswordCheckValid} onChange={onChangeHandler} type="password"/>
        {passwordCheckValid === true &&
          signUpInfo.password !== signUpInfo.confirm ? (
            <Incorrect>&#10006;비밀번호가 일치하지 않습니다</Incorrect>
          ) : passwordCheckValid === true &&
            signUpInfo.password === signUpInfo.confirm ? (
            <Correct>&#10004;비밀번호와 일치합니다</Correct>
          ) : passwordCheckValid === false &&
            signUpInfo.password !== signUpInfo.confirm ? (
            <Incorrect>&#10006;비밀번호가 일치하지 않습니다</Incorrect>
          ) : passwordCheckValid === false &&
            signUpInfo.password === signUpInfo.confirm ? (
            <Correct>&#10004;비밀번호와 일치합니다</Correct>
          ) : null}
        <button onClick={onClickSignUp}>회원가입</button>
        <ToastContainer/>
        <Link to="/login">로그인화면으로 이동</Link>
        </SignUpContainer>
        </div>
    );
};

export default SignUp;

const Logo = styled.section``
const SignUpContainer = styled.div``
const Incorrect = styled.p`
color:red;
`
const Correct = styled.p`
color:green;
`