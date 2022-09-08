import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GlobalButton from '../../elements/GlobalButton';

import instance from '../../../app/module/instance';
import { cleanUpVote, __getVoteResult } from '../../../app/module/voteSlice';

import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import {
  fontBold,
  fontExtra,
  fontExtraBold,
  fontMedium,
} from '../../../shared/themes/textStyle';
import { remainedTime } from '../../../shared/timeCalculation';

import styled, { css } from 'styled-components';

const Vote = ({ content, selectKey }) => {
  const dispatch = useDispatch();
  const voteResult = useSelector((state) => state.vote.voteResult);
  const msg = useSelector((state) => state.vote.msg);

  //투표 선택을 관리하는 State
  const [isSelect, setIsSelect] = useState();

  useEffect(() => {
    dispatch(__getVoteResult(selectKey));

    return () => {
      dispatch(cleanUpVote());
    };
  }, [dispatch, selectKey, isSelect]);

  //투표 POST API
  const voteHandler = async () => {
    try {
      await instance.post(`/select/vote/${selectKey}`, { choice: isSelect });
      setIsSelect(0);
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  };

  return (
    <>
      {msg.includes('조회 성공') || content.completion ? (
        <StVoteResultBox>
          {content.options?.map((option, idx) => (
            <StSelectResult bgImage={content.image[idx]} key={idx}>
              <div>{voteResult?.[idx + 1] || 0}%</div>
              <div>{option}</div>
            </StSelectResult>
          ))}
        </StVoteResultBox>
      ) : (
        <StVoteBox isSelect={isSelect} image={content.image}>
          {content.options?.map((option, idx) => (
            <StSelectItem
              bgImage={content.image[idx]}
              key={idx}
              onClick={() => setIsSelect(idx + 1)}
            >
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
                bgc={'#fff'}
                color={'#000'}
                borderR={'1.5rem'}
                fw={'bold'}
              >
                클릭 후 투표
              </GlobalButton>
            </StSelectItem>
          ))}
        </StVoteBox>
      )}
    </>
  );
};

export default Vote;

const StVoteResultBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  height: 100%;
  padding: 2rem;
  margin: 2.4rem 0 4.8rem 0;
  background-color: #ededed;

  border-radius: 2rem;
`;

const StSelectResult = styled.div`
  ${borderBoxDefault}
  justify-content: space-between;

  padding: 2.65rem 1.6rem;
  background-color: #d6d6d6;

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
      background-image: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)
        ),
        url(${(props) => props.bgImage});
      background-size: cover;
      background-position: center center;

      color: #fff;
      text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
    `}
`;

const StVoteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  height: 100%;
  padding: 2rem;
  margin: 2.4rem 0 4.8rem 0;
  background-color: #ededed;

  border-radius: 2rem;

  //클릭한 선택지 CSS
  & > div:nth-child(${(props) => props.isSelect}) {
    display: flex;
    justify-content: space-between;

    background-color: #595959;

    transition-duration: 0.3s;

    ${(props) =>
      props.image?.[0] &&
      css`
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),
          url(${(props) => props.image[props.isSelect - 1]});
        background-size: cover;
        background-position: center center;
      `}

    //클릭한 선택지의 이름
    label {
      color: #fff;
      line-height: 2.4rem;
    }

    //클릭 후 투표 버튼
    div {
      display: flex;
    }
  }
`;

const StSelectItem = styled.div`
  ${borderBoxDefault}
  padding: 1.6rem;

  background-color: #fff;

  ${fontBold}

  //클릭 후 투표 버튼
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
