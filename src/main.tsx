import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { FitValidatorProvider } from './features/fit-validator/context/FitValidatorContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FitValidatorProvider>
        <App />
      </FitValidatorProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
