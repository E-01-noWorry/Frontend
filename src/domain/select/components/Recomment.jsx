import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __deleteRecomment, __editRecomment } from "app/module/commentSlice";

import ProfileImg from "common/elements/ProfileImg";

import { userStorage } from "shared/utils/localStorage";
import { remainedTime } from "shared/utils/timeCalculation";

import { fontBold, fontExtraBold, fontExtraSmall, fontMedium } from "shared/themes/textStyle";
import styled from "styled-components";

const Recomment = ({ recomment, handleModal }) => {
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [newRecomment, setNewRecomment] = useState("");

  const handleEditToggle = (comment) => {
    setIsEditMode((prev) => !prev);
    setNewRecomment(comment);
  };

  const handleEditRecomment = (recommentKey) => {
    if (!newRecomment.trim().length) {
      handleModal("내용을 입력해주세요.");
      return;
    }

    dispatch(__editRecomment({ comment: newRecomment, recommentKey }));
    setIsEditMode((prev) => !prev);
  };

  const handleDeleteRecomment = (recommentKey) => {
    dispatch(__deleteRecomment(recommentKey));
  };

  return (
    <S.RecommentContainer>
      <ProfileImg point={recomment.User.point} size={"3rem"} />
      <div>
        <S.Top>
          <div>
            <span>{recomment.User.nickname}</span>
            <span>{remainedTime(recomment.updatedAt)} 전</span>
          </div>
          {userStorage.getUserKey() === recomment.userKey ? (
            isEditMode ? (
              <div>
                <span onClick={() => handleEditRecomment(recomment.recommentKey)}>완료</span>
                <span onClick={() => setIsEditMode((prev) => !prev)}>취소</span>
              </div>
            ) : (
              <div>
                <span onClick={() => handleEditToggle(recomment.comment)}>수정</span>
                <span onClick={() => handleDeleteRecomment(recomment.recommentKey)}>삭제</span>
              </div>
            )
          ) : null}
        </S.Top>

        <S.Middle>
          {isEditMode ? (
            <input value={newRecomment} onChange={(event) => setNewRecomment(event.target.value)} />
          ) : (
            recomment.comment
          )}
        </S.Middle>
      </div>
    </S.RecommentContainer>
  );
};

const S = {
  RecommentContainer: styled.section`
    display: grid;
    grid-template-columns: 3rem auto;
    gap: 1.6rem;
    margin-bottom: 2rem;

    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  `,

  Top: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:nth-child(1) {
      display: flex;
      align-items: center;

      > span:nth-child(1) {
        ${fontMedium};
        ${fontBold}
      }

      > span:nth-child(2) {
        margin-left: 0.8rem;

        ${fontExtraSmall};
        color: ${({ theme }) => theme.sub2};
      }
    }

    > div:nth-child(2) {
      display: flex;
      gap: 1.6rem;

      span {
        ${fontExtraSmall};
        ${fontExtraBold};

        cursor: pointer;
      }
    }
  `,

  Middle: styled.div`
    ${fontMedium};

    input {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 999rem;
      background-color: ${({ theme }) => theme.white};
    }
  `,
};

export default Recomment;
