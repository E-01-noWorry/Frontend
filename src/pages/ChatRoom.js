import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import instance from '../app/module/instance';

import ProfileImg from '../components/elements/ProfileImg';
import FooterInput from '../components/common/FooterInput';
import Header from '../components/common/Header';
import ChatBox from '../components/features/chat/ChatBox';
import {
  ModalBasic,
  ModalRecommend,
  ModalExit,
  ModalKick,
} from '../components/common/Modal';

import { IconLarge, IconSmall } from '../shared/themes/iconStyle';
import {
  fontBold,
  fontExtraBold,
  fontExtraSmall,
  fontLarge,
  fontMedium,
  fontSmall,
} from '../shared/themes/textStyle';

import IconBack from '../static/icons/Variety=back, Status=untab, Size=L.svg';
import IconLogout from '../static/icons/Variety=logout, Status=untab, Size=L.svg';
import IconDelete from '../static/icons/Variety=delete, Status=untab, Size=L.svg';
import IconAnnounce from '../static/icons/Variety=announce, Status=untab, Size=M.svg';
import IconSend from '../static/icons/Variety=send, Status=untab, Size=L.svg';
import IconClose from '../static/icons/Variety=close, Status=untab, Size=L.svg';
import IconDrawer from '../static/icons/Variety=drawer, Status=untab, Size=L.svg';

import styled, { css } from 'styled-components';

import { io } from 'socket.io-client';

