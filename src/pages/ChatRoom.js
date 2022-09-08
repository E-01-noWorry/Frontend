import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import instance from '../app/module/instance';
import { io } from 'socket.io-client';

import BodyPadding from '../components/common/BodyPadding';
import FooterInput from '../components/common/FooterInput';
import Header from '../components/common/Header';
import { ModalExit } from '../components/common/Modal';

import { IconLarge, IconSmall } from '../shared/themes/iconStyle';
import { fontLarge, fontMedium } from '../shared/themes/textStyle';

import styled from 'styled-components';
import ChatBox from '../components/features/chat/ChatBox';

const ChatRoom = () => {
  const navigate = useNavigate();

  const { roomKey } = useParams();
  const userKey = localStorage.getItem('userKey');

  const socket = useRef();
  const sendMessage = useRef();

  const [modalExit, setModalExit] = useState(false);
  const [chatState, setChatState] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});

  const getAllchat = async () => {
    try {
      const { data } = await instance.get(`/room/${roomKey}`);
      setRoomInfo(data.result);
      setChatState(data.loadChat);
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  };

  useEffect(() => {
    getAllchat();

    socket.current = io(process.env.REACT_APP_SOCKET);
    const param = { roomKey: parseInt(roomKey), userKey: parseInt(userKey) };
    socket.current.emit('join-room', param);

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current.on('message', (data) => {
      setChatState([
        ...chatState,
        {
          chat: data.message,
          userKey: data.userKey,
          User: { nickname: data.nickname },
          createdAt: data.time,
        },
      ]);
    });

    socket.current.on('welcome', (data) => {
      setChatState([
        ...chatState,
        {
          chat: `${data.nickname}님이 입장했습니다.`,
          userKey: 12,
          User: { nickname: 'admin99' },
        },
      ]);
    });

    socket.current.on('bye', (data) => {
      setChatState([
        ...chatState,
        {
          chat: `${data.nickname}님이 퇴장했습니다.`,
          userKey: 12,
          User: { nickname: 'admin99' },
        },
      ]);
    });

    socket.current.on('byeHost', () => {
      setChatState([]);
      alert('호스트가 채팅방을 삭제했습니다. 메인 화면으로 이동합니다.');
      navigate('/', { state: 'room' });
    });
  }, [chatState]);

  const sendMessageHandler = (event) => {
    event.preventDefault();
    if (sendMessage.current.value.trim()) {
      const param = {
        message: sendMessage.current.value,
        roomKey: parseInt(roomKey),
        userKey: parseInt(userKey),
      };
      socket.current.emit('chat_message', param);
      sendMessage.current.value = '';
    }
  };

  const leaveRoomHandler = async () => {
    try {
      const param = { roomKey: parseInt(roomKey), userKey: parseInt(userKey) };
      socket.current.emit('leave-room', param);
      await instance.delete(`/room/${roomKey}`);
      navigate('/', { state: 'room' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {modalExit && (
        <ModalExit
          leave={leaveRoomHandler}
          setter={() => setModalExit(false)}
        />
      )}

      <Header>
        <StHeaderIcon onClick={() => navigate('/', { state: 'room' })}>
          뒤
        </StHeaderIcon>
        <StHeaderInfo>
          <h1>{roomInfo.host}</h1>
          <span>{roomInfo.currentPeople}</span>
        </StHeaderInfo>
        {parseInt(userKey) === roomInfo?.userKey ? (
          <StHeaderIcon onClick={leaveRoomHandler}>삭</StHeaderIcon>
        ) : (
          <StHeaderIcon onClick={() => setModalExit(true)}>나</StHeaderIcon>
        )}
      </Header>

      <StHeaderTitle>
        <StSpeakIcon></StSpeakIcon>
        <span>{roomInfo.title}</span>
      </StHeaderTitle>

      <BodyPadding>
        <ChatBox chatState={chatState} userKey={userKey} />
      </BodyPadding>

      <FooterInput>
        <form onSubmit={sendMessageHandler}>
          <input ref={sendMessage} placeholder="메세지를 입력하세요" />
          <StSendIcon onClick={sendMessageHandler}></StSendIcon>
        </form>
      </FooterInput>
    </div>
  );
};

export default ChatRoom;

const StHeaderIcon = styled.div`
  ${IconLarge};
  background-color: green;
`;

const StSpeakIcon = styled.div`
  ${IconSmall};
  background-color: green;
`;

const StHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  h1 {
    ${fontLarge};
  }

  span {
    ${fontLarge};
  }
`;

const StHeaderTitle = styled.div`
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
  background-color: #f5f5f5;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

  span {
    ${fontMedium}
  }
`;

const StSendIcon = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;

  ${IconLarge};
  background-color: green;
`;
