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
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
