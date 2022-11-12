import React from "react";
import { MS } from "components/common/modal/modalStyles";
import { userStorage } from "shared/utils/localStorage";

const LogoutModal = ({ handleClick }) => {
  const handleLogout = () => {
    userStorage.clearStorage();
    handleClick();
  };

  return (
    <>
      <MS.Window>
        <MS.TextContainer>
          <span>로그아웃 하시겠습니까?</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={handleLogout}>로그아웃</div>
          <div onClick={handleClick}>취소</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClick} />
    </>
  );
};

export default LogoutModal;
