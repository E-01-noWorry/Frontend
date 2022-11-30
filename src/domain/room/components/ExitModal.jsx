import { MS } from "common/components/modal/modalStyles";
import React from "react";

const ExitModal = ({ handleClick, handleClickLeave }) => {
  return (
    <>
      <MS.Window>
        <MS.TitleConatiner>상담방 나가기</MS.TitleConatiner>
        <MS.TextContainer>
          <span>나가기를 하면 작성자의 추천을 받을 수 없어요.</span>
          <span>(추천을 받으면 등급이 올라가요!)</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={handleClickLeave}>나가기</div>
          <div onClick={handleClick}>취소</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClick} />
    </>
  );
};

export default ExitModal;
