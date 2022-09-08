import React from 'react';

import styled from 'styled-components';

const WriteButton = ({ onClick }) => {
  return <StWriteButton onClick={onClick}>+</StWriteButton>;
};

export default WriteButton;

const StWriteButton = styled.div`
  position: fixed;
  bottom: 8rem;
  right: 2.4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 6.4rem;
  height: 6.4rem;
  background-color: #9b9b9b;

  border: none;
  border-radius: 50%;
`;
