import React from 'react';
import styled from 'styled-components';

const GlobalButton = ({ onChange, onClick, children }) => {
  return (
    <StGlobalButton onChange={onChange} onClick={onClick}>
      {children}
    </StGlobalButton>
  );
};

export default GlobalButton;

const StGlobalButton = styled.button`
  height: 4rem;
`;
