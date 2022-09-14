import styled from 'styled-components';

const Header = ({ children, ...rest }) => {
  return <StHeader {...rest}>{children}</StHeader>;
};

export default Header;

const StHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.bg};

  z-index: 9;
`;
