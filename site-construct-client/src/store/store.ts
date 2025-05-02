import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import paymentMethodsReducer from './paymentMethodsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        paymentMethods: paymentMethodsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
