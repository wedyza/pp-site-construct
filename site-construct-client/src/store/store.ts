import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import paymentMethodsReducer from './paymentMethodsSlice';
import goodsReducer from './goodsSlice';
import basketReducer from './basketSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        paymentMethods: paymentMethodsReducer,
        user: userReducer,
        goods: goodsReducer,
        basket: basketReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
