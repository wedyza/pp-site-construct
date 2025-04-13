import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.scss'
import './styles/common.scss'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import HeaderCategories from './components/headerCategories/HeaderCategories';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <Provider store={store}>
      <BrowserRouter>
          <div className="App">
              <Header />
              <HeaderCategories />
              <App />
          </div>
      </BrowserRouter>
  //</Provider>
);