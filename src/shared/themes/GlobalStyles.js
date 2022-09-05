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
    letter-spacing: -0.05rem;

    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.6rem;
    font-weight: 400;

    background-color: #f5f5f5;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  // 나중에 미디어 쿼리 적용할때 사용
  /* @media screen and (max-width: 767px) {} 
  @media screen and (max-width: 600px) {}
  @media screen and (max-width: 575px) {} 
  @media screen and (max-width: 480px) {} 
  @media screen and (max-width: 360px) {} */
`;

export default GlobalStyles;
