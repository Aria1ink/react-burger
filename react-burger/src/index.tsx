import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import './vendor/normalize.css'
import './index.css';
import App from './components/App/App';
import { store } from "./services/store";

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(
    rootElement
  );
  root.render(
    <Provider store={ store }>
      <App />
    </Provider>
  );
};