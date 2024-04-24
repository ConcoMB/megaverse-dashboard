import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="space stars1"></div>
      <div className="space stars2"></div>
      <div className="space stars3"></div>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
