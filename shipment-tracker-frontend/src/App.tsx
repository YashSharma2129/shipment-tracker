import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { theme } from './theme';
import MainLayout from './components/layout/MainLayout';
import TrackingInputPage from './components/pages/TrackingInputPage';
import TrackingResultPage from './components/pages/TrackingResultPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles 
        styles={{
          '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },
          body: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
        }}
      />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<TrackingInputPage />} />
            <Route path="/track/:id" element={<TrackingResultPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
