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
import Recomment from './recomment';
import { writeRecommentThunk } from '../../../app/module/commentSlice';
import { ModalBasic } from '../../common/Modal';

const EditComment = (props) => {
  const [modals, setModals] = useState('');

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

  //댓글 수정버튼 클릭 시, 작성했던 댓글 불러오기
  //수정하기 버튼의 onClick에 적용
  const commentValue = props.allComments.comment;

  const onClickEditMode = () => {
    setEdit((status) => !status);
  };

  //수정완료 버튼
  const onClickEdit = (commentKey) => {
    dispatch(editCommentThunk({ ...editComment, commentKey }));
  };

  // 댓글의 시간이 얼마나 지났느냐?
  const writtenTime = new Date(props.allComments.updatedAt);

  const seconds = (new Date() - writtenTime) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;

  //대댓글
  const [replyMode, setReplyMode] = useState(false);
  const [reply, setReply] = useState('');

  const onClickCancelReply = () => {
    if (localStorage.getItem('accessToken') !== null) {
      setReplyMode((status) => !status);
    }
    if (localStorage.getItem('accessToken') === null) {
      setModals('로그인 후 이용하세요');
    }
  };

  const onClickReplyButton = () => {
    setReplyMode((status) => !status);
    if (reply.comment?.length >= 2) {
      dispatch(
        writeRecommentThunk({
          ...reply,
          commentKey: props.allComments.commentKey,
        }),
      );
    } else if (
      reply.comment?.length > 0 &&
      reply.comment?.length < 2 &&
      localStorage.getItem('accessToken') !== null
    ) {
      setModals('2글자 이상 입력하세요');
    }
    if (
      reply === '' ||
      (reply.comment === '' && localStorage.getItem('accessToken') !== null)
    ) {
      setModals('내용을 입력해주세요');
    }
  };

  const onChangeReply = (event) => {
    setReply({ comment: event.target.value });
  };

  return (
    <>
      {modals && <ModalBasic setter={() => setModals('')}>{modals}</ModalBasic>}
      <BodyPadding>
        {edit ? (
          <>
            <EditContainer>
              <ProfileImg point={props.allComments.point} />
              <EditNickname>{props.allComments.nickname}</EditNickname>
            </EditContainer>

            <EditInput
              type="text"
              onChange={onChange}
              name="comment"
              placeholder="입력해주세요."
              value={editComment.comment}
            />

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
                <ProfileImg point={props.allComments.point} />
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
                  <Button
                    onClick={() => {
                      onClickEditMode();
                      //작성했던 내용 불러오기
                      setEditComment({
                        comment: commentValue,
                      });
                    }}
                  >
                    수정
                  </Button>
                ) : null}
              </Buttons>
            </DefaultBox>
            <CommentBox>
              <span>{props.allComments.comment}</span>
              {replyMode ? (
                <ReplyInput
                  maxLength="50"
                  type="text"
                  onChange={onChangeReply}
                />
              ) : null}
              <MakeItRow>
                <ReplyButton onClick={onClickCancelReply}>
                  {replyMode ? '작성 취소' : '답글 달기'}
                </ReplyButton>
                <CancelReply onClick={onClickReplyButton}>
                  {replyMode ? '작성 완료' : null}
                </CancelReply>
              </MakeItRow>
            </CommentBox>
          </>
        )}
        {props.allComments.recomment?.map((a) => (
          <Recomment key={a.recommentKey} state={a} />
        ))}
      </BodyPadding>
    </>
  );
};

export default EditComment;

const EditContainer = styled.div`
  margin: 1.8rem 0 -1.5rem 0;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const DefaultBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.8rem;
`;

const EditInput = styled.input`
  padding: 0.8rem 0 0.8rem 1rem;
  width: 84%;
  height: 40px;
  margin-bottom: -0.5rem;
  margin-left: 5.5rem;
  border-radius: 20px;
  border: none;
  resize: none;
  &:focus {
    border: none;
  }
`;

const EditNickname = styled.p`
  display: inline;
  ${fontMedium}
  ${fontBold}
letter-spacing: -0.5px;
  margin-left: 1.6rem;
`;

const EditButtons = styled.div`
  position: relative;
  top: 1rem;
  left: 5rem;
  margin-bottom: 3rem;
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
  font-size: 1.2rem;
  padding-top: 0.2rem;
  color: #b9b5b1;
`;

const CommentBox = styled.div`
  display: inline-block;
  ${fontMedium}
  margin: 0 0 0 5rem;
  width: 27.9rem;
  height: 100%;
  position: relative;
  bottom: 1.5rem;
  left: 0.6rem;
  word-break: break-all;
`;

const Button = styled.button`
  border: none;
  background: #f8f3eb;
  ${fontExtraBold}
  ${fontSmall}
  color:#000;
`;

const Buttons = styled.div`
  position: absolute;
  right: 2rem;
  margin-bottom: 2.5rem;
`;
const Names = styled.div`
  display: flex;
  justify-content: center;
`;

const ReplyButton = styled.p`
  color: #ff9b25;
  ${fontSmall}
  margin-top: 0.8rem;
  margin-bottom: 1.6rem;
`;

const MakeItRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReplyInput = styled.input`
  margin-top: 0.8rem;
  border: none;
  border-radius: 2rem;
  width: 100%;
  height: 40px;
  padding: 0.5rem 0 0.5rem 1rem;
`;

const CancelReply = styled.p`
  color: #ff9b25;
  ${fontSmall}
  margin-top: 0.8rem;
  margin-bottom: 1.6rem;
  margin-left: 1rem;
`;
