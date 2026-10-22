import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// The production build includes a complete HTML snapshot for crawlers and
// visitors without JavaScript. React replaces it with the responsive app;
// hydration isn't used because its device-specific presentation can differ.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
