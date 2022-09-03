import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import instance from '../app/module/instance';

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
      console.log(error);
    }
  };

  useEffect(() => {
    getAllchat();
  }, []);

  console.log(chatState);

  // useEffect(() => {
  //   socket.current = io(process.env.REACT_APP_API);
  //   socket.current.emit('join-room', roomKey, userKey);
  //   return () => {
  //     socket.current.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //    socket.current.on('message', (message, roomKey, userKey, nickname) => {
  //    setChatState([...chatState, { chat: message, User: { nickname } }]);
  //   });

  //   socket.current.on('welcome', (nickname) => {
  //     setChatState([
  //       ...chatState,
  //       { chat: `${nickname}님이 입장했습니다`, system: 'system' },
  //     ]);
  //   });

  //   socket.current.on('bye', (nickname) => {
  //     setChatState([
  //       ...chatState,
  //       { chat: `${nickname}님이 나갔습니다`, system: 'system' },
  //     ]);
  //   });
  // }, [chatState]);

  const sendMessageHandler = (event) => {
    event.preventDefault();
    if (sendMessage.current.value.trim()) {
      // socket.current.emit(
      //   'chat_message',
      //   sendMessage.current.value,
      //   roomKey,
      //   userKey,
      // );
      sendMessage.current.value = '';
    }
  };

  const leaveRoomHandler = () => {
    // socket.current.emit('leave-room', roomKey, userKey);
    navigate('/', { state: 'room' });
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>뒤로 가기</button>
        <h1>{roomInfo.host}</h1>
        <span>{roomInfo.currentPeople}</span>
        {parseInt(userKey) === roomInfo?.userKey ? (
          <button>삭제</button>
        ) : (
          <button onClick={leaveRoomHandler}>나가기</button>
        )}
      </div>
      <div>
        <span>{roomInfo.title}</span>
      </div>
      <div>
        {chatState.map((chat, idx) => (
          <div key={idx}>
            <span>{chat.User.nickname}</span>
            <div>{chat.chat}</div>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={sendMessageHandler}>
          <input ref={sendMessage} placeholder="메세지를 입력하세요" />
          <button>전송버튼</button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
