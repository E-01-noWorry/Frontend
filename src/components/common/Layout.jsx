import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <S.Layout>{children}</S.Layout>;
};

const S = {
  Layout: styled.div`
    @media ${({ theme }) => theme.device.PC} {
      position: absolute;
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    width: 100%;
    height: 100vh;
    /* height: calc(var(--vh, 1vh) * 100); */
  `,
};

export default Layout;
