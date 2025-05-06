import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import paymentMethodsReducer from './paymentMethodsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        paymentMethods: paymentMethodsReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
