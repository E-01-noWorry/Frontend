import React, { useState } from 'react';
import Router from './router/router';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { darkTheme, lightTheme } from './shared/Theme';
import Footer from './components/common/Footer';

const App = () => {
  const GlobalStyle = createGlobalStyle`
  ${reset}  
  body {        
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor}
  }  
`;

  const [isDarkMode, setIsDarkMode] = useState(false);

  https: return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
