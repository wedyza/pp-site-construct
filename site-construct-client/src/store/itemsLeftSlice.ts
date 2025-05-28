import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import axiosInstance from '../api/axiosInstance';

export interface ProductItem {
    name: string;
    warehouse_count: number;
}

export interface ItemLeft {
    item: ProductItem;
    sell_count: number;
    status: string;
}

interface ItemsLeftState {
    items: ItemLeft[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemsLeftState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchItemsLeft = createAsyncThunk<ItemLeft[], void, { state: RootState }>(
    'analytics/fetchItemsLeft',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            const response = await axiosInstance.get('/me/analytics/items_left/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data as ItemLeft[];
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка получения остатков товаров');
        }
    }
);

const itemsLeftSlice = createSlice({
    name: 'itemsLeft',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemsLeft.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemsLeft.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItemsLeft.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default itemsLeftSlice.reducer;