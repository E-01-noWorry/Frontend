import React, { useState } from 'react';
import Router from './router/router';
import { ThemeProvider } from 'styled-components';
import theme from './shared/themes/Theme';
import GlobalStyles from './shared/themes/GlobalStyles';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (process.env.NODE_ENV === 'production') {
    console.log = function no_console() {};
    console.warn = function () {};
  }

  return (
    <ThemeProvider theme={isDarkMode ? theme.darkTheme : theme.defaultTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;
