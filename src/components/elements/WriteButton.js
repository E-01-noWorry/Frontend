import React from 'react';

import IconWrite from '../../static/icons/Variety=Write, Status=untab, Size=XL.svg';

import styled from 'styled-components';

const WriteButton = ({ onClick }) => {
  return (
    <StWriteButton onClick={onClick}>
      <img src={IconWrite} alt="IconWrite" />
    </StWriteButton>
  );
};

export default WriteButton;

const StWriteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  img {
    z-index: 9;
  }
`;
