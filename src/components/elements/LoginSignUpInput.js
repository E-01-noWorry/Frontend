import React from 'react';
import styled from 'styled-components';

const LoginSignUpInput = styled.input`
  display: flex;
  align-items: center;

  width: 100%;
  height: 56px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.white};

  border: none;
  border-radius: 20px;
`;

function Button({ children, ...rest }) {
  return <LoginSignUpInput {...rest}>{children}</LoginSignUpInput>;
}

export default LoginSignUpInput;
