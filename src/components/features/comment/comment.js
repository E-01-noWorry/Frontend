import React, { useEffect, useSelector, useState } from 'react';
import IconSend from '../../../static/icons/Variety=send, Status=untab, Size=L.svg';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  writeCommentThunk,
  getCommentThunk,
} from '../../../app/module/commentSlice';
import EditComment from './editComment';
import { fontMedium } from '../../../shared/themes/textStyle';

const Comment = (props) => {
  const dispatch = useDispatch();

  const params = useParams();

  const [writeComment, setWriteComment] = useState({
    comment: '',
  });

  //유저정보
  const user = props.user.login;

  //댓글정보
  const allComments = props.user?.comment?.data;

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setWriteComment({ ...setWriteComment, [name]: value });
  };

  const onClickSubmit = () => {
    dispatch(
      writeCommentThunk({
        ...writeComment,
        selectKey: params.selectKey,
      }),
    );
    setWriteComment({
      comment: '',
    });
  };
  //무한스크롤

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getCommentThunk({ params }));
  }, [dispatch]);

  return (
    <Container>
      {allComments.length === 0 ? (
        <>
          <NoComments>댓글이 없습니다.</NoComments>
          <WriteBox>
            <Write
              type="text"
              placeholder="더 좋은 의견을 남겨주세요."
              name="comment"
              onChange={onChangeHandler}
              maxLength="50"
              value={writeComment.comment}
            />
            <SubmitButton onClick={onClickSubmit}>
              <img src={IconSend} alt="IconSend" />
            </SubmitButton>
          </WriteBox>
        </>
      ) : (
        <CommentContainer>
          <div>
            {allComments?.map((a) => (
              <CommentsDetail key={a?.commentKey}>
                <EditComment params={params} allComments={a} user={user} />
              </CommentsDetail>
            ))}
          </div>
          <WriteBox>
            <Write
              type="text"
              placeholder="더 좋은 의견을 남겨주세요."
              name="comment"
              onChange={onChangeHandler}
              maxLength="50"
              value={writeComment.comment}
            />
            <SubmitButton onClick={onClickSubmit}>
              <img src={IconSend} alt="IconSend" />
            </SubmitButton>
          </WriteBox>
        </CommentContainer>
      )}
    </Container>
  );
};
export default Comment;

const Container = styled.div`
  padding-bottom: 10rem;
`;

const NoComments = styled.p`
  display: flex;
  border-top: 1px solid #dbdbdb;
  height: 10rem;
  text-align: center;
  justify-content: center;
  align-items: center;

  ${fontMedium}
  text-align: center;
`;

const CommentContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding-bottom: 7rem;
`;

const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 8px 8px 8px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7.2rem;

  background: #f5f5f5;
`;

const Write = styled.input`
  width: 100%;
  padding: 1.75rem 10rem 1.75rem 2rem;
  border-radius: 20px;
  border: 0 solid black;
  resize: none;
`;

const CommentsDetail = styled.div`
  border-top: 1px solid #d9d9d9;
  height: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  overflow: hidden;

  align-items: center;
  display: flex;
`;

const SubmitButton = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2.8rem;
`;
