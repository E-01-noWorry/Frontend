import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import instance from '../../../app/module/instance';

import Header from '../../common/Header';
import BodyPadding from '../../common/BodyPadding';

import {
  fontBold,
  fontMedium,
  fontSmall,
  fontLarge,
} from '../../../shared/themes/textStyle';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconLarge, IconSmall } from '../../../shared/themes/iconStyle';

import { useInView } from 'react-intersection-observer';

import IconPerson from '../../../static/icons/Variety=person, Status=untab.svg';
import IconBack from '../../../static/icons/Variety=back, Status=untab.svg';

import styled, { css } from 'styled-components';

const OperatingRoom = () => {
  const navigate = useNavigate();

  const [madeRoom, setMadeRoom] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니면서 빈배열이 아닌경우
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  // 데이터 불러오기
  const getMadeRoom = async () => {
    try {
      const data = await instance.get(`my/enter?page=${page}`);
      setMadeRoom((prev) => [...prev, ...data.data.result]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMadeRoom();
  }, [page]);

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
      <StHeader length={madeRoom.length}>
        <StHeaderIcon onClick={() => navigate('/mypage', { state: 'mypage' })}>
          <img src={IconBack} alt="IconBack" />
        </StHeaderIcon>
        <StHeaderTitle>대화중인 고민 상담방</StHeaderTitle>
        <StHeaderIcon />
      </StHeader>

      {madeRoom.length === 0 ? (
        <StNoneContents>상담방이 없습니다.</StNoneContents>
      ) : (
        <BodyPadding>
          <StContentBoxWrap>
            {madeRoom?.map((room, idx) => (
              <StContentBox
                key={room.roomKey}
                onClick={() => joinRoomHandler(room.roomKey)}
                //마지막 게시글에 ref를 달아줍니다
                ref={idx === madeRoom.length - 1 ? ref : null}
              >
                <StInnerTitle>{room.title}</StInnerTitle>

                <StInnerKeywordWrap>
                  {room.hashTag?.map((item) => (
                    <StInnerKeyword key={item}>#{item} </StInnerKeyword>
                  ))}
                </StInnerKeywordWrap>

                <StContentFooter>
                  <StInnerCurrent>
                    <StPeopleIcon>
                      <img src={IconPerson} alt="IconPerson" />
                    </StPeopleIcon>
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
        </BodyPadding>
      )}
    </div>
  );
};

export default OperatingRoom;

const StHeader = styled(Header)`
  ${(props) =>
    !props.length &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.sub4};
    `}
`;

const StNoneContents = styled.div`
  width: 100%;
  margin-top: 10.4rem;

  ${fontMedium}
  text-align: center;
`;

const StHeaderIcon = styled.div`
  ${IconLarge};
`;

const StHeaderTitle = styled.div`
  ${fontLarge};
`;

const StContentBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  margin-top: 7.4rem;
  margin-bottom: 9.6rem;
`;

const StContentBox = styled.div`
  ${borderBoxDefault};
  align-items: flex-start;

  height: 100%;
  padding: 1.6rem;
  background-color: ${({ theme }) => theme.white};
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
  color: ${({ theme }) => theme.sub2};

  span {
    ${fontBold};
  }
`;

const StInnerKeyword = styled.span`
  height: 100%;
  padding: 0 0.5rem;
  background-color: ${({ theme }) => theme.sub4};

  border-radius: 1rem;

  ${fontSmall}
  line-height: 2rem;
  color: ${({ theme }) => theme.sub2};
`;

const StInnerCurrent = styled.div`
  display: flex;
  gap: 0.25rem;

  ${fontMedium};
  line-height: 2.1rem;
  color: ${({ theme }) => theme.main2};
`;

const StPeopleIcon = styled.div`
  ${IconSmall};
`;
