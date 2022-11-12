import React from "react";
import instance from "app/module/instance";
import { MS } from "components/common/modal/modalStyles";
import { userStorage } from "shared/utils/localStorage";

const UserDeleteModal = ({ handleClick, handleModal }) => {
  const __deleteUser = async () => {
    try {
      await instance.delete("/user/del");
      handleClick();
      userStorage.clearStorage();
      handleModal("회원 탈퇴가 완료됐습니다.");
    } catch (error) {
      handleModal(error.response.data.errMsg);
    }
  };

  return (
    <>
      <MS.Window>
        <MS.TextContainer>
          <span>정말 회원 탈퇴를 하시겠습니까?</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={__deleteUser}>회원 탈퇴</div>
          <div onClick={handleClick}>취소</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClick} />
    </>
  );
};

export default UserDeleteModal;
