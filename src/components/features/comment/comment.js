import React, { useEffect, useSelector, useState } from 'react';
import styled from 'styled-components';
import LoginSignUpInput from '../../elements/LoginSignUpInput';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  writeCommentThunk,
  getCommentThunk,
  deleteCommentThunk,
} from '../../../app/module/commentSlice';
import EditComment from './editComment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comment = (props) => {
  const dispatch = useDispatch();

  const params = useParams();

  const [writeComment, setWriteComment] = useState({
    comment: '',
  });

  useEffect(() => {
    dispatch(getCommentThunk(params));
  }, [dispatch]);

  //유저정보
  const user = props.user.login;

  //댓글정보
  const allComments = props.user?.comment?.data;

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setWriteComment({ ...setWriteComment, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      writeCommentThunk({
        ...writeComment,
        selectKey: params.selectKey,
      }),
    );
  };

  useEffect(() => {
    if (writeComment.comment === '') {
      toast.error(`${props.user?.comment?.error?.errMsg}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (props.user?.comment?.error === null) {
      return null;
    }
  }, [props.user.comment.error]);

  console.log(props);

  return (
    <div>
      <CommentContainer>
        <p>댓글창</p>
        <br />
        <form onSubmit={onSubmit}>
          <p>내용</p>
          <LoginSignUpInput name="comment" onChange={onChangeHandler} />
          <button>제출</button>
          <ToastContainer />
        </form>
        <div>
          {allComments?.map((a) => (
            <CommentsDetail key={a?.commentKey}>
              <EditComment allComments={a} user={user} />
            </CommentsDetail>
          ))}
        </div>
      </CommentContainer>
    </div>
  );
};
export default Comment;

const CommentContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  margin-top: 1rem;
`;
const CommentsDetail = styled.div`
  border: 1px solid red;
  margin-bottom: 1rem;
  height: 8rem;
  padding: 0.5rem;
`;
