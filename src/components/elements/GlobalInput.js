import React from "react";
import styled from "styled-components";

function GlobalInput({ children, ...rest }) {
  return <S.Input {...rest}>{children}</S.Input>;
}

export default GlobalInput;

const S = {
  Input: styled.input`
    display: flex;
    align-items: center;

    width: 100%;
    height: 5.6rem;
    padding: 0.8rem 1.2rem;
    background: ${({ theme }) => theme.white};

    border: none;
    border-radius: 2rem;
  `,
};
