import React from "react";

import IconWrite from "../../static/icons/Variety=Write, Status=untab, Size=XL.svg";

import styled from "styled-components";
import { userStorage } from "shared/utils/localStorage";
import { useNavigate } from "react-router-dom";

const WriteButton = ({ pathname, handleWriteModal, handleLoginModal }) => {
  const navigate = useNavigate();

  const handleClickWrite = () => {
    if (!userStorage.getToken()) {
      handleLoginModal();
      return;
    }

    if (pathname === "/select") {
      handleWriteModal();
    } else {
      navigate("/write", { state: { now: "/room" } });
    }
  };

  return (
    <S.Container>
      <S.WriteButton onClick={handleClickWrite}>
        <img src={IconWrite} alt="IconWrite" />
      </S.WriteButton>
    </S.Container>
  );
};

const S = {
  Container: styled.section`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: fixed;
    bottom: 7.2rem;

    display: flex;
    justify-content: flex-end;
    padding-bottom: 2rem;
    padding-right: 2rem;

    width: 100%;
  `,

  WriteButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    img {
      z-index: 9;
    }
  `,
};

export default WriteButton;
