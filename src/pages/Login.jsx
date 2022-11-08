import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import instance from "app/module/instance";

import Header from "components/common/Header";
import Layout from "components/common/Layout";
import GlobalInput from "components/elements/GlobalInput";
import GlobalButton from "components/elements/GlobalButton";
import SocialLoginButton from "components/elements/SocialLoginButton";

import { fontSmall } from "shared/themes/textStyle";
import { userStorage } from "shared/utils/localStorage";

import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import IconJoin from "static/icons/Variety=Join membership, Status=untab, Size=S.svg";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickLogin = async () => {
    try {
      const { data } = await instance.post("/user/login", userInfo);
      userStorage.setStorage(data);
      window.location.replace("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <Header>
        <img onClick={() => navigate(-1)} src={IconBack} alt="IconBack" />
        <h1>로그인</h1>
      </Header>

      <Layout>
        <S.Container>
          <S.InnerContainer>
            <GlobalInput
              onChange={handleOnChange}
              name="userId"
              type="text"
              placeholder="아이디를 입력해주세요"
              maxLength={12}
            />
            <GlobalInput
              onChange={handleOnChange}
              name="password"
              type="password"
              placeholder="패스워드를 입력해주세요"
            />
            {error && <S.ErrorMsg>*아이디와 비밀번호를 확인해주세요</S.ErrorMsg>}
          </S.InnerContainer>

          <S.InnerContainer>
            <GlobalButton onClick={handleClickLogin}>로그인</GlobalButton>
            <SocialLoginButton />
          </S.InnerContainer>

          <S.NaviSignUp>
            <span>아직 회원이 아닌가요?</span>
            <button onClick={() => navigate("/signUp")}>
              회원가입
              <img src={IconJoin} alt="IconJoin" />
            </button>
          </S.NaviSignUp>
        </S.Container>
      </Layout>
    </>
  );
};

export default Login;

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.4rem;

    padding-top: 8.4rem;
  `,

  ErrorMsg: styled.span`
    margin-left: 1.2rem;

    ${fontSmall}
    color: ${({ theme }) => theme.warning};
  `,

  InnerContainer: styled.article`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    width: 100%;
  `,

  NaviSignUp: styled.article`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    span {
      ${fontSmall}
      color: ${({ theme }) => theme.sub2};
    }

    button {
      display: flex;
      align-items: center;

      ${fontSmall}
    }
  `,
};
