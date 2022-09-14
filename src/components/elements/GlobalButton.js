import React from 'react';

import { fontBold, fontExtraBold } from '../../shared/themes/textStyle';

import styled from 'styled-components';

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
  background-color: ${(props) => props.bgc || props.theme.main2};

  border-radius: ${(props) => props.borderR || '2rem'};

  ${(props) => (props.fw === 'bold' ? fontBold : fontExtraBold)}
  color: ${(props) => props.font || props.theme.white};
`;
