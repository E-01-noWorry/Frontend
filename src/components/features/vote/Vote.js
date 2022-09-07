import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../../app/module/instance';
import { cleanUpVote, __getVoteResult } from '../../../app/module/voteSlice';
import styled, { css } from 'styled-components';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import {
  fontBold,
  fontExtra,
  fontExtraBold,
  fontMedium,
} from '../../../shared/themes/textStyle';
import { remainedTime } from '../../../shared/timeCalculation';

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
      console.log(error);
    }
  };

  return (
    <>
      {msg.includes('조회 성공') || remainedTime(content.deadLine) <= 0 ? (
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
              <button onClick={voteHandler}>클릭 후 투표</button>
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

  border-radius: 2rem;
  background-color: #ededed;
`;

const StSelectResult = styled.div`
  ${borderBoxDefault}
  padding: 2.65rem 1.6rem;
  justify-content: space-between;
  background-color: #d6d6d6;

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

  div:nth-child(1) {
    ${fontExtra};
    ${fontExtraBold};
    line-height: 4.8rem;
  }

  div:nth-child(2) {
    ${fontMedium};
    line-height: 2.1rem;
  }
`;

const StVoteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
  padding: 2rem;

  margin: 2.4rem 0 4.8rem 0;

  border-radius: 2rem;
  background-color: #ededed;

  div:nth-child(${(props) => props.isSelect}) {
    color: #fff;

    display: flex;
    justify-content: space-between;

    transition-duration: 0.3s;
    background-color: #595959;

    ${(props) =>
      props.image &&
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

    label {
      line-height: 2.4rem;
    }

    button {
      display: block;
      width: 100%;
      height: 4.8rem;
      background-color: #fff;

      font-size: 1.6rem;
      ${fontBold};

      border: none;
      border-radius: 1.5rem;
    }
  }
`;

const StSelectItem = styled.div`
  ${borderBoxDefault}
  padding: 1.6rem;

  ${fontBold}

  ${(props) =>
    props.bgImage &&
    css`
      color: #fff;
      text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
    `}

  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center center;
  background-color: #fff;

  button {
    display: none;
  }
`;
