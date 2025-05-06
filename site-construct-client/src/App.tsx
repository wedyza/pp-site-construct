import React from 'react';
import MainPage from './pages/mainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import OrdersPage from './pages/ordersPage/OrdersPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import ProductPage from './pages/productPage/ProductPage';
import FavouritesPage from './pages/favouritesPage/FavouritesPage';
import BasketPage from './pages/basketPage/BasketPage';
import LoginPage from './pages/loginPage/LoginPage';
import ReviewsPage from './pages/reviewsPage/ReviewsPage';
import CategoryPage from './pages/categoryPage/CategoryPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/category" element={<CategoryPage />} />

      <Route element={<ProtectedRoute onlyGuest />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/basket" element={<BasketPage />} />
      </Route>
    </Routes>
  );
}

export default App;
