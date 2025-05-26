import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import paymentMethodsReducer from './paymentMethodsSlice';
import goodsReducer from './goodsSlice';
import basketReducer from './basketSlice';
import wishlistReducer from './wishlistSlice';
import commentsReducer from './commentsSlice';
import usersReducer from './usersSlice';
import categoriesReducer from './categoriesSlice';
import ordersReducer from './orderSlice';
import characteristicsReducer from './characteristicsSlice';
import notificationsReducer from './notificationsSlice';
import reviewsReducer from './reviewsSlice';
import analyticsReducer from './analyticsSlice';
import sellDynamicsReducer from './sellDynamicsSlice';
import refundReducer from './refundSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        paymentMethods: paymentMethodsReducer,
        user: userReducer,
        goods: goodsReducer,
        basket: basketReducer,
        wishlist: wishlistReducer,
        comments: commentsReducer,
        users: usersReducer,
        categories: categoriesReducer,
        orders: ordersReducer,
        characteristics: characteristicsReducer,
        notifications: notificationsReducer,
        reviews: reviewsReducer,
        analytics: analyticsReducer,
        sellDynamics: sellDynamicsReducer,
        refund: refundReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
