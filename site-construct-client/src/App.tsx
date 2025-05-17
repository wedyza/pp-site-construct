import React, { useEffect } from 'react';
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
import SellerMainPage from './pages/sellerMainPage/SellerMainPage';
import SellerOrdersPage from './pages/sellerOrdersPage/SellerOrdersPage';
import SellerOrderPage from './pages/sellerOrderPage/SellerOrderPage';
import SellerFinancePage from './pages/sellerFinancePage/SellerFinancePage';
import SellerGoodsPage from './pages/sellerGoodsPage/SellerGoodsPage';
import SellerGoodPage from './pages/sellerGoodPage/SellerGoodPage';
import MakeOrderPage from './pages/makeOrderPage/MakeOrderPage';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchUserInfo } from './store/userSlice';
import MainRouter from './components/MainRouter';

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo());
      console.log(1);
    }
  }, [token, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainRouter />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/reviews/:id" element={<ReviewsPage />} />
      <Route path="/category/:id" element={<CategoryPage />} />

      <Route element={<ProtectedRoute allowedRoles={['Продавец']} />}>
          <Route path="/seller/goods" element={<SellerGoodsPage />} />
          <Route path="/seller/good" element={<SellerGoodPage />} />
          <Route path="/seller/orders" element={<SellerOrdersPage />} />
          <Route path="/seller/order" element={<SellerOrderPage />} />
          <Route path="/seller/finance" element={<SellerFinancePage />} />
      </Route>

      <Route element={<ProtectedRoute onlyGuest />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/make-order" element={<MakeOrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
