import React from "react";
import { useNavigate } from "react-router-dom";
import { MS } from "components/common/modal/modalStyles";

const LoginModal = ({ handleClick }) => {
  const navigate = useNavigate();

  return (
    <>
      <MS.Window>
        <MS.TextContainer>
          <span>로그인 후 사용해주세요.</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={() => navigate("/login")}>로그인</div>
          <div onClick={handleClick}>확인</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClick} />
    </>
  );
};

export default LoginModal;
