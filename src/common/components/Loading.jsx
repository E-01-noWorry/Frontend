import React from "react";
import styled from "styled-components";

const Loading = () => {
  return <S.Loading />;
};

const S = {
  Loading: styled.div`
    @media ${({ theme }) => theme.device.PC} {
      position: absolute;
      width: ${({ theme }) => theme.style.width};
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      min-height: 100%;
    }

    background-color: ${({ theme }) => theme.bg};
  `,
};

export default Loading;
