import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { injectAccessibilityStyles } from '@swalha1999/a11y-react';

// Inject the global accessibility styles
injectAccessibilityStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
