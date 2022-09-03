import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import instance from '../../../app/module/instance';
import { __getAllRoom } from '../../../app/module/roomSlice';

const MainRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state) => state.room.rooms);

  const getAllRoom = useCallback(() => {
    dispatch(__getAllRoom());
  }, [dispatch]);

  useEffect(() => {
    getAllRoom();
  }, [getAllRoom]);

  //고민 채팅방 입장 POST API
  const joinRoomHandler = async (roomKey) => {
    try {
      await instance.post(`/room/${roomKey}`);
      navigate(`/chatroom/${roomKey}`);
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  };

  return (
    <div>
      {rooms?.map((room) => (
        <div key={room.roomKey} onClick={() => joinRoomHandler(room.roomKey)}>
          <h1>{room.title}</h1>
          <span>{room.host}</span>
          <div>
            {room.hashTag?.map((item) => (
              <span key={item}>#{item} </span>
            ))}
          </div>
          <div>
            {room.currentPeople} / {room.max} 명
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainRoom;
