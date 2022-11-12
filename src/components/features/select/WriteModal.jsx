import React from "react";
import { useNavigate } from "react-router-dom";
import { MS } from "components/common/modal/modalStyles";

const WriteModal = ({ handleClick }) => {
  const navigate = useNavigate();

  const handleClickWrite = () => {
    navigate("/write", { state: { now: "/select" } });
  };

  return (
    <>
      <MS.Window>
        <MS.TitleConatiner>고민투표 만들기</MS.TitleConatiner>
        <MS.TextContainer>
          <span>
            투표는 <span style={{ fontWeight: "700" }}>5분 당 1회</span>만 작성할 수 있습니다.
            <br />
            투표를 작성하시겠습니까?
          </span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={handleClickWrite}>투표 작성</div>
          <div onClick={handleClick}>취소</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClick} />
    </>
  );
};

export default WriteModal;
