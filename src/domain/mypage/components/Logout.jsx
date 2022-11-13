import React from "react";
import { fontBold, fontSmall } from "shared/themes/textStyle";
import styled from "styled-components";

const Logout = ({ handleLogoutModal }) => {
  return (
    <S.Logout>
      <span onClick={handleLogoutModal}>로그아웃</span>
    </S.Logout>
  );
};

const S = {
  Logout: styled.article`
    display: flex;
    justify-content: center;

    margin-top: 3rem;

    ${fontSmall};
    ${fontBold};
    color: ${({ theme }) => theme.sub2};

    span {
      cursor: pointer;
    }
  `,
};

export default Logout;
