import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import categoriesReducer from './categoriesSlice';
import characteristicsReducer from './characteristicsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        characteristics: characteristicsReducer,
        categories: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
