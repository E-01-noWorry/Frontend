import styled from 'styled-components';

const LoginButton = ({ children, onClick }) => {
  return <LgButton onClick={onClick}>{children}</LgButton>;
};
export default LoginButton;

const LgButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: white;
  width: 100%;
  height: 5.6rem;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 150%;
  margin-top: 1.6rem;
  background: #000000;
  border-radius: 20px;
`;
