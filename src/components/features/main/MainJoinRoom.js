import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../common/Header';
import GlobalButton from '../../elements/GlobalButton';
import ProfileImg from '../../elements/ProfileImg';

import { IconLarge } from '../../../shared/themes/iconStyle';

import IconCloseWhite from '../../../static/icons/Variety=close white, Status=untab, Size=L.svg';

import styled from 'styled-components';
import {
  fontBold,
  fontExtraBold,
  fontLarge,
  fontMedium,
} from '../../../shared/themes/textStyle';

const MainJoinRoom = ({ setJoinModal, roomInfo, enteredRoom }) => {
  const navigate = useNavigate();

  return (
    <StJoinBg>
      <Header style={{ backgroundColor: 'transparent' }}>
        <StIcon
          onClick={() => {
            setJoinModal(false);
            document.body.style.overflow = 'overlay';
          }}
        >
          <img src={IconCloseWhite} alt="IconCloseWhite" />
        </StIcon>
      </Header>
      <StRoomInfo>
        <StSubtitle>고민상담방</StSubtitle>
        <StTitle>{roomInfo.title}</StTitle>
        <StHashTag>
          {roomInfo.hashTag?.map((item) => (
            <div key={item}>#{item}</div>
          ))}
        </StHashTag>
        <StFooter>
          <ProfileImg point={roomInfo.point} />
          <StInfo>
            <div>{roomInfo.host}</div>
            <div>
              참여자 {roomInfo.currentPeople}/{roomInfo.max} 명
            </div>
          </StInfo>
        </StFooter>
      </StRoomInfo>
      <StGlobalButton
        onClick={() => {
          navigate(`/chatroom/${roomInfo.roomKey}`, { state: { now: 'room' } });
          document.body.style.overflow = 'overlay';
        }}
      >
        {enteredRoom.includes(roomInfo.roomKey)
          ? '참여중인 상담방'
          : '상담방 참여하기'}
      </StGlobalButton>
    </StJoinBg>
  );
};

export default MainJoinRoom;

const StJoinBg = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
  }

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #575553;

  border-left: 2rem solid transparent;
  border-right: 2rem solid transparent;

  z-index: 99;
`;

const StIcon = styled.div`
  ${IconLarge};
`;

const StRoomInfo = styled.div`
  position: absolute;
  bottom: 13.6rem;

  width: 100%;

  color: ${({ theme }) => theme.white};
  ${fontMedium};
`;

const StSubtitle = styled.div`
  line-height: 2.1rem;
`;

const StTitle = styled.div`
  ${fontLarge};
  ${fontExtraBold};
  line-height: 3rem;
`;

const StHashTag = styled.div`
  display: flex;
  gap: 0.8rem;

  margin-top: 1.6rem;

  ${fontBold};
  line-height: 2.1rem;
`;

const StInfo = styled.div`
  line-height: 2.1rem;
`;

const StFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  margin-top: 4rem;
`;

const StGlobalButton = styled(GlobalButton)`
  position: absolute;
  bottom: 2.4rem;
`;
