import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import axiosInstance from '../api/axiosInstance';

export interface AnalyticsResponse {
    total_payed: {
        amount__sum: number | null;
    };
    total_freezed: {
        amount__sum: number;
    };
    orders_per_this_month: {
        total: number;
        newest: number;
    };
    refunds_per_this_month: {
        total: number;
        newset: number;
    };
    average_rating: {
        rate__avg: number;
        rate__count: number;
    };
}

export interface AnalyticsState {
    data: AnalyticsResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: AnalyticsState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchAnalytics = createAsyncThunk<AnalyticsResponse, void, { state: RootState }>(
    'analytics/fetchAnalytics',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            const response = await axiosInstance.get('/me/analytics/', {
                headers: {
                Authorization: `Token ${token}`,
                },
            });
            return response.data as AnalyticsResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка получения аналитики');
        }
    }
);

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default analyticsSlice.reducer;
