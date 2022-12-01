import "static/fonts/fonts.css";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { fontMedium } from "shared/themes/textStyle";

const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%; //1rem을 10px로 변환
  }

  * {
    box-sizing: border-box;

    font-size: 1.6rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
  }

  body {
    @media ${({ theme }) => theme.device.PC} {
      background-color: ${({ theme }) => theme.color.sub5};
    }

    box-sizing: border-box;
    
    font-size: 1.6rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;

    letter-spacing: -0.05rem;
    color: ${({ theme }) => theme.color.black};

    background-color: ${({ theme }) => theme.color.bg};
    overflow: overlay;

    cursor: default;
    
    &::-webkit-scrollbar {      
      width: 0.5rem;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.color.main2};
      border-radius: 0.25rem;
    }
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.black};
  }

  button {
    background-color: transparent;
    border: none;
    text-decoration: none;
    color: ${({ theme }) => theme.color.black};
    
    cursor: pointer;
  }

  textarea,
  input {
    border: none;
    background-color: transparent;
    ${fontMedium};
  }

  ::placeholder {
    ${fontMedium};
    color: ${({ theme }) => theme.color.sub2};
  }
`;

export default GlobalStyles;
