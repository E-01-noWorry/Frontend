import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  cleanUp,
  __deleteSelect,
  __getDetailSelect,
} from '../app/module/selectSlice';
import Vote from '../components/features/vote/Vote';
import Comment from '../components/features/comment/comment';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useSelector((state) => state.select.select);

  //yuncheol, props로 유저정보 및 댓글 가져오기위해 추가
  const user = useSelector((state) => state);

  const { selectKey } = useParams();
  const userKey = localStorage.getItem('userKey');

  useEffect(() => {
    dispatch(__getDetailSelect(selectKey));

    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch, selectKey]);

  const deleteHandler = () => {
    dispatch(__deleteSelect(selectKey)).then(() => {
      navigate('/', { state: 'select' });
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>뒤로 가기</button>
        {parseInt(userKey) === content?.userKey ? (
          <button onClick={deleteHandler}>삭제</button>
        ) : null}
        <h1>{content.title}</h1>
        <div>{content.nickname}</div>
        <div>{content.category}</div>
        <div>{content.deadLine}</div>
        <StImageBox>
          {content.image?.map((image) => (
            <img key={image} src={image} alt={image} />
          ))}
        </StImageBox>
        <div>{content.content}</div>
        <Vote content={content} selectKey={selectKey} userKey={userKey} />
      </div>
      {/*yuncheol, Comment 컴포넌트 추가 */}
      <Comment content={content} user={user} />
    </div>
  );
};

export default Detail;

const StImageBox = styled.div`
  height: 10rem;

  img {
    height: 100%;
  }
`;
