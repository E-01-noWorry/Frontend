import React from 'react';
import styled from 'styled-components';

const WriteButton = ({ onClick }) => {
  return <StWriteButton onClick={onClick}>+</StWriteButton>;
};

export default WriteButton;

const StWriteButton = styled.button`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
`;
