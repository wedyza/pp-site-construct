import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import axiosInstance from '../api/axiosInstance';

export interface SellDynamicsPoint {
    created_at__date: string;
    count: number;
}

export interface SellDynamicsResponse {
    order_counts: SellDynamicsPoint[];
    order_profits: SellDynamicsPoint[];
}

interface SellDynamicsState {
    data: SellDynamicsResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: SellDynamicsState = {
    data: null,
    loading: false,
    error: null,
};


export const fetchSellDynamics = createAsyncThunk<SellDynamicsResponse, void, { state: RootState }>(
    'analytics/fetchSellDynamics',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            const response = await axiosInstance.get('/me/analytics/sell_dynamics/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data as SellDynamicsResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка получения динамики продаж');
        }
    }
);

const sellDynamicsSlice = createSlice({
    name: 'sellDynamics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellDynamics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSellDynamics.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSellDynamics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default sellDynamicsSlice.reducer;