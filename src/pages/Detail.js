import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import instance from '../app/module/instance';
import { cleanUp, __getDetailSelect } from '../app/module/selectSlice';

import Header from '../components/common/Header';
import BodyPadding from '../components/common/BodyPadding';
import Vote from '../components/features/vote/Vote';
import Comment from '../components/features/comment/comment';
import ProfileImg from '../components/elements/ProfileImg';

import { remainedTime } from '../shared/timeCalculation';

import {
  fontExtraBold,
  fontLarge,
  fontMedium,
} from '../shared/themes/textStyle';
import { IconLarge, IconSmall } from '../shared/themes/iconStyle';

import styled from 'styled-components';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useSelector((state) => state.select.select);
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
      console.log(error.response.data.errMsg);
    }
  };

  return (
    <>
      <Header>
        <StHeaderIcon onClick={() => navigate(-1)}></StHeaderIcon>
        {parseInt(userKey) === content?.userKey && (
          <StHeaderIcon onClick={deleteHandler}></StHeaderIcon>
        )}
      </Header>

      <BodyPadding>
        <StInfoWrap>
          <ProfileImg />

          <StNickname>{content.nickname}</StNickname>

          <StCategory>{content.category}</StCategory>

          <StTitle>{content.title}</StTitle>

          <StDeadLine>
            <StIcon></StIcon>
            <span>{remainedTime(content.deadLine)}</span>
            {remainedTime(content.deadLine) ? null : <span>투표마감</span>}
          </StDeadLine>
        </StInfoWrap>

        <Vote content={content} selectKey={selectKey} />
      </BodyPadding>

      <Comment content={content} user={user} />
    </>
  );
};

export default Detail;

const StHeaderIcon = styled.div`
  ${IconLarge};
  background-color: green;
`;

const StInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 8rem;
`;

const StNickname = styled.div`
  margin-top: 0.2rem;

  ${fontMedium}
  line-height: 2.1rem;
`;

const StCategory = styled.div`
  padding: 0 0.4rem;
  margin-top: 2rem;
  background-color: #d8d8d8;

  border-radius: calc(2.1rem / 2);

  ${fontMedium};
  line-height: 2.1rem;
`;

const StTitle = styled.div`
  width: 100%;
  margin: 0.8rem 2rem;

  ${fontLarge};
  ${fontExtraBold};
  line-height: 3rem;
  text-align: center;
`;

const StDeadLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;

  margin-top: 0.8rem;

  ${fontMedium};

  span:nth-child(2) {
    color: #ff6363;
  }
`;

const StIcon = styled.div`
  ${IconSmall};
  background-color: green;
`;