const ChatRoom = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { roomKey } = useParams();
  const userKey = Number(localStorage.getItem('userKey'));

  const socket = useRef();
  const sendMessage = useRef();

  const [kickByeModal, setKickByeModal] = useState({ key: null, msg: '' });
  const [hostByeModal, setHostByeModal] = useState('');
  const [modalExit, setModalExit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalKick, setModalKick] = useState(false);

  const [mainModal, setMainModal] = useState(false);

  const [isSelect, setIsSelect] = useState(0);
  const [roomInfo, setRoomInfo] = useState({});
  const [chatState, setChatState] = useState([]);
  const [nowUsers, setNowUsers] = useState([]);
  const [kickUser, setKickUser] = useState({ key: null, nickname: '' });

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

    socket.current.on('expulsion', (data) => {
      if (data.userKey === userKey) {
        setChatState([]);
        setKickByeModal({
          ...kickByeModal,
          key: data.userKey,
          msg: `${data.nickname}님이 강퇴되었습니다.`,
        });
      } else {
        setChatState([
          ...chatState,
          {
            chat: `${data.nickname}님이 강퇴되었습니다.`,
            userKey: 12,
            User: { nickname: 'admin99' },
          },
        ]);
      }
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

  const mainModalOpenHandler = () => {
    setMainModal(true);
    document.body.style.overflow = 'hidden';

    const param = { roomKey: parseInt(roomKey), userKey: parseInt(userKey) };
    socket.current.emit('showUsers', param);
    socket.current.on('receive', (data) => {
      setNowUsers([...data]);
    });
  };

  //나가기 혹은 삭제 버튼을 눌렀을때 동작합니다
  const leaveRoomHandler = async () => {
    try {
      const param = { roomKey: parseInt(roomKey), userKey: parseInt(userKey) };
      socket.current.emit('leave-room', param);

      await instance.delete(`/room/${roomKey}`);

      if (state?.now === 'room' || state?.now === false) {
        navigate('/main', { state: { now: 'room' } });
      } else {
        navigate(-1);
      }
      document.body.style.overflow = 'overlay';
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  };

  //호스트가 삭제 버튼을 눌렀을때 현재 채팅방에 남아있는 유저를 불러옵니다
  const deleteModalOpenHandler = () => {
    setModalDelete(true);
    setMainModal(false);
    document.body.style.overflow = 'hidden';
    const param = { roomKey: parseInt(roomKey), userKey: parseInt(userKey) };
    socket.current.emit('showUsers', param);

    socket.current.on('receive', (data) => {
      setNowUsers([...data]);
    });
  };

  //호스트가 삭제 버튼을 누른 후 뜬 모달을 껐을때 작동합니다
  const deleteModalCloseHandler = () => {
    setIsSelect(0);
    mainModalOpenHandler();
    setModalDelete(false);
    document.body.style.overflow = 'overlay';
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

  const kickUserHandler = () => {
    const param = {
      roomKey: Number(roomKey),
      userKey: Number(kickUser.key),
    };
    socket.current.emit('expulsion', param);
    setModalKick(false);
    setKickUser({ key: null, nickname: '' });
    document.body.style.overflow = 'overlay';
  };

  return (
    <div>
      {modalKick && (
        <ModalKick
          kick={kickUserHandler}
          nickname={kickUser.nickname}
          setter={() => {
            mainModalOpenHandler();
            setModalKick(false);
            setKickUser({ key: null, nickname: '' });
          }}
        />
      )}

      {mainModal && (
        <StModalBg>
          <StMainModal>
            <StHeader>
              <StIcon
                onClick={() => {
                  setMainModal(false);
                  document.body.style.overflow = 'overlay';
                }}
              >
                <img src={IconClose} alt="IconClose" />
              </StIcon>
            </StHeader>

            <StInfo>
              <div>[익명] {roomInfo.title}</div>
              <div>{roomInfo.currentPeople}명 참여중</div>
            </StInfo>

            <StPeopleInfo>
              <div>상담 참여자</div>
              {nowUsers.map((user) => (
                <StPersonInfo key={user.userKey}>
                  <ProfileImg point={user.point} />
                  {user.userKey === Number(userKey) && (
                    <StMeBadge>나</StMeBadge>
                  )}
                  <StPersonNickname isMe={user.userKey === Number(userKey)}>
                    {user.nickname}
                  </StPersonNickname>
                  {roomInfo?.userKey === Number(userKey) &&
                    user.userKey !== Number(userKey) && (
                      <StKickBadge
                        onClick={() => {
                          setModalKick(true);
                          setMainModal(false);
                          setKickUser({
                            ...kickUser,
                            key: user.userKey,
                            nickname: user.nickname,
                          });
                        }}
                      >
                        내보내기
                      </StKickBadge>
                    )}
                </StPersonInfo>
              ))}
            </StPeopleInfo>

            <StFooter>
              {Number(userKey) === roomInfo?.userKey ? (
                <div onClick={deleteModalOpenHandler}>
                  <StIcon>
                    <img src={IconDelete} alt="IconDelete" />
                  </StIcon>
                  <span>상담방 삭제하기</span>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setModalExit(true);
                    setMainModal(false);
                    document.body.style.overflow = 'hidden';
                  }}
                >
                  <StIcon>
                    <img src={IconLogout} alt="IconLogout" />
                  </StIcon>
                  <span>상담방 나가기</span>
                </div>
              )}
            </StFooter>
          </StMainModal>
        </StModalBg>
      )}

      {modalExit && (
        <ModalExit
          leave={leaveRoomHandler}
          setter={() => {
            mainModalOpenHandler();
            setModalExit(false);
            document.body.style.overflow = 'overlay';
          }}
        />
      )}

      {modalDelete && (
        <ModalRecommend
          leave={leaveRoomHandler}
          setter={deleteModalCloseHandler}
          recommend={recommendHandler}
          user={nowUsers.length}
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

      {kickByeModal.key === userKey && (
        <ModalBasic
          setter={() => navigate('/main', { state: { now: 'room' } })}
        >
          {kickByeModal.msg}
        </ModalBasic>
      )}

      <Header>
        <StIcon
          onClick={() => {
            state?.now === 'room' || state?.now === false
              ? navigate('/main', {
                  state: { now: 'room' },
                })
              : navigate(-1);
          }}
        >
          <img src={IconBack} alt="IconBack" />
        </StIcon>

        <StHeaderInfo>
          <h1>{roomInfo.host}</h1>
          <span>{roomInfo.currentPeople}</span>
        </StHeaderInfo>

        <StIcon onClick={mainModalOpenHandler}>
          <img src={IconDrawer} alt="IconDrawer" />
        </StIcon>
      </Header>

      <StHeaderTitle>
        <StSpeakIcon>
          <img src={IconAnnounce} alt="IconAnnounce" />
        </StSpeakIcon>
        <span>{roomInfo.title}</span>
      </StHeaderTitle>

      <ChatBox chatState={chatState} userKey={userKey} />

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

const StModalBg = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
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
`;

const StMainModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 30rem;
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${({ theme }) => theme.bg};

  z-index: 100;
`;

const StHeader = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  height: 6.4rem;
  width: 30rem;
  padding: 0 2rem;
`;

const StInfo = styled.div`
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
`;

const StPeopleInfo = styled.div`
  padding: 2rem;

  & > div:nth-child(1) {
    ${fontMedium};
    ${fontBold};
    line-height: 2.1rem;

    margin-bottom: 0.8rem;
  }
`;

const StPersonInfo = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 1rem;

  height: 5.6rem;
`;

const StPersonNickname = styled.div`
  ${fontMedium}
  ${(props) =>
    props.isMe &&
    css`
      ${fontBold}
    `}
`;

const StMeBadge = styled.div`
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
`;

const StKickBadge = styled.div`
  position: absolute;
  right: 0;

  padding: 0.5rem 0.8rem;
  background-color: ${({ theme }) => theme.black};

  border-radius: 1.4rem;

  ${fontExtraSmall};
  line-height: 1.8rem;
  color: ${({ theme }) => theme.white};
`;

const StFooter = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: center;

  width: 100%;
  height: 6.4rem;
  padding: 0 2rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  span {
    ${fontMedium};

    cursor: pointer;
  }
`;

const StIcon = styled.div`
  ${IconLarge};

  cursor: pointer;
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
  @media ${({ theme }) => theme.device.PC} {
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
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

  cursor: pointer;
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
