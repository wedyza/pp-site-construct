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
import todayOrdersReducer from './todayOrdersSlice';
import itemsLeftReducer from './itemsLeftSlice';
import documentsReducer from './documentsSlice';

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
        todayOrders: todayOrdersReducer,
        refund: refundReducer,
        itemsLeft: itemsLeftReducer,
        documents: documentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


export const selectIsAnyLoading = (state: RootState) => {
    return (
        state.auth.loading ||
        state.paymentMethods.loading ||
        state.user.loading ||
        state.goods.loading ||
        state.basket.loading ||
        state.wishlist.loading ||
        state.comments.loading ||
        state.users.loading ||
        state.categories.loading ||
        state.orders.loading ||
        state.characteristics.loading ||
        state.notifications.loading ||
        state.reviews.loading ||
        state.analytics.loading ||
        state.sellDynamics.loading ||
        state.todayOrders.loading ||
        state.refund.loading ||
        state.itemsLeft.loading ||
        state.documents.loading
    );
};