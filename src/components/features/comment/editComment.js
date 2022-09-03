import React, { useState } from 'react';
import {
  deleteCommentThunk,
  editCommentThunk,
} from '../../../app/module/commentSlice';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const EditComment = (props) => {
  const dispatch = useDispatch();

  const getUserKey = localStorage.getItem('userKey');

  const [editComment, setEditComment] = useState({
    comment: '',
  });

  const [edit, setEdit] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setEditComment({ ...setEditComment, [name]: value });
  };

  const onClickDelete = (commentKey) => {
    dispatch(deleteCommentThunk(commentKey));
  };

  const onClickEditMode = () => {
    setEdit((status) => !status);
  };

  const onClickEdit = (commentKey) => {
    dispatch(editCommentThunk({ ...editComment, commentKey }));
  };

  // 댓글의 시간이 얼마나 지났느냐?
  const writtenTime = new Date(props.allComments.time);

  const seconds = (new Date() - writtenTime) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;

  return (
    <>
      {edit ? (
        <>
          <Nickname>{props.allComments.nickname}</Nickname>
          <CommentBox>
            <input type="text" name="comment" onChange={onChange} />
          </CommentBox>
          <button onClick={onClickEditMode} style={{ fontSize: '1rem' }}>
            취소
          </button>
          <button
            onClick={() => {
              onClickEdit(props.allComments.commentKey);
              onClickEditMode();
            }}
            style={{ fontSize: '1rem' }}
          >
            수정
          </button>
        </>
      ) : (
        <>
          <ProfileIMG>IMG</ProfileIMG>
          <Nickname>{props.allComments.nickname}</Nickname>
          <CommentBox>{props.allComments.comment}</CommentBox>
          <p>
            {seconds < 60
              ? '방금 전'
              : minutes < 60
              ? `${Math.floor(minutes)}분 전`
              : hours < 24
              ? `${Math.floor(hours)}시간 전`
              : days < 7
              ? `${Math.floor(days)}일 전`
              : weeks < 5
              ? `${Math.floor(weeks)}주 전`
              : months < 12
              ? `${Math.floor(months)}개월 전`
              : months < 12
              ? `${Math.floor(months)}개월 전`
              : null}
          </p>
          {props.allComments.userKey === parseInt(getUserKey) ? (
            <button
              onClick={(commentKey) =>
                onClickDelete(props.allComments.commentKey)
              }
              style={{ fontSize: '1rem' }}
            >
              삭제
            </button>
          ) : null}

          {props.allComments.userKey === parseInt(getUserKey) ? (
            <button onClick={onClickEditMode} style={{ fontSize: '1rem' }}>
              수정
            </button>
          ) : null}
        </>
      )}
    </>
  );
};

export default EditComment;

const ProfileIMG = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border: 1px solid black;
  border-radius: 50%;
  text-align: center;
  font-size: 0.6rem;
`;
const Nickname = styled.div``;
const CommentBox = styled.div``;
