import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.less'
import { Toaster } from 'react-hot-toast';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Toaster toastOptions={{
        className: '',
        style: {
          border: '1px solid black',
          borderRadius:"10px",
          padding: '10px',
          color: 'rgba(255, 255, 255, 0.87)',
          backgroundColor: "rgb(36, 36, 36)"
        },
      }} />
      <App />
    </React.StrictMode>,
  );
}
