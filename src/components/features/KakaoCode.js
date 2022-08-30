import React from "react";
import { useDispatch } from "react-redux";
import { kakaoLoginThunk } from "../../app/module/kakaoSlice";


const KakaoCode = () => {
    const dispatch = useDispatch();

    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");

    dispatch(kakaoLoginThunk(code))
  

    return (
      <button>잠시만 기다려 주세요! 로그인 중입니다.</button>    
    );

};

export default KakaoCode;