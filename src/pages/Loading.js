import React from 'react';

import Logo from '../static/images/Logo.svg';

import styled from 'styled-components';

const Loading = () => {
  return (
    <></>
    // <StLogo>
    //   <img src={Logo} alt="Logo" />
    // </StLogo>
  );
};

export default Loading;

const StLogo = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;
