import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import instance from '../app/module/instance';

import ProfileImg from '../components/elements/ProfileImg';
import BodyPadding from '../components/common/BodyPadding';
import FooterInput from '../components/common/FooterInput';
import Header from '../components/common/Header';
import ChatBox from '../components/features/chat/ChatBox';
import {
  ModalBasic,
  ModalRecommend,
  ModalExit,
} from '../components/common/Modal';

import { IconLarge, IconSmall } from '../shared/themes/iconStyle';
import { fontBold, fontLarge, fontMedium } from '../shared/themes/textStyle';

import IconBack from '../static/icons/Variety=back, Status=untab, Size=L.svg';
import IconLogout from '../static/icons/Variety=logout, Status=untab, Size=L.svg';
import IconDelete from '../static/icons/Variety=delete, Status=untab, Size=L.svg';
import IconAnnounce from '../static/icons/Variety=announce, Status=untab, Size=M.svg';
import IconSend from '../static/icons/Variety=send, Status=untab, Size=L.svg';

import styled from 'styled-components';

import { io } from 'socket.io-client';

const ChatRoom = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { roomKey } = useParams();
  const userKey = localStorage.getItem('userKey');

  const socket = useRef();
  const sendMessage = useRef();

  const [hostByeModal, setHostByeModal] = useState('');
  const [modalExit, setModalExit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [isSelect, setIsSelect] = useState(0);
  const [roomInfo, setRoomInfo] = useState({});
  const [chatState, setChatState] = useState([]);
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
          User: { nickname: data.nickname, point: data.point },
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

  //채팅을 보냅니다
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

  //나가기 혹은 삭제 버튼을 눌렀을때 동작합니다
  const leaveRoomHandler = async () => {
    try {
      const param = { roomKey: parseInt(roomKey), userKey: parseInt(userKey) };
      socket.current.emit('leave-room', param);

      await instance.delete(`/room/${roomKey}`);

      if (state?.now === 'room') {
        navigate('/main', { state: { now: 'room' } });
      } else {
        navigate(-1);
      }
      document.body.style.overflow = 'unset';
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  };

  //호스트가 삭제 버튼을 눌렀을때 현재 채팅방에 남아있는 유저를 불러옵니다
  const deleteModalOpenHandler = () => {
    setModalDelete(true);
    document.body.style.overflow = 'hidden';
    const param = { roomKey: parseInt(roomKey), userKey: parseInt(userKey) };
    socket.current.emit('showUsers', param);

    socket.current.on('receive', (data) => {
      setNowUsers([...data]);
    });
  };

  //호스트가 삭제 버튼을 누른 후 뜬 모달을 껐을때 작동합니다
  const deleteModalCloseHandler = () => {
    setModalDelete(false);
    document.body.style.overflow = 'unset';
    setIsSelect(0);
  };

  //호스트가 삭제 버튼을 누른 후 뜬 모달에서 유저를 추천할때 동작합니다
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
          setter={() => {
            setModalExit(false);
            document.body.style.overflow = 'unset';
          }}
        />
      )}

      {modalDelete && (
        <ModalRecommend
          leave={leaveRoomHandler}
          setter={deleteModalCloseHandler}
          recommend={recommendHandler}
        >
          <StUserInfoWrap number={isSelect}>
            {nowUsers.slice(1).map((user, idx) => (
              <StUserInfo key={user.userKey} htmlFor={user.userKey}>
                <ProfileImg point={user.point} />
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
        </ModalRecommend>
      )}

      {hostByeModal && (
        <ModalBasic
          setter={() => navigate('/main', { state: { now: 'room' } })}
        >
          {hostByeModal}
        </ModalBasic>
      )}

      <Header>
        <StHeaderIcon
          onClick={() => {
            state?.now === 'room'
              ? navigate('/main', {
                  state: { now: 'room' },
                })
              : navigate(-1);
          }}
        >
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
          <StHeaderIcon
            onClick={() => {
              setModalExit(true);
              document.body.style.overflow = 'hidden';
            }}
          >
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
  justify-content: center;
  gap: 2rem;
  row-gap: 1.2rem;

  width: 28rem;
  min-height: 5.6rem;
  margin-top: 0.7rem;
  margin-bottom: 0.5rem;

  span {
    color: ${({ theme }) => theme.sub2};
    margin-top: 0.2rem;
  }

  //선택된 유저는 프로필에 메인컬러 보더가 생기고 닉네임이 메인 컬러로 변합니다
  label:nth-child(${(props) => props.number}) {
    div {
      border: 0.15rem solid ${({ theme }) => theme.main2};
    }

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
