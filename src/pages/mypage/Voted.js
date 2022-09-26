import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyPadding from '../../components/common/BodyPadding';
import Header from '../../components/common/Header';
import instance from '../../app/module/instance';

import { useInView } from 'react-intersection-observer';

import { remainedTime } from '../../shared/timeCalculation';

import { borderBoxDefault } from '../../shared/themes/boxStyle';
import { IconLarge, IconSmall } from '../../shared/themes/iconStyle';
import {
  fontBold,
  fontMedium,
  fontSmall,
  fontLarge,
} from '../../shared/themes/textStyle';

import IconBack from '../../static/icons/Variety=back, Status=untab, Size=L.svg';
import IconPeople from '../../static/icons/Variety=people, Status=untab, Size=S.svg';
import IconLeftTime from '../../static/icons/Variety=Left Time, Status=untab, Size=S.svg';
import IconTimeOver from '../../static/icons/Variety=Timeover, Status=Untab, Size=S.svg';

import styled, { css } from 'styled-components';

const Voted = () => {
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
      <StHeader length={postVoted.length}>
        <StHeaderIcon
          onClick={() => navigate('/mypage', { state: { now: 'mypage' } })}
        >
          <img src={IconBack} alt="IconBack" />
        </StHeaderIcon>
        <StHeaderTitle>내가 투표한 고민 투표</StHeaderTitle>
        <StHeaderIcon />
      </StHeader>

      <BodyPadding>
        <StContentBoxWrap>
          {postVoted.length === 0 && (
            <StNoneContents>투표가 없습니다.</StNoneContents>
          )}
          {postVoted?.map((content, idx) => (
            <StContentBox
              key={content.selectKey}
              onClick={() =>
                navigate(`/detail/${content.selectKey}`, {
                  state: { now: 'mypage' },
                })
              }
              //마지막 게시글에 ref를 달아줍니다
              ref={idx === postVoted.length - 1 ? ref : null}
              completion={content.completion}
            >
              <StContentHeader>
                <StInnerCategory completion={content.completion}>
                  {content.category}
                </StInnerCategory>
                <StInnerNickname>
                  작성자 <span>{content.nickname}</span>
                </StInnerNickname>
              </StContentHeader>

              <StInnerTitle completion={content.completion}>
                {content.title}
              </StInnerTitle>

              <StInnerOption completion={content.completion}>
                {content.options?.join(' vs ')}
              </StInnerOption>

              <StContentFooter>
                <StInnerTime>
                  {content.completion ? (
                    <StIcon>
                      <img src={IconTimeOver} alt="IconTimeOver" />
                    </StIcon>
                  ) : (
                    <>
                      <StIcon>
                        <img src={IconLeftTime} alt="IconLeftTime" />
                      </StIcon>
                      <span>{remainedTime(content.deadLine)}</span>
                    </>
                  )}
                  <span>{content.completion ? '투표마감' : '남음'}</span>
                </StInnerTime>
                <StInnerCurrent>
                  <StIcon>
                    <img src={IconPeople} alt="IconPeople" />
                  </StIcon>
                  <span>{content.total || 0}</span>
                </StInnerCurrent>
              </StContentFooter>
            </StContentBox>
          ))}
        </StContentBoxWrap>
      </BodyPadding>
    </>
  );
};
export default Voted;

const StHeader = styled(Header)`
  ${(props) =>
    !props.length &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.sub4};
    `}
`;

const StNoneContents = styled.div`
  width: 100%;
  margin-top: 4rem;

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
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    margin-top: 6.4rem;
    padding: 0 2rem 2rem 2rem;
    min-height: calc(100% - 6.4rem);
  }

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  margin-top: 6.4rem;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.bg};
`;

const StContentBox = styled.div`
  position: relative;

  ${borderBoxDefault};
  align-items: flex-start;
  justify-content: flex-start;

  height: 13.9rem;
  padding: 1.6rem;
  background-color: ${(props) =>
    props.completion ? props.theme.sub4 : props.theme.white};
`;

const StContentHeader = styled.div`
  position: absolute;
  top: 1.6rem;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
`;

const StInnerCategory = styled.div`
  padding: 0 0.6rem;
  background-color: ${(props) =>
    props.completion ? props.theme.main4 : props.theme.main2};

  border-radius: 1rem;

  ${fontSmall}
  line-height: 2rem;
  color: ${({ theme }) => theme.white};
`;

const StInnerNickname = styled.div`
  ${fontSmall};
  line-height: 2rem;
  color: ${({ theme }) => theme.sub2};

  span {
    ${fontBold};
  }
`;

const StInnerTitle = styled.div`
  width: 100%;
  margin-top: 2.6rem;

  ${fontBold};
  line-height: 2.1rem;
  color: ${(props) =>
    props.completion ? props.theme.sub2 : props.theme.black};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StInnerOption = styled.div`
  width: 100%;
  margin-top: 0.4rem;

  ${fontMedium}
  line-height: 1.8rem;
  color: ${({ theme }) => theme.sub2};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StContentFooter = styled.div`
  position: absolute;
  bottom: 1.6rem;

  display: flex;
  align-items: center;

  width: 100%;
`;

const StIcon = styled.div`
  ${IconSmall};
`;

const StInnerTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${fontSmall};
  color: ${({ theme }) => theme.sub2};
`;

const StInnerCurrent = styled.div`
  position: absolute;
  right: 3.6rem;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${fontSmall}
  line-height: 2rem;
  color: ${({ theme }) => theme.sub2};
`;
