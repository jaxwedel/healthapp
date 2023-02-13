import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#7424DA",
    },
    secondary: {
      main: "#FAF6FF",
    },
  },
  typography: {
    h1: {
      fontSize: "1.5em",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.2em",
      fontWeight: "600",
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
