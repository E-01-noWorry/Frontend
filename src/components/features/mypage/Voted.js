import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconSmall } from '../../../shared/themes/iconStyle';
import {
  fontBold,
  fontMedium,
  fontSmall,
  fontLarge,
} from '../../../shared/themes/textStyle';
import { remainedTime } from '../../../shared/timeCalculation';
import BodyPadding from '../../common/BodyPadding';
import Header from '../../common/Header';
import instance from '../../../app/module/instance';

const Voted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postVoted, setPostVoted] = useState([]);
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
  const getPostVoted = async () => {
    try {
      const data = await instance.get(`my/vote?page=${page}`);
      setPostVoted((prev) => [...prev, ...data.data.result]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostVoted();
  }, [page]);

  return (
    <>
      <Header>
        <HeaderContainer>
          <Aarow onClick={() => navigate('/mypage')}>&#8592;</Aarow>

          <LoginHeader>내가 투표한 고민 투표</LoginHeader>
        </HeaderContainer>
      </Header>
      {postVoted.length === 0 ? (
        <p style={{ fontSize: '100px' }}>투표가 없습니다.</p>
      ) : (
        <BodyPadding>
          <StContentBoxWrap>
            {postVoted?.map((content, idx) => (
              <StContentBox
                key={content.selectKey}
                onClick={() => navigate(`/detail/${content.selectKey}`)}
                //마지막 게시글에 ref를 달아준다
              >
                <StContentHeader>
                  <StInnerCategory>{content.category}</StInnerCategory>
                  <StInnerNickname>
                    작성자 <span>{content.nickname}</span>
                  </StInnerNickname>
                </StContentHeader>

                <StInnerTitle>{content.title}</StInnerTitle>

                <StInnerOption>{content.options?.join(' vs ')}</StInnerOption>

                <StContentFooter>
                  <StInnerCurrent>
                    <StIcon></StIcon>
                    <span>{content.total || 0}</span>
                  </StInnerCurrent>
                  <StInnerTime>
                    <span>{content.completion ? '투표마감' : '남은시간'}</span>
                    <span ref={ref}>{remainedTime(content.deadLine)}</span>
                  </StInnerTime>
                </StContentFooter>
              </StContentBox>
            ))}
          </StContentBoxWrap>
        </BodyPadding>
      )}
    </>
  );
};
export default Voted;

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

const StContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
`;

const StContentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 3.2rem;
`;

const StInnerCategory = styled.div`
  height: 2rem;
  padding: 0 0.5rem;
  background-color: #ececec;

  border-radius: 1rem;

  ${fontSmall}
  line-height: 1.95rem;
`;

const StInnerCurrent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${fontSmall}
  line-height: 2rem;
`;

const StIcon = styled.div`
  ${IconSmall};
  background-color: green;
`;

const StInnerTitle = styled.div`
  margin-top: 1rem;

  ${fontBold};
  line-height: 2.1rem;
`;

const StInnerOption = styled.div`
  margin-top: 0.6rem;

  ${fontMedium}
  line-height: 1.8rem;
`;

const StInnerNickname = styled.div`
  ${fontSmall};
  line-height: 2rem;

  span {
    ${fontBold};
  }
`;

const StInnerTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${fontSmall};
`;
