export const colorPalette = {
  header: {
    100: '#fef5df',
    200: '#fdebbf',
    300: '#fce09f',
    400: '#fbd67f',
    500: '#facc5f',
    600: '#c8a34c',
    700: '#967a39',
    800: '#645226',
    900: '#322913',
  },

  body: {
    100: '#fefdfb',
    200: '#fcfaf7',
    300: '#fbf8f4',
    400: '#f9f5f0',
    500: '#f8f3ec',
    600: '#c6c2bd',
    700: '#95928e',
    800: '#63615e',
    900: '#32312f',
  },

  txt: {
    100: '#d6d6d5',
    200: '#aeadac',
    300: '#858382',
    400: '#5d5a59',
    500: '#34312f',
    600: '#2a2726',
    700: '#1f1d1c',
    800: '#151413',
    900: '#0a0a09',
  },
  headers: {
    100: '#ede1ff',
    200: '#dcc2ff',
    300: '#caa4ff',
    400: '#b985ff',
    500: '#a767ff',
    600: '#8652cc',
    700: '#643e99',
    800: '#432966',
    900: '#211533',
  },
};

import { createTheme } from '@mui/material';

const customTheme = createTheme({
  palette: {
    primary: {
      main: colorPalette.headers[500],
    },
    secondary: {
      main: colorPalette.body[500],
    }
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
