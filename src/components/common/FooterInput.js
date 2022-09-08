import React from 'react';

import styled from 'styled-components';

const FooterInput = ({ children, ...rest }) => {
  return <StFooterInput {...rest}>{children}</StFooterInput>;
};

export default FooterInput;

const StFooterInput = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 7.2rem;
  padding: 0.8rem;
  background-color: #f5f5f5;

  input {
    width: 100%;
    height: 5.6rem;
    padding: 0 2rem;

    border: none;
    border-radius: 2rem;

    &:focus {
      outline: none;
    }
  }
`;
