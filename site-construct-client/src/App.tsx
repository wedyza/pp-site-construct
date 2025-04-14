import React from 'react';
import MainPage from './pages/mainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import OrdersPage from './pages/ordersPage/OrdersPage';
import ProfilePage from './pages/profilePage/ProfilePage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
