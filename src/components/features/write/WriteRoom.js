import React from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../../app/module/instance';

const WriteRoom = () => {
  const navigate = useNavigate();

  const submitHandler = async () => {
    const payload = {
      title: '테스트중',
      hashTag: ['진로', '미래'],
      max: 3,
    };
    try {
      const { data } = await instance.post('/room', payload);
      navigate(`/chatroom/${data.result.roomKey}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate('/', { state: { page: 'room' } })}>
          뒤로 가기
        </button>
        <h1>채팅방 생성</h1>
      </div>

      <div>
        <h2>채팅방 이름</h2>
      </div>

      <div>
        <h2>채팅방 키워드</h2>
      </div>

      <div>
        <h2>채팅방 최대인원 (10명까지 가능합니다)</h2>
      </div>

      <div>
        <button onClick={submitHandler}>채팅방 생성</button>
      </div>
    </div>
  );
};

export default WriteRoom;
