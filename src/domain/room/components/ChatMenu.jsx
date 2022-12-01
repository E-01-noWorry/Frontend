import React, { useState, useEffect } from "react";

import ProfileImg from "common/elements/ProfileImg";

import { fontBold, fontExtraBold } from "shared/themes/textStyle";
import { fontExtraSmall, fontMedium, fontSmall } from "shared/themes/textStyle";

import IconClose from "static/icons/Variety=close, Status=untab, Size=L.svg";
import IconDelete from "static/icons/Variety=delete, Status=untab, Size=L.svg";
import IconLogout from "static/icons/Variety=logout, Status=untab, Size=L.svg";
import styled, { css } from "styled-components";

const ChatMenu = ({
  socket,
  roomKey,
  userKey,
  roomInfo,
  handleChatMenu,
  handleClickExit,
  handleClickDelete,
  handleClickKick,
}) => {
  const [nowUser, setNowUser] = useState([]);

  useEffect(() => {
    socket.current.emit("showUsers", { roomKey, userKey });
    socket.current.on("receive", (data) => {
      setNowUser([...data]);
    });
  }, [socket, roomKey, userKey]);

  return (
    <S.Background>
      <S.Menu>
        <S.Header>
          <img onClick={handleChatMenu} src={IconClose} alt="IconClose" />
        </S.Header>

        <S.Info>
          <div>[익명] {roomInfo.title}</div>
          <div>{roomInfo.currentPeople}명 참여중</div>
        </S.Info>

        <S.People>
          <div>상담 참여자</div>
          <div>
            {nowUser.map((user) => (
              <S.Person key={user.userKey}>
                <ProfileImg point={user.point} size={"4rem"} />

                {user.userKey === userKey && <S.MeBadge>나</S.MeBadge>}

                <S.Nickname isMe={user.userKey === userKey}>{user.nickname}</S.Nickname>

                {roomInfo.userKey === userKey && user.userKey !== userKey && (
                  <S.KickBadge
                    onClick={() => handleClickKick({ key: user.userKey, nickname: user.nickname })}
                  >
                    내보내기
                  </S.KickBadge>
                )}
              </S.Person>
            ))}
          </div>
        </S.People>

        <S.Footer>
          {userKey === roomInfo?.userKey ? (
            <div onClick={handleClickDelete}>
              <img src={IconDelete} alt="IconDelete" />
              <span>상담방 삭제하기</span>
            </div>
          ) : (
            <div onClick={handleClickExit}>
              <img src={IconLogout} alt="IconLogout" />
              <span>상담방 나가기</span>
            </div>
          )}
        </S.Footer>
      </S.Menu>
    </S.Background>
  );
};

const S = {
  Background: styled.div`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);

    z-index: 99;
  `,

  Menu: styled.section`
    position: absolute;
    top: 0;
    right: 0;

    width: 30rem;
    /* height: calc(var(--vh, 1vh) * 100); */
    height: 100vh;
    background-color: ${({ theme }) => theme.bg};

    z-index: 100;
  `,

  Header: styled.article`
    position: relative;

    display: flex;
    align-items: center;

    height: 6.4rem;
    width: 30rem;
    padding: 0 2rem;

    img {
      cursor: pointer;
    }
  `,

  Info: styled.article`
    position: relative;

    padding: 0 2rem 2rem 2rem;

    border-bottom: ${({ theme }) => `1px solid ${theme.sub4}`};

    div:nth-child(1) {
      ${fontBold};
      line-height: 2.4rem;
    }

    div:nth-child(2) {
      ${fontSmall};
      line-height: 2rem;
    }
  `,

  People: styled.article`
    padding: 2rem;

    > div:nth-child(1) {
      ${fontMedium};
      ${fontBold};
      line-height: 2.1rem;

      margin-bottom: 0.8rem;
    }
  `,

  Person: styled.div`
    position: relative;

    display: flex;
    align-items: center;
    gap: 1rem;

    height: 5.6rem;
  `,

  Nickname: styled.div`
    ${fontMedium}
    ${(props) =>
      props.isMe &&
      css`
        ${fontBold}
      `}
  `,

  MeBadge: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1.4rem;
    height: 1.4rem;
    padding: 0.8rem;
    margin-right: -0.7rem;
    background-color: ${({ theme }) => theme.main2};

    border-radius: 0.7rem 0.7rem 0 0.7rem;

    ${fontExtraSmall};
    ${fontExtraBold};
    color: ${({ theme }) => theme.white};
  `,

  KickBadge: styled.div`
    position: absolute;
    right: 0;

    padding: 0.5rem 0.8rem;
    background-color: ${({ theme }) => theme.black};

    border-radius: 1.4rem;

    ${fontExtraSmall};
    line-height: 1.8rem;
    color: ${({ theme }) => theme.white};

    cursor: pointer;
  `,

  Footer: styled.div`
    position: absolute;
    bottom: 0;

    display: flex;
    align-items: center;

    width: 100%;
    height: 6.4rem;
    padding: 0 2rem;
    background-color: ${({ theme }) => theme.bg};

    div {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
    }

    span {
      ${fontMedium};
    }
  `,
};

export default ChatMenu;
