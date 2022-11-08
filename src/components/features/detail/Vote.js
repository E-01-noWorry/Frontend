import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cleanUpVote, __getVoteResult, __postVote } from '../../../app/module/voteSlice';

import GlobalButton from '../../elements/GlobalButton';

import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { fontBold, fontExtra, fontExtraBold, fontMedium } from '../../../shared/themes/textStyle';

import styled, { css } from 'styled-components';

const Vote = ({ content, selectKey }) => {
  const dispatch = useDispatch();
  const voteResult = useSelector((state) => state.vote.voteResult);
  const msg = useSelector((state) => state.vote.msg); //msg의 값으로 UI를 구분합니다

  const [isSelect, setIsSelect] = useState(); //투표 선택을 관리하는 State

  useEffect(() => {
    dispatch(__getVoteResult(selectKey));

    return () => {
      dispatch(cleanUpVote());
    };
  }, [dispatch, selectKey, isSelect]);

  //투표 POST API
  const voteHandler = async () => {
    dispatch(__postVote({ selectKey, isSelect }));
    setIsSelect(0);
  };

  return (
    <>
      <StVoteWrap>
        {msg?.includes('조회 성공') || content.completion ? (
          //자기 자신의 게시물을 봤을때, 투표를 했을때, 마감 기한이 끝난 게시물을 누구나 확인할때
          <StVoteResultBox>
            {content.options?.map((option, idx) => (
              <StSelectResult bgImage={content.image[idx]} key={idx}>
                <div>{voteResult?.[idx + 1] || 0}%</div>
                <div>{option}</div>
              </StSelectResult>
            ))}
          </StVoteResultBox>
        ) : (
          //타인이 쓴 글에 아직 투표하지 않았을때, 비로그인 상태이고 마감기한이 끝나지 않았을때
          <StVoteBox isSelect={isSelect} image={content.image}>
            {content.options?.map((option, idx) => (
              <StSelectItem bgImage={content.image[idx]} key={idx} onClick={() => setIsSelect(idx + 1)}>
                <input
                  type="radio"
                  hidden
                  id={option}
                  checked={isSelect === idx + 1}
                  onChange={() => setIsSelect(idx + 1)}
                />
                <label htmlFor={option}>{option}</label>
                <GlobalButton
                  onClick={voteHandler}
                  h={'4.8rem'}
                  bgc={({ theme }) => theme.white}
                  font={({ theme }) => theme.black}
                  borderR={'1.5rem'}
                  fw={'bold'}
                >
                  클릭 후 투표
                </GlobalButton>
              </StSelectItem>
            ))}
          </StVoteBox>
        )}
      </StVoteWrap>
    </>
  );
};

export default Vote;

const StVoteWrap = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    padding: 0 2rem;
  }

  width: 100%;
  background-color: ${({ theme }) => theme.bg};
`;

const StVoteResultBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  height: 100%;
  padding: 2rem;
  margin: 2.4rem 0 4.8rem 0;
  background-color: ${({ theme }) => theme.sub5};

  border-radius: 2rem;
`;

const StSelectResult = styled.div`
  ${borderBoxDefault}
  gap: 0.8rem;

  height: 15rem;
  padding: 2.65rem 1.6rem;
  background-color: ${(props) => (props.bgImage ? props.theme.white : props.theme.main2)};
  color: ${({ theme }) => theme.white};

  //투표 결과 퍼센트
  div:nth-child(1) {
    ${fontExtra};
    ${fontExtraBold};
    line-height: 4.8rem;
  }

  //투표 선택지 이름
  div:nth-child(2) {
    ${fontMedium};
    line-height: 2.1rem;
  }

  ${(props) =>
    props.bgImage &&
    css`
      background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${(props) => props.bgImage});
      background-size: cover;
      background-position: center center;

      color: ${({ theme }) => theme.white};
      text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
    `}
`;

const StVoteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  padding: 2rem;
  margin: 2.4rem 0 4.8rem 0;
  background-color: ${({ theme }) => theme.sub5};

  border-radius: 2rem;

  //클릭한 선택지 CSS
  & > div:nth-child(${(props) => props.isSelect}) {
    display: flex;
    justify-content: space-between;

    background-color: ${({ theme }) => theme.main2};

    transition-duration: 0.3s;

    ${(props) =>
      props.image?.[0] &&
      css`
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(${(props) => props.image[props.isSelect - 1]});
        background-size: cover;
        background-position: center center;
      `}

    //클릭한 선택지의 이름
    label {
      color: ${({ theme }) => theme.white};
      line-height: 2.4rem;
    }

    //클릭 후 투표 버튼
    div {
      display: flex;
    }
  }
`;

const StSelectItem = styled.div`
  ${borderBoxDefault};
  height: 15rem;
  padding: 2.6rem 1.6rem;
  background-color: #fff;

  ${fontBold}

  cursor: pointer;

  //클릭 후 투표 버튼
  //안보이다가 onclick 발생시 위의 코드에서 block으로 바뀝니다
  div {
    display: none;
  }

  //이미지 선택지면 글씨 컬러 흰색, 그림자 효과
  ${(props) =>
    props.bgImage &&
    css`
      background-image: url(${(props) => props.bgImage});
      background-size: cover;
      background-position: center center;

      label {
        color: #fff;
        text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
      }
    `}
`;
