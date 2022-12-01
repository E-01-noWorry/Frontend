import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <S.Layout>{children}</S.Layout>;
};

const S = {
  Layout: styled.main`
    @media ${({ theme }) => theme.device.PC} {
      position: absolute;
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    width: 100%;
    min-height: 100%;
    padding: 0 2rem;
    background-color: ${({ theme }) => theme.color.bg};
  `,
};

export default Layout;
