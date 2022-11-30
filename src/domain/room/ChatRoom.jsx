import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import instance from "app/module/instance";

import ChatMenu from "./components/ChatMenu";
import ExitModal from "./components/ExitModal";
import DeleteModal from "domain/room/components/DeleteModal";
import KickModal from "./components/KickModal";
import BasicModal from "common/components/modal/BasicModal";

import Header from "common/components/Header";
import Layout from "common/components/Layout";
import ChatBox from "domain/room/ChatBox";
import ChatInput from "./components/ChatInput";

import useChatState from "./hooks/useChatState";
import useModalState from "common/hooks/useModalState";
import { userStorage } from "shared/utils/localStorage";

import { fontBold, fontMedium } from "shared/themes/textStyle";
import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import IconAnnounce from "static/icons/Variety=announce, Status=untab, Size=M.svg";
import IconDrawer from "static/icons/Variety=drawer, Status=untab, Size=L.svg";
import styled from "styled-components";

const ChatRoom = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const socket = useRef();
  const { roomKey } = useParams();
  const userKey = userStorage.getUserKey();
  const { roomInfo, chat, kickMessage, hostMessage } = useChatState({
    socket,
    roomKey: Number(roomKey),
    userKey,
  });
  const [kickUser, setKickUser] = useState({ key: null, nickname: "" });

  const [chatMenu, handleChatMenu] = useModalState(false);
  const [exitModal, handleExitModal] = useModalState(false);
  const [deleteModal, handleDeleteModal] = useModalState(false);
  const [kickModal, handleKickModal] = useModalState(false);

  const handleClickBack = () => {
    if (!state?.now || state.now === "/write") {
      navigate("/room", { replace: true });
    } else {
      navigate(-1, { replace: true });
    }
  };

  const handleClickLeave = async () => {
    socket.current.emit("leave-room", { roomKey: Number(roomKey), userKey });
    await instance.delete(`/room/${roomKey}`);
    handleClickBack();
  };

  const handleClickKick = ({ key, nickname }) => {
    setKickUser((prev) => ({ ...prev, key, nickname }));
    handleChatMenu();
    handleKickModal();
  };

  const handleSetKick = () => {
    setKickUser({ key: null, nickname: "" });
    handleKickModal();
  };

  const handleClickExit = () => {
    handleChatMenu();
    handleExitModal();
  };

  const handleClickDelete = () => {
    handleChatMenu();
    handleDeleteModal();
  };

  return (
    <>
      {chatMenu && (
        <ChatMenu
          socket={socket}
          roomKey={Number(roomKey)}
          userKey={userKey}
          roomInfo={roomInfo}
          handleChatMenu={handleChatMenu}
          handleClickExit={handleClickExit}
          handleClickDelete={handleClickDelete}
          handleClickKick={handleClickKick}
        />
      )}

      {exitModal && <ExitModal handleClick={handleClickExit} handleClickLeave={handleClickLeave} />}

      {deleteModal && (
        <DeleteModal
          socket={socket}
          roomKey={Number(roomKey)}
          userKey={userKey}
          handleClickDelete={handleClickDelete}
          handleClickLeave={handleClickLeave}
        />
      )}

      {kickModal && (
        <KickModal
          socket={socket}
          roomKey={Number(roomKey)}
          userKey={kickUser.key}
          nickname={kickUser.nickname}
          handleClickKick={handleClickKick}
          handleSetKick={handleSetKick}
        />
      )}

      {kickMessage.key === userKey && (
        <BasicModal handleClick={() => navigate("/room", { replace: true })}>
          {kickMessage.msg}
        </BasicModal>
      )}

      {hostMessage && (
        <BasicModal handleClick={() => navigate("/room", { replace: true })}>
          {hostMessage}
        </BasicModal>
      )}

      <Header>
        <img onClick={handleClickBack} src={IconBack} alt="IconBack" />
        <h1>
          {roomInfo.host} <span>{roomInfo.currentPeople}</span>
        </h1>
        <img onClick={handleChatMenu} src={IconDrawer} alt="IconDrawer" />
      </Header>

      <S.RoomTitle>
        <img src={IconAnnounce} alt="IconAnnounce" />
        <span>{roomInfo.title}</span>
      </S.RoomTitle>

      <Layout>
        <ChatBox chat={chat} userKey={userKey} />
      </Layout>

      <ChatInput socket={socket} roomKey={Number(roomKey)} userKey={userKey} />
    </>
  );
};

const S = {
  RoomTitle: styled.section`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: fixed;
    top: 6.4rem;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;

    width: 100%;
    height: 3.4rem;
    padding: 0 5rem;
    background-color: ${({ theme }) => theme.bg};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

    z-index: 8;

    img {
      width: 2rem;
    }

    span {
      ${fontMedium}
      ${fontBold}
    }
  `,
};

export default ChatRoom;
