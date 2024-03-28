export const colorPalette = {
  base: {
    100: '#ffffff',
    200: '#ffffff',
    300: '#ffffff',
    400: '#ffffff',
    500: '#ffffff',
    600: '#cccccc',
    700: '#999999',
    800: '#666666',
    900: '#333333',
  },
  accent1: {
    100: '#dcf1e7',
    200: '#bae2cf',
    300: '#97d4b8',
    400: '#75c5a0',
    500: '#52b788',
    600: '#42926d',
    700: '#316e52',
    800: '#214936',
    900: '#10251b',
  },
  accent2: {
    100: '#d6d6d6',
    200: '#adadad',
    300: '#858585',
    400: '#5c5c5c',
    500: '#333333',
    600: '#292929',
    700: '#1f1f1f',
    800: '#141414',
    900: '#0a0a0a',
  },
};

import { createTheme } from '@mui/material';

const customTheme = createTheme({
  palette: {
    primary: {
      main: colorPalette.accent1[500],
    },
    secondary: {
      main: colorPalette.base[500],
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    fontSize: 12,
    h1: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 40,
    },
    h2: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 32,
    },
    h3: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 24,
    },
    h4: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 20,
    },
    h5: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 16,
    },
    h6: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 14,
    },
  },
});

export default customTheme;
