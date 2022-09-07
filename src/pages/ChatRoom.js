import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import instance from '../app/module/instance';
import { io } from 'socket.io-client';

import BodyPadding from '../components/common/BodyPadding';
import FooterInput from '../components/common/FooterInput';
import Header from '../components/common/Header';
import ProfileImg from '../components/elements/ProfileImg';

import { nowTime } from '../shared/timeCalculation';

import { IconLarge, IconSmall } from '../shared/themes/iconStyle';
import { fontLarge, fontMedium, fontSmall } from '../shared/themes/textStyle';

import styled from 'styled-components';

const ChatRoom = () => {
  const navigate = useNavigate();

  const { roomKey } = useParams();
  const userKey = localStorage.getItem('userKey');

  const socket = useRef();
  const sendMessage = useRef();

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
          <StHeaderIcon onClick={leaveRoomHandler}>나</StHeaderIcon>
        )}
      </Header>

      <StHeaderTitle>
        <StSpeakIcon></StSpeakIcon>
        <span>{roomInfo.title}</span>
      </StHeaderTitle>

      <BodyPadding>
        <StChatWrap>
          {chatState.map((chat, idx) => (
            <StChat key={idx}>
              <div
                className={
                  chat.userKey === 12
                    ? 'system'
                    : chat.userKey === parseInt(userKey)
                    ? 'right'
                    : 'left'
                }
              >
                {chat.User.nickname === 'admin99' ? (
                  <div className="middle">
                    <div className="chat">{chat.chat}</div>
                  </div>
                ) : (
                  <>
                    <ProfileImg className="img" />

                    <div className="middle">
                      <div className="nickname">{chat.User.nickname}</div>
                      <div className="chat">{chat.chat}</div>
                    </div>

                    <span className="time">{nowTime(chat.createdAt)}</span>
                  </>
                )}
              </div>
            </StChat>
          ))}
        </StChatWrap>
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

const StChatWrap = styled.div`
  margin-top: 11rem;
  margin-bottom: 8rem;
`;

const StSendIcon = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;

  ${IconLarge};
  background-color: green;
`;

const StChat = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  //시스템 메세지 CSS
  .system {
    display: inline-block;
    background-color: #d3d3d3;

    height: 2.6rem;
    padding: 3px 6px;
    margin: 1.2rem auto;

    border-radius: 1.3rem;

    .chat {
      ${fontSmall};
      line-height: 2rem;
      color: #fff;
    }
  }

  //나의 채팅 CSS
  .right {
    display: flex;
    flex-direction: row-reverse;

    width: 100%;
    height: 100%;
    margin: 1rem 0;

    .img {
      margin-left: 0.8rem;
    }

    .middle {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .nickname {
        ${fontSmall};
        line-height: 2rem;
      }

      .chat {
        display: inline-block;

        max-width: 21.3rem;
        padding: 1rem;
        background-color: #515151;

        border-radius: 2rem 0.4rem 2rem 2rem;

        ${fontMedium};
        line-height: 2.1rem;
        color: #fff;
      }
    }

    .time {
      margin-right: 1rem;
      margin-top: auto;

      font-size: 1.2rem;
      line-height: 1.8rem;
    }
  }

  //다른 사람의 채팅 CSS
  .left {
    display: flex;

    width: 100%;
    height: 100%;
    margin: 1rem 0;

    .img {
      margin-right: 0.8rem;
    }

    .middle {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .nickname {
        ${fontSmall};
        line-height: 2rem;
      }

      .chat {
        display: inline-block;

        max-width: 21.3rem;
        padding: 1rem;
        background-color: #e4e4e4;

        border-radius: 0.4rem 2rem 2rem 2rem;

        ${fontMedium};
        line-height: 2.1rem;
      }
    }

    .time {
      margin-left: 1rem;
      margin-top: auto;

      font-size: 1.2rem;
      line-height: 1.8rem;
    }
  }
`;
