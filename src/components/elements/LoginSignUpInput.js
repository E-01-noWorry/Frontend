import React from 'react';
import styled from 'styled-components';

const LoginSignUpInput = styled.input`
  /* 공통 스타일 */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 1.6rem;
  margin-top: 1.6rem;
  width: 100%;
  height: 56px;
  border: none;
  background: #ececec;
  border-radius: 20px;
`;

function Button({ children, ...rest }) {
  return <LoginSignUpInput {...rest}>{children}</LoginSignUpInput>;
}

export default LoginSignUpInput;
