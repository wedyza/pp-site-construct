import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import axiosInstance from '../api/axiosInstance';

export interface OrderItem {
    good_item: string;
    count: number;
}

export interface TodayOrder {
    id: number;
    created_at: string;
    items: OrderItem[];
}

interface TodayOrdersState {
    orders: TodayOrder[];
    loading: boolean;
    error: string | null;
    total: number;
}

const initialState: TodayOrdersState = {
    orders: [],
    loading: false,
    error: null,
    total: 0,
};

export const fetchTodayOrders = createAsyncThunk<TodayOrder[], void, { state: RootState }>(
    'analytics/fetchTodayOrders',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            const response = await axiosInstance.get('/me/analytics/today_orders/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data as TodayOrder[];
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка получения заказов');
        }
    }
);

const todayOrdersSlice = createSlice({
    name: 'todayOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodayOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodayOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.total = action.payload.length;
            })
            .addCase(fetchTodayOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default todayOrdersSlice.reducer;