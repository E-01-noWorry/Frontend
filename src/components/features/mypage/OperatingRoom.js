import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSmall } from '../../../shared/themes/iconStyle';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { useInView } from 'react-intersection-observer';
import {
  fontBold,
  fontMedium,
  fontSmall,
  fontLarge,
} from '../../../shared/themes/textStyle';
import Header from '../../common/Header';
import instance from '../../../app/module/instance';
import styled from 'styled-components';
import BodyPadding from '../../common/BodyPadding';

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
      console.log(data);
      setMadeRoom((prev) => [...prev, ...data.data.result]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(madeRoom);
  useEffect(() => {
    getMadeRoom();
  }, [page]);

  return (
    <div>
      <Header>
        <HeaderContainer>
          <Aarow onClick={() => navigate('/mypage')}>&#8592;</Aarow>

          <LoginHeader>대화중인 고민 상담방</LoginHeader>
        </HeaderContainer>
      </Header>
      {madeRoom.length === 0 ? (
        <p style={{ fontSize: '100px' }}>상담방이 없습니다.</p>
      ) : (
        <BodyPadding>
          <StMainWrap>
            <StContentBoxWrap>
              {madeRoom?.map((room) => (
                <StContentBox
                  key={room.roomKey}
                  onClick={() => navigate(`/chatroom/${room.roomKey}`)}
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
                      작성자 <span ref={ref}>{room.host}</span>
                    </StInnerNickname>
                  </StContentFooter>
                </StContentBox>
              ))}
            </StContentBoxWrap>
          </StMainWrap>
        </BodyPadding>
      )}
    </div>
  );
};

export default OperatingRoom;

const HeaderContainer = styled.div`
  width: 100%;
`;

const Aarow = styled.div`
  color: #000;
  font-size: 3rem;
  position: relative;
`;

const LoginHeader = styled.p`
  text-align: center;
  display: inline;
  width: 100%;
  position: absolute;
  right: 0px;
  top: 2.2rem;
  ${fontLarge}
  z-index: -1;
`;

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
