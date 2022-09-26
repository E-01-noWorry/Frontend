import styled from 'styled-components';

const BodyPadding = ({ children }) => {
  return <StBodyPadding>{children}</StBodyPadding>;
};

export default BodyPadding;

const StBodyPadding = styled.div`
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.bg};
`;
