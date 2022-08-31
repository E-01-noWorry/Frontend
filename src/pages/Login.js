import React,{useState, useEffect} from "react";
import styled from "styled-components";
import LoginSignUpInput from "../components/elements/LoginSignUpInput"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../app/module/loginSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import KakaoLogin from "../components/features/KakaoLogin"
import { kakaoLoginThunk } from "../app/module/kakaoSlice";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state)=>state.login)
  
  const [login, setLogin] = useState({
    userId: "",
    password: "",
})

  const onChangeHandler = (event) => {
    const {value, name} = event.target;
    setLogin({...login, [name]:value})
};

const onClickLogin = () => {
    dispatch(loginThunk(login))
};

// const onClickLoginError = () => {
//     if(loginState?.error?.errMsg){
//         toast.error(`${loginState?.error?.errMsg}`, {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//         });
//     };
// };

//   로그인 오류시 오류메시지 alert 
useEffect(()=>{
    if(loginState?.error?.errMsg){
    toast.error(`${loginState?.error?.errMsg}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }
  },[loginState])  


if(loginState?.userLogin?.msg !== undefined){
    navigate("/")
};


    return (
        <div>
        <Logo>
            로고입니다
        </Logo>
        <LoginContainer>
            <LoginSignUpInput onChange={onChangeHandler} name="userId" type="text" placeholder="아이디를 입력해주세요"/>
            <LoginSignUpInput onChange={onChangeHandler} name="password" type="password" placeholder="패스워드를 입력해주세요"/>
            <LoginButton onClick={()=>{
                onClickLogin()
                }}>로그인</LoginButton>
            <ToastContainer/>
            <KakaoLogin/>
            <Link to='/signup'>회원가입 화면으로 이동</Link>
            <br/>
            <Link to='/'>메인 화면으로 이동</Link>
        </LoginContainer>
        </div>
    );
};

export default Login;

const Logo = styled.section``
const LoginContainer = styled.div``
const LoginButton = styled.button``

