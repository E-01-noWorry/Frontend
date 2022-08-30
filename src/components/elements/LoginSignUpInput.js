import React from 'react';
import styled from 'styled-components';

const LoginSignUpInput = styled.input`
  /* 공통 스타일 */
  display: inline-flex;
  border-radius: 4px;
  font-weight: bold;
  padding: 1rem;

  /* 크기 */
  height: 2.25rem;
  font-size: 1rem;

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;

function Button({ children, ...rest }) {
  return <LoginSignUpInput {...rest}>{children}</LoginSignUpInput>;
}

export default LoginSignUpInput;