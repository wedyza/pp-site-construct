import React from 'react';
import MainPage from './pages/mainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import OrdersPage from './pages/ordersPage/OrdersPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  );
}

export default App;
