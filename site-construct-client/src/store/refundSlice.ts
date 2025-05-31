import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import axiosInstance from '../api/axiosInstance';
import { Good } from './goodsSlice';
import { Order } from './orderSlice';
import { addComment } from './reviewsSlice';

export interface Refund {
    id: number;
    created_at: string;
    body: string;
    applied: boolean;
    user: number;
    item: Good;
    order: Order;
}

export interface CreateRefundPayload {
    item: number;
    order: number;
    body: string;
}

interface RefundState {
    refunds: Refund[];
    loading: boolean;
    error: string | null;
}

const initialState: RefundState = {
    refunds: [],
    loading: false,
    error: null,
};

export const fetchRefunds = createAsyncThunk<Refund[], void, { state: RootState }>(
    'refunds/fetchRefunds',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.get('/refunds/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки возвратов');
        }
    }
);

export const createRefund = createAsyncThunk<Refund, CreateRefundPayload, { state: RootState }>(
    'refunds/createRefund',
    async (payload, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.post('/refunds/', payload, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка создания возврата');
        }
    }
);

const refundSlice = createSlice({
    name: 'refunds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRefunds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRefunds.fulfilled, (state, action) => {
                state.loading = false;
                state.refunds = action.payload;
            })
            .addCase(fetchRefunds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createRefund.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRefund.fulfilled, (state, action) => {
                state.loading = false;
                state.refunds.push(action.payload);
            })
            .addCase(createRefund.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addComment.fulfilled, (state, action: any) => {
                state.loading = false;
                const itemId = Number(action.meta.arg.get('item'));
                state.refunds = state.refunds.map((refund) =>
                    refund.id === itemId ? { ...refund, able_to_comment: false } : refund
                );
            });
    },
});

export default refundSlice.reducer;