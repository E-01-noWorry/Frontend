import React, { useState } from 'react';
import Router from './router/router';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, defaultTheme } from './shared/themes/Theme';
import GlobalStyles from './shared/themes/GlobalStyles';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : defaultTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;
