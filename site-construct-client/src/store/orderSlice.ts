import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';
import { Good } from './goodsSlice';

export interface Order {
    id?: number;
    placement_date: string;
    delivery_date?: string;
    price: number;
    address: string;
    status: string;
    goods?: Good[];
}

interface OrderState {
    currentOrders: Order[];
    completedOrders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    currentOrders: [],
    completedOrders: [],
    loading: false,
    error: null,
};

export const fetchCurrentOrders = createAsyncThunk<Order[], void, { state: RootState }>(
    'orders/fetchCurrentOrders',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.get('/orders/processing/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки текущих заказов');
        }
    }
);

export const fetchCompletedOrders = createAsyncThunk<Order[], void, { state: RootState }>(
    'orders/fetchCompletedOrders',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.get('/orders/ended/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки завершённых заказов');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.currentOrders = [];
            state.completedOrders = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentOrders.fulfilled, (state, action) => {
                state.currentOrders = action.payload;
                state.loading = false;
            })
            .addCase(fetchCurrentOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchCompletedOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompletedOrders.fulfilled, (state, action) => {
                state.completedOrders = action.payload;
                state.loading = false;
            })
            .addCase(fetchCompletedOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;