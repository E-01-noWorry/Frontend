import styled from 'styled-components';

const Header = ({ children }) => {
  return <HeaderBox>{children}</HeaderBox>;
};

export default Header;

const HeaderBox = styled.div`
  width: 100%;
  height: 6.4rem;
  display: flex;
  align-items: center;
`;
