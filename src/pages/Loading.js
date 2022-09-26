import React from 'react';

// import Logo from '../static/images/Logo.svg';

import styled from 'styled-components';

const Loading = () => {
  return (
    <StLoading></StLoading>
    // <StLogo>
    //   <img src={Logo} alt="Logo" />
    // </StLogo>
  );
};

export default Loading;

const StLoading = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    min-height: calc(100%);
  }

  background-color: ${({ theme }) => theme.bg};
`;

// const StLogo = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;

//   transform: translate(-50%, -50%);
// `;
