import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../../../app/module/instance';
import { __getAllRoom } from '../../../app/module/roomSlice';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconSmall } from '../../../shared/themes/iconStyle';
import {
  fontBold,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';

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
    <>
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
                  {room.currentPeople}/{room.max}
                </span>
              </StInnerCurrent>

              <StInnerNickname>
                작성자 <span>{room.host}</span>
              </StInnerNickname>
            </StContentFooter>
          </StContentBox>
        ))}
      </StContentBoxWrap>
    </>
  );
};

export default MainRoom;

const StContentBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  margin-top: 1.2rem;
  margin-bottom: 8.4rem;
`;

const StContentBox = styled.div`
  ${borderBoxDefault};
  height: 100%;
  align-items: flex-start;
  padding: 1.6rem;

  background-color: #fff;

  &:hover,
  &:active {
    background-color: #d4d4d4;
  }
`;

const StInnerTitle = styled.div`
  ${fontBold};
  line-height: 2.1rem;

  height: 2.1rem;
  margin-top: 1rem;
`;

const StInnerKeywordWrap = styled.div`
  display: flex;
  gap: 0.6rem;

  margin-top: 0.4rem;
`;

const StContentFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
  ${fontSmall}
  line-height: 2rem;

  height: 2rem;
  padding: 0 0.5rem;
  border-radius: 1rem;

  background-color: #ececec;
`;

const StInnerCurrent = styled.div`
  ${fontMedium};
  line-height: 2.1rem;

  display: flex;
  gap: 0.25rem;
  height: 2.1rem;
`;

const StPeopleIcon = styled.div`
  ${IconSmall};
  background-color: green;
`;
