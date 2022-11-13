import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "components/common/Header";
import ProfileImg from "components/elements/ProfileImg";
import GlobalButton from "components/elements/GlobalButton";

import { fontBold, fontExtraBold, fontLarge, fontMedium } from "shared/themes/textStyle";
import IconCloseWhite from "static/icons/Variety=close white, Status=untab, Size=L.svg";
import styled from "styled-components";

const JoinModal = ({ pathname, handleJoinModal, roomInfo, entered }) => {
  const navigate = useNavigate();

  return (
    <S.Background>
      <S.Header>
        <img onClick={handleJoinModal} src={IconCloseWhite} alt="IconCloseWhite" />
      </S.Header>

      <S.Body>
        <S.SubTitle>고민상담방</S.SubTitle>
        <S.Title>{roomInfo.title}</S.Title>
        <S.HashTag>
          {roomInfo.hashTag?.map((item) => (
            <div key={item}>#{item}</div>
          ))}
        </S.HashTag>

        <S.Footer>
          <ProfileImg point={roomInfo.point} />
          <div>
            <span>{roomInfo.host}</span>
            <span>
              참여자 {roomInfo.currentPeople}/{roomInfo.max} 명
            </span>
          </div>
        </S.Footer>
      </S.Body>

      <S.GlobalButton
        onClick={() => {
          navigate(`/chatroom/${roomInfo.roomKey}`, { state: { now: pathname } });
        }}
      >
        {entered.includes(roomInfo.roomKey) ? "참여중인 상담방" : "상담방 참여하기"}
      </S.GlobalButton>
    </S.Background>
  );
};

const S = {
  Header: styled(Header)`
    background-color: transparent;
  `,

  Background: styled.section`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    background-color: #575553;

    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;

    z-index: 99;
  `,

  Body: styled.article`
    position: absolute;
    bottom: 13.6rem;

    width: 100%;

    color: ${({ theme }) => theme.white};
    ${fontMedium};
  `,

  SubTitle: styled.div`
    line-height: 2.1rem;
  `,

  Title: styled.div`
    ${fontLarge};
    ${fontExtraBold};
    line-height: 3rem;
  `,

  HashTag: styled.div`
    display: flex;
    gap: 0.8rem;

    margin-top: 1.6rem;

    ${fontBold};
    line-height: 2.1rem;
  `,

  Footer: styled.div`
    display: grid;
    grid-template-columns: 4rem auto;
    align-items: center;
    gap: 1rem;

    margin-top: 4rem;

    > div:nth-child(2) {
      display: flex;
      flex-direction: column;

      line-height: 2.1rem;

      span:nth-child(1) {
        ${fontBold};
      }
    }
  `,

  GlobalButton: styled(GlobalButton)`
    position: absolute;
    bottom: 2.4rem;
  `,
};

export default JoinModal;
