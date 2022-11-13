import React, { useState } from "react";
import instance from "app/module/instance";
import ProfileImg from "common/elements/ProfileImg";
import Badge from "domain/mypage/components/Badge";
import { userStorage } from "shared/utils/localStorage";
import { fontBold, fontExtraBold } from "shared/themes/textStyle";
import { fontExtraSmall, fontLarge, fontMedium } from "shared/themes/textStyle";
import IconChange from "static/icons/Variety=Change, Status=untab, Size=S.svg";
import styled from "styled-components";

const UserContainer = ({ myInfo, handleModal }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editNickname, setEditNickname] = useState("");

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
    setEditNickname(userStorage.getNickname());
  };

  const handleOnChange = (event) => {
    setEditNickname(event.target.value);
  };

  const __putMyNickname = async () => {
    try {
      const { data } = await instance.put("/user/nickname", { nickname: editNickname });
      userStorage.setNickname(data.nickname);
      setIsEdit(false);
    } catch (error) {
      handleModal(error.response.data.errMsg);
    }
  };

  return (
    <S.UserContainer>
      <ProfileImg point={myInfo.point} />

      <div>
        <Badge point={myInfo.point} />

        {isEdit ? (
          <S.Edit>
            <input type="text" value={editNickname} onChange={handleOnChange} />
            <span>*한글, 영문, 숫자로만 2~10자로 입력해주세요</span>
            <S.Button onClick={__putMyNickname}>변경</S.Button>
            <S.Button onClick={handleEdit}>취소</S.Button>
          </S.Edit>
        ) : (
          <S.Basic>
            <span>{userStorage.getNickname()}</span>
            <span>님</span>
            <S.Button onClick={handleEdit}>
              <img width="20" src={IconChange} alt="IconChange" />
              <span>변경</span>
            </S.Button>
          </S.Basic>
        )}
      </div>
    </S.UserContainer>
  );
};

const S = {
  UserContainer: styled.section`
    display: grid;
    grid-template-columns: 6rem auto;
    align-items: center;
    gap: 0.8rem;

    width: 100%;
  `,

  Edit: styled.div`
    position: relative;

    display: flex;
    align-items: center;

    height: 3.6rem;
    border-bottom: 1px solid ${({ theme }) => theme.sub4};

    input {
      width: 100%;

      ${fontLarge};
      ${fontExtraBold};

      &:focus {
        outline: none;
      }
    }

    span {
      position: absolute;
      top: 4rem;
      left: 0.4rem;

      ${fontBold};
      ${fontExtraSmall};
    }
  `,

  Basic: styled.div`
    display: flex;
    align-items: center;

    height: 3.6rem;

    > span:nth-child(1) {
      ${fontLarge};
      ${fontExtraBold};
    }

    > span:nth-child(2) {
      margin-left: 0.3rem;
      ${fontLarge}
    }
  `,

  Button: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;

    min-width: 5rem;
    height: 3rem;
    margin-left: 0.8rem;
    background-color: ${({ theme }) => theme.sub4};

    border-radius: 1.8rem;

    ${fontMedium};
    ${fontBold};
  `,
};

export default UserContainer;
