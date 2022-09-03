import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../../app/module/instance';
import { cleanUpVote, __getVoteResult } from '../../../app/module/voteSlice';
import styled from 'styled-components';

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
        <StVoteBox isSelect={isSelect}>
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
