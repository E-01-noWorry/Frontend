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
  position: fixed;
  bottom: 9rem;
  right: 2.4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 6.4rem;
  height: 6.4rem;

  border-radius: 50%;
`;
