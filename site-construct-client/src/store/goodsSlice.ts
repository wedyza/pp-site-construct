import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export interface Good {
    id: number;
    name: string;
    description: string;
    price: number;
    discount?: number;
    visible?: boolean;
    apply?: boolean;
    characteristics?: string;
    category?: number;
    market: number;
}

interface GoodsState {
    items: Good[];
    loading: boolean;
    error: string | null;
}

const initialState: GoodsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchGoods = createAsyncThunk('goods/fetchGoods', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/goods/');
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки товаров');
    }
});

const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchGoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default goodsSlice.reducer;
