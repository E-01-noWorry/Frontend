import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  cleanUpVote,
  __getVoteResult,
  __postVote,
} from '../../../app/module/voteSlice';
import { useNavigate } from 'react-router-dom';

const Vote = ({ content, selectKey, userKey }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const voteResult = useSelector((state) => state.vote.voteResult);
  const msg = useSelector((state) => state.vote.msg);
  const error = useSelector((state) => state.vote.error);
  const [isSelect, setIsSelect] = useState();

  useEffect(() => {
    dispatch(__getVoteResult(selectKey));

    return () => {
      dispatch(cleanUpVote());
    };
  }, [dispatch, selectKey]);

  const voteHandler = () => {
    dispatch(__postVote({ isSelect, selectKey }));
  };

  return (
    <>
      <StVoteResultBox>
        <div>{voteResult.total} 명이 투표에 참여했습니다!</div>
        {msg.includes('조회 성공') ? (
          <div>
            <div>투표한 번호: {voteResult?.isVote}</div>
            <div>1번: {voteResult?.[1]} %</div>
            <div>2번: {voteResult?.[2]} %</div>
            <div>3번: {voteResult?.[3]} %</div>
            <div>4번: {voteResult?.[4]} %</div>
          </div>
        ) : null}

        <div>
          {userKey ? (
            <span>투표에 참여해 주세요</span>
          ) : (
            <span>
              <StLoginPortal onClick={() => navigate('/login')}>
                로그인
              </StLoginPortal>
              하고 투표에 참여해 보세요
            </span>
          )}
        </div>
      </StVoteResultBox>

      {msg.includes('하지 않음') ? (
        <StVoteBox isSelect={isSelect}>
          {content.options?.map((option, idx) => (
            <StSelectItem key={option} onClick={() => setIsSelect(idx + 1)}>
              <input
                type="radio"
                hidden
                id={option}
                checked={isSelect === idx + 1}
                onChange={() => setIsSelect(idx + 1)}
              />
              <label htmlFor={option}>{option}</label>
            </StSelectItem>
          ))}
          <button onClick={voteHandler}>선택</button>
        </StVoteBox>
      ) : null}
    </>
  );
};

export default Vote;

const StVoteBox = styled.div`
  border: 1px solid green;

  div:nth-child(${(props) => props.isSelect}) {
    background-color: red;
  }
`;

const StSelectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  width: 5rem;
  height: 3rem;
`;

const StVoteResultBox = styled.div`
  border: 1px solid blue;
`;

const StLoginPortal = styled.span`
  &:hover {
    font-weight: 600;
    text-decoration: underline;
  }
`;
