import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  cleanUpVote,
  __getVoteResult,
  __postVote,
} from '../../../app/module/voteSlice';

const Vote = ({ content, selectKey }) => {
  const dispatch = useDispatch();
  const voteResult = useSelector((state) => state.vote.voteResult);
  const msg = useSelector((state) => state.vote.msg);
  const [isSelect, setIsSelect] = useState();

  useEffect(() => {
    dispatch(__getVoteResult(selectKey));

    return () => {
      dispatch(cleanUpVote());
    };
  }, [dispatch, selectKey]);

  const voteHandler = () => {
    dispatch(__postVote({ isSelect, selectKey })).then(() => {
      setIsSelect(0);
    });
  };

  return (
    <>
      {msg.includes('조회 성공') ? (
        <StVoteResultBox>
          {content.options?.map((option, idx) => (
            <StSelectItem bgImage={content.image[idx]} key={idx}>
              <div>{voteResult?.[idx + 1] || 0}%</div>
              <div>{option}</div>
            </StSelectItem>
          ))}
        </StVoteResultBox>
      ) : (
        <StVoteBox bgImage={content.image} isSelect={isSelect}>
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

const StVoteBox = styled.div`
  border: 1px solid green;

  div:nth-child(${(props) => props.isSelect}) {
    transition-duration: 0.5s;
    background-color: gray;
    filter: brightness(70%);

    label {
      transform: translateY(-2rem);
    }

    button {
      display: block;
    }
  }
`;

const StVoteResultBox = styled.div`
  border: 1px solid blue;
`;

const StSelectItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 10rem;
  height: 10rem;

  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-color: aliceblue;

  button {
    display: none;
  }
`;
