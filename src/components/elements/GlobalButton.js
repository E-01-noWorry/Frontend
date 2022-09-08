import React from 'react';

import styled from 'styled-components';

import { fontBold, fontExtraBold } from '../../shared/themes/textStyle';

const GlobalButton = ({ children, ...rest }) => {
  return <StGlobalButton {...rest}>{children}</StGlobalButton>;
};

export default GlobalButton;

const StGlobalButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;

  width: 100%;
  height: ${(props) => props.h || '5.6rem'};
  background-color: ${(props) => props.bgc || '#000'};

  border: ${(props) => props.border || null};
  border-radius: ${(props) => props.borderR || '2rem'};

  ${(props) => (props.fw === 'bold' ? fontBold : fontExtraBold)}
  color: ${(props) => props.color || '#fff'};
`;
