import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import instance from '../../../app/module/instance';
import { __getAllRoom } from '../../../app/module/roomSlice';

import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconSmall } from '../../../shared/themes/iconStyle';
import {
  fontBold,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';

import styled from 'styled-components';

const MainRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state) => state.room.rooms);

  const [modal, setModal] = useState('');

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
      setModal(error.response.data.errMsg);
      console.log(error.response.data.errMsg);
    }
  };

  return (
    <StMainWrap>
      <StContentBoxWrap>
        {rooms?.map((room) => (
          <StContentBox
            key={room.roomKey}
            onClick={() => joinRoomHandler(room.roomKey)}
          >
            <StInnerTitle>{room.title}</StInnerTitle>

            <StInnerKeywordWrap>
              {room.hashTag?.map((item) => (
                <StInnerKeyword key={item}>#{item} </StInnerKeyword>
              ))}
            </StInnerKeywordWrap>

            <StContentFooter>
              <StInnerCurrent>
                <StPeopleIcon></StPeopleIcon>
                <span>
                  {room.currentPeople}/{room.max}명
                </span>
              </StInnerCurrent>

              <StInnerNickname>
                작성자 <span>{room.host}</span>
              </StInnerNickname>
            </StContentFooter>
          </StContentBox>
        ))}
      </StContentBoxWrap>
    </StMainWrap>
  );
};

export default MainRoom;

const StMainWrap = styled.div`
  margin-top: 8.5rem;
  margin-bottom: 8.4rem;
`;

const StContentBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const StContentBox = styled.div`
  ${borderBoxDefault};
  align-items: flex-start;

  height: 100%;
  padding: 1.6rem;
  background-color: #fff;

  &:hover,
  &:active {
    background-color: #d4d4d4;
  }
`;

const StInnerTitle = styled.div`
  margin-top: 1rem;

  ${fontBold};
  line-height: 2.1rem;
`;

const StInnerKeywordWrap = styled.div`
  display: flex;
  gap: 0.6rem;

  margin-top: 0.8rem;
`;

const StContentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 3.2rem;
`;

const StInnerNickname = styled.div`
  ${fontSmall};
  line-height: 2rem;

  span {
    ${fontBold};
  }
`;

const StInnerKeyword = styled.span`
  height: 100%;
  padding: 0 0.5rem;
  background-color: #ececec;

  border-radius: 1rem;

  ${fontSmall}
  line-height: 2rem;
`;

const StInnerCurrent = styled.div`
  display: flex;
  gap: 0.25rem;

  ${fontMedium};
  line-height: 2.1rem;
`;

const StPeopleIcon = styled.div`
  ${IconSmall};
  background-color: green;
`;
