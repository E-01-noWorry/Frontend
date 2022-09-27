import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCommentThunk } from '../../../app/module/commentSlice';
import EditComment from './editComment';
import { fontMedium } from '../../../shared/themes/textStyle';
import { css } from 'styled-components';

const Comment = (props) => {
  const dispatch = useDispatch();

  const params = useParams();

  //유저정보
  const user = props.user.login;

  //댓글정보
  const allComments = props.user?.comment?.data;

  useEffect(() => {
    dispatch(getCommentThunk({ params }));
  }, [dispatch]);

  return (
    <Container allComments={allComments}>
      {allComments.length === 0 ? (
        <NoComments>댓글이 없습니다.</NoComments>
      ) : (
        <CommentContainer>
          <div>
            {allComments?.map((a) => (
              <CommentsDetail key={a?.commentKey}>
                <EditComment params={params} allComments={a} user={user} />
              </CommentsDetail>
            ))}
          </div>
        </CommentContainer>
      )}
    </Container>
  );
};
export default Comment;

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bg};

  padding-bottom: 2.4rem;
  ${(props) =>
    props.allComments.length === 0
      ? css`
          padding-bottom: 7rem;
        `
      : null}
`;

const NoComments = styled.p`
  @media ${({ theme }) => theme.device.PC} {
    margin: 0;
  }

  display: flex;
  border-top: 1px solid #dbdbdb;
  margin: 0 -2rem;
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

const CommentsDetail = styled.div`
  border-top: 1px solid #d9d9d9;
  margin: 0 -2rem;
  height: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  overflow: hidden;
  align-items: center;
  display: flex;

  line-height: 2rem;
`;
