import { MS } from "components/common/modal/modalStyles";

const ModalBasic = ({ children, handleClick }) => {
  return (
    <>
      <MS.Window>
        <MS.TextContainer>
          <span>{children}</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={handleClick}>확인</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClick} />
    </>
  );
};

export default ModalBasic;
