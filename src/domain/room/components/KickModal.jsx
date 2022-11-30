import { MS } from "common/components/modal/modalStyles";
import React from "react";

const KickModal = ({ socket, roomKey, userKey, nickname, handleClickKick, handleSetKick }) => {
  const handleKickUser = () => {
    socket.current.emit("expulsion", { roomKey, userKey });
    handleSetKick();
  };

  return (
    <>
      <MS.Window>
        <MS.TextContainer>
          <span>'{nickname}'님을 상담방에서 내보냅니다.</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={handleKickUser}>내보내기</div>
          <div onClick={handleClickKick}>취소</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClickKick} />
    </>
  );
};

export default KickModal;
