import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../app/module/instance';
import { cleanUp, __getDetailSelect } from '../app/module/selectSlice';
import Vote from '../components/features/vote/Vote';
import Comment from '../components/features/comment/comment';
import styled from 'styled-components';
import {
  fontExtraBold,
  fontLarge,
  fontMedium,
} from '../shared/themes/textStyle';
import { remainedTime } from '../shared/timeCalculation';

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

  //투표 게시글 DELETE API
  const deleteHandler = async () => {
    try {
      await instance.delete(`/select/${selectKey}`);
      navigate('/', { state: 'select' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      {parseInt(userKey) === content?.userKey ? (
        <button onClick={deleteHandler}>삭제</button>
      ) : null}
      <StInfoWrap>
        <StProfile></StProfile>
        <StNickname>{content.nickname}</StNickname>
        <StCategory>{content.category}</StCategory>
        <StTitle>{content.title}</StTitle>
        <StDeadLine>
          <span>아이콘</span>
          <span>{remainedTime(content.deadLine)}</span>
        </StDeadLine>
      </StInfoWrap>
      <Vote content={content} selectKey={selectKey} userKey={userKey} />
      {/*yuncheol, Comment 컴포넌트 추가 */}
      <Comment content={content} user={user} />
    </>
  );
};

export default Detail;

const StInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1.6rem;
`;

const StProfile = styled.div`
  background-color: green;
  width: 4rem;
  height: 4rem;

  border-radius: 50%;
`;

const StNickname = styled.div`
  ${fontMedium}
  line-height: 2.1rem;

  height: 2.1rem;

  margin-top: 0.2rem;
`;

const StCategory = styled.div`
  ${fontMedium};
  line-height: 2.1rem;

  height: 2.1rem;
  padding: 0 0.4rem;
  border-radius: calc(2.1rem / 2);

  margin-top: 2rem;

  background-color: #d8d8d8;
`;

const StTitle = styled.div`
  ${fontLarge};
  ${fontExtraBold};
  line-height: 3rem;

  width: 100%;
  padding: 8px 20px;
  text-align: center;
`;

const StDeadLine = styled.div`
  display: flex;
  gap: 0.35rem;
  ${fontMedium};

  span:nth-child(2) {
    color: #ff6363;
  }
`;
