import styled from 'styled-components';

const BodyPadding = ({ children }) => {
  return <Padding>{children}</Padding>;
};

export default BodyPadding;

const Padding = styled.div`
  padding: 0 20px;
`;
