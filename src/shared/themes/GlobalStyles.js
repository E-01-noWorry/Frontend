import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%; //1rem을 10px로 변환
  }

  * {
    box-sizing: border-box;
  }

  body {
    letter-spacing: -0.05rem;
    font-size: 1.6rem;
    font-weight: 400;
    
  }

//placeholder 색상
  ::placeholder {color: #AFAFAF}

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
