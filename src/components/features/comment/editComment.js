import React, { useState } from 'react';
import {
  deleteCommentThunk,
  editCommentThunk,
} from '../../../app/module/commentSlice';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  fontExtraBold,
  fontSmall,
  fontMedium,
  fontBold,
} from '../../../shared/themes/textStyle';
import BodyPadding from '../../common/BodyPadding';
import ProfileImg from '../../elements/ProfileImg';

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
    <BodyPadding>
      {edit ? (
        <>
          <EditContainer>
            <EditNickname>{props.allComments.nickname}</EditNickname>
            <EditInput
              type="text"
              name="comment"
              onChange={onChange}
              placeholder="입력해주세요."
            />
          </EditContainer>
          <EditButtons>
            <Button onClick={onClickEditMode}>취소</Button>
            <Button
              onClick={() => {
                onClickEdit(props.allComments.commentKey);
                onClickEditMode();
              }}
            >
              수정
            </Button>
          </EditButtons>
        </>
      ) : (
        <>
          <DefaultBox>
            <Names>
              <ProfileImg />
              <Nickname>{props.allComments.nickname}</Nickname>
              <MinutesBefore>
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
              </MinutesBefore>
            </Names>
            <Buttons>
              {props.allComments.userKey === parseInt(getUserKey) ? (
                <Button
                  onClick={(commentKey) =>
                    onClickDelete(String(props.allComments.commentKey))
                  }
                >
                  삭제
                </Button>
              ) : null}

              {props.allComments.userKey === parseInt(getUserKey) ? (
                <Button onClick={onClickEditMode}>수정</Button>
              ) : null}
            </Buttons>
          </DefaultBox>
          <CommentBox>{props.allComments.comment}</CommentBox>
        </>
      )}
    </BodyPadding>
  );
};

export default EditComment;

const Padding = styled.div``;

const EditContainer = styled.div`
  margin: 1.8rem 0 0 5.6rem;
  display: flex;
  flex-direction: column;
`;

const DefaultBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.8rem;
`;

const EditInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 20px;
  border: 1px solid black;
`;

const EditNickname = styled.p`
  display: inline;
  ${fontMedium}
  ${fontBold}
letter-spacing: -0.5px;
`;

const EditButtons = styled.div`
  position: relative;
  top: 1rem;
  left: 5rem;
`;

const Nickname = styled.p`
  display: inline;
  ${fontMedium}
  ${fontBold}
  letter-spacing: -0.5px;
  margin-left: 1.6rem;
`;

const MinutesBefore = styled.p`
  display: inline;
  margin-left: 1rem;
  ${fontSmall}
  color: #767676;
`;

const CommentBox = styled.div`
  display: inline-block;
  ${fontMedium}
  margin: 0 0 0 5rem;
  width: 27.9rem;
  height: 4.2rem;
  overflow: hidden;
  position: relative;
  bottom: 1.5rem;
  left: 0.6rem;
`;

const Button = styled.button`
  border: none;
  background: #fff;
  ${fontExtraBold}
  ${fontSmall}
`;

const Buttons = styled.div`
  position: relative;
  bottom: 1.4rem;
`;
const Names = styled.div`
  display: flex;
  justify-content: center;
`;
