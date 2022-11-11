import React from "react";
import { useNavigate } from "react-router-dom";
import GlobalButton from "components/elements/GlobalButton";
import styled from "styled-components";

const LoginContainer = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <GlobalButton h="4.4rem" fs="1.4rem" onClick={() => navigate("/login")}>
        로그인
      </GlobalButton>
      <GlobalButton h="4.4rem" fs="1.4rem" onClick={() => navigate("/signup")}>
        회원가입
      </GlobalButton>
    </S.Container>
  );
};

const S = {
  Container: styled.article`
    display: flex;
    gap: 0.8rem;
  `,
};

export default LoginContainer;
