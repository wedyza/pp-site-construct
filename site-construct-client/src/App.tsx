import React from 'react';
import MainPage from './pages/mainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import OrdersPage from './pages/ordersPage/OrdersPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import ProductPage from './pages/productPage/ProductPage';
import FavouritesPage from './pages/favouritesPage/FavouritesPage';
import BasketPage from './pages/basketPage/BasketPage';
import LoginPage from './pages/loginPage/LoginPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
