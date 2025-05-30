import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';
import categoriesReducer from './categoriesSlice';
import characteristicsReducer from './characteristicsSlice';
import documentsReducer from './documentsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        users: usersReducer,
        characteristics: characteristicsReducer,
        categories: categoriesReducer,
        documents: documentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

export const selectIsAnyLoading = (state: RootState) => {
    return (
        state.auth.loading ||
        state.user.loading ||
        state.users.loading ||
        state.categories.loading ||
        state.characteristics.loading ||
        state.documents.loading
    );
};