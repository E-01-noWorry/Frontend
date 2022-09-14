import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%; //1rem을 10px로 변환
  }

  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    font-size: 1.6rem;
    font-weight: 400;
    font-family: 'Noto Sans KR', sans-serif;

    letter-spacing: -0.05rem;
    color: ${({ theme }) => theme.black};

    background-color: ${({ theme }) => theme.bg};
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
