import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '../../static/fonts/fonts.css';

const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%; //1rem을 10px로 변환
  }

  * {
    box-sizing: border-box;

    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
  }

  body {
    box-sizing: border-box;
    
    font-size: 1.6rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;

    letter-spacing: -0.05rem;
    color: ${({ theme }) => theme.black};

    background-color: ${({ theme }) => theme.bg};

    cursor: default;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
