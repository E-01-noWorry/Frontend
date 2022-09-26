import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import {
  deleteRecommentThunk,
  editRecommentThunk,
} from '../../../app/module/commentSlice';
import {
  fontExtraBold,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';
import ProfileImg from '../../elements/ProfileImg';

const Recomment = (state) => {
  const dispatch = useDispatch();
  //시간
  const writtenTime = new Date() - new Date(state.state.updatedAt);

  const seconds = writtenTime / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;

  //삭제
  const onClickDelete = () => {
    dispatch(deleteRecommentThunk({ recommentKey: state.state.recommentKey }));
  };
  //수정
  const [editMode, setEditMode] = useState(false);
  const [editComment, setEditComment] = useState('');
  const onClickEditMode = () => {
    setEditMode((status) => !status);
    setEditComment(state.state.comment);
  };

  const onChangeEdit = (event) => {
    setEditComment(event.target.value);
  };

  const onClickEdit = () => {
    dispatch(
      editRecommentThunk({
        recomment: editComment,
        recommentKey: state.state.recommentKey,
      }),
    );
  };

  //본인확인
  const auth =
    state.state?.userKey === parseInt(localStorage.getItem('userKey'));

  return (
    <div>
      <RecommentContainer>
        <RecommentBox>
          <MakeItRow>
            <StProfileImgSmall point={state.state.User.point} />
            <Nickname>{state.state?.User?.nickname}</Nickname>
            <Ago>
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
            </Ago>
            <Buttons>
              {auth ? (
                editMode ? null : (
                  <Delete onClick={onClickDelete}>삭제</Delete>
                )
              ) : null}

              {auth ? (
                editMode ? null : (
                  <Edit onClick={onClickEditMode}>수정</Edit>
                )
              ) : null}
            </Buttons>
          </MakeItRow>
          <Comment>
            {editMode ? (
              <EditInput
                maxLength="50"
                onChange={onChangeEdit}
                value={editComment}
              />
            ) : (
              state.state.comment
            )}
          </Comment>
          {editMode ? (
            <MakeItRow2>
              <EditButton onClick={onClickEditMode}>수정취소</EditButton>
              <EditButton
                onClick={() => {
                  onClickEdit();
                  onClickEditMode();
                }}
              >
                수정
              </EditButton>
            </MakeItRow2>
          ) : null}
        </RecommentBox>
      </RecommentContainer>
    </div>
  );
};

export default Recomment;

const StProfileImgSmall = styled(ProfileImg)`
  width: 3rem;
  height: 3rem;
`;

const RecommentContainer = styled.div`
  padding: 0 0 2.4rem 5.6rem;

  width: 100%;
`;

const RecommentBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const MakeItRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Nickname = styled.div`
  margin-left: 1.6rem;
  ${fontMedium}
  font-weight: 500;
  padding-top: 0.4rem;
`;

const Ago = styled.div`
  font-size: 1.2rem;
  color: #b9b5b1;
  margin-left: 0.8rem;
  padding-top: 0.6rem;
`;

const EditInput = styled.input`
  padding: 0.8rem;
  border: none;
  resize: none;
  border-radius: 2rem;
  height: 4vh;
  width: 100%;
`;

const Comment = styled.div`
  margin-top: -0.1rem;
  margin-bottom: 0.4rem;
  margin-left: 4.6rem;
  ${fontMedium}
  width: 22.3rem;
`;

const Buttons = styled.div`
  position: absolute;
  right: 2rem;
`;
const Delete = styled.button`
  border: none;
  color: #000;
  background-color: #f8f3eb;
  ${fontSmall}
  ${fontExtraBold}
`;
const Edit = styled.button`
  border: none;
  color: #000;
  background-color: #f8f3eb;
  ${fontSmall}
  ${fontExtraBold}
`;
const EditButton = styled.button`
  border: none;
  color: #000;
  background-color: #f8f3eb;
  ${fontSmall}
  ${fontExtraBold}
`;
const MakeItRow2 = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 4rem;
  margin-top: 0.6rem;
`;
