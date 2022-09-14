import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import instance from '../app/module/instance';
import { io } from 'socket.io-client';

import ProfileImg from '../components/elements/ProfileImg';
import BodyPadding from '../components/common/BodyPadding';
import FooterInput from '../components/common/FooterInput';
import Header from '../components/common/Header';
import ChatBox from '../components/features/chat/ChatBox';
import { ModalBasic, ModalDelete, ModalExit } from '../components/common/Modal';

import { IconLarge, IconSmall } from '../shared/themes/iconStyle';
import { fontBold, fontLarge, fontMedium } from '../shared/themes/textStyle';

import IconBack from '../static/icons/Variety=back, Status=untab.svg';
import IconLogout from '../static/icons/Variety=logout, Status=untab.svg';
import IconDelete from '../static/icons/Variety=delete, Status=untab.svg';
import IconAnnounce from '../static/icons/Variety=announce, Status=untab.svg';
import IconSend from '../static/icons/Variety=send, Status=untab.svg';

import styled from 'styled-components';

const ChatRoom = () => {
  const navigate = useNavigate();

  const { roomKey } = useParams();
  const userKey = localStorage.getItem('userKey');

  const socket = useRef();
  const sendMessage = useRef();

  const [hostByeModal, setHostByeModal] = useState('');
  const [modalExit, setModalExit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [isSelect, setIsSelect] = useState(0);
  const [chatState, setChatState] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [nowUsers, setNowUsers] = useState([]);

  const getAllchat = useCallback(async () => {
    try {
      const { data } = await instance.get(`/room/${roomKey}`);
      setRoomInfo(data.result);
      setChatState(data.loadChat);
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  }, [roomKey]);

  useEffect(() => {
    getAllchat();

    socket.current = io(process.env.REACT_APP_SOCKET);
    const param = { roomKey: parseInt(roomKey), userKey: parseInt(userKey) };
    socket.current.emit('join-room', param);

    return () => {
      socket.current.disconnect();
    };
  }, [getAllchat, roomKey, userKey]);

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
      setHostByeModal(`호스트가 채팅방을 삭제했습니다.`);
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

      navigate('/main', { state: 'room' });
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  };

  const deleteModalOpenHandler = () => {
    setModalDelete(true);
    const param = { roomKey: parseInt(roomKey), userKey: parseInt(userKey) };
    socket.current.emit('showUsers', param);

    socket.current.on('receive', (data) => {
      setNowUsers([...data]);
    });
  };

  const deleteModalCloseHandler = () => {
    setModalDelete(false);
    setIsSelect(0);
  };

  const recommendHandler = () => {
    const param = {
      roomKey: parseInt(roomKey),
      userKey: parseInt(nowUsers[isSelect]?.userKey),
    };
    socket.current.emit('recommend', param);
    leaveRoomHandler();
  };

  return (
    <div>
      {modalExit && (
        <ModalExit
          leave={leaveRoomHandler}
          setter={() => setModalExit(false)}
        />
      )}

      {modalDelete && (
        <ModalDelete
          leave={leaveRoomHandler}
          setter={deleteModalCloseHandler}
          recommend={recommendHandler}
        >
          <StUserInfoWrap number={isSelect}>
            {nowUsers.slice(1).map((user, idx) => (
              <StUserInfo key={user.userKey} htmlFor={user.userKey}>
                <ProfileImg />
                <input
                  type="radio"
                  hidden
                  id={user.userKey}
                  checked={isSelect === idx + 1}
                  onChange={() => setIsSelect(idx + 1)}
                />
                <span>{user?.nickname}</span>
              </StUserInfo>
            ))}
          </StUserInfoWrap>
        </ModalDelete>
      )}

      {hostByeModal && (
        <ModalBasic setter={() => navigate('/main', { state: 'room' })}>
          {hostByeModal}
        </ModalBasic>
      )}

      <Header>
        <StHeaderIcon onClick={() => navigate('/main', { state: 'room' })}>
          <img src={IconBack} alt="IconBack" />
        </StHeaderIcon>

        <StHeaderInfo>
          <h1>{roomInfo.host}</h1>
          <span>{roomInfo.currentPeople}</span>
        </StHeaderInfo>

        {parseInt(userKey) === roomInfo?.userKey ? (
          <StHeaderIcon onClick={deleteModalOpenHandler}>
            <img src={IconDelete} alt="IconDelete" />
          </StHeaderIcon>
        ) : (
          <StHeaderIcon onClick={() => setModalExit(true)}>
            <img src={IconLogout} alt="IconLogout" />
          </StHeaderIcon>
        )}
      </Header>

      <StHeaderTitle>
        <StSpeakIcon>
          <img src={IconAnnounce} alt="IconAnnounce" />
        </StSpeakIcon>
        <span>{roomInfo.title}</span>
      </StHeaderTitle>

      <BodyPadding>
        <ChatBox chatState={chatState} userKey={userKey} />
      </BodyPadding>

      <FooterInput>
        <form onSubmit={sendMessageHandler}>
          <input ref={sendMessage} placeholder="메세지를 입력하세요" />
          <StSendIcon onClick={sendMessageHandler}>
            <img src={IconSend} alt="IconSend" />
          </StSendIcon>
        </form>
      </FooterInput>
    </div>
  );
};

export default ChatRoom;

const StHeaderIcon = styled.div`
  ${IconLarge};
`;

const StSpeakIcon = styled.div`
  ${IconSmall};

  img {
    width: 2rem;
  }
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
    color: ${({ theme }) => theme.sub3};
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
  background-color: ${({ theme }) => theme.bg};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

  span {
    ${fontMedium}
    ${fontBold}
  }
`;

const StSendIcon = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;

  ${IconLarge};
`;

const StUserInfoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  row-gap: 1.5rem;

  margin-top: 0.7rem;
  width: 28rem;

  span {
    color: ${({ theme }) => theme.sub2};
    margin-top: 0.2rem;
  }

  label:nth-child(${(props) => props.number}) {
    span {
      color: ${({ theme }) => theme.main2};
    }
  }
`;

const StUserInfo = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 8rem;

  span {
    ${fontMedium}
    line-height: 1.4rem;
  }
`;
