import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from './../config/thems';

const renderWithTheme = (children) => {
  return render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
  );
};

export default renderWithTheme