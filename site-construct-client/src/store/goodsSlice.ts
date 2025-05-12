import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';
import { addBasketItem } from './basketSlice';

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
    in_wishlist: boolean;
    basket_count?: number;
    basket_id?: number;
}

interface GoodsState {
    items: Good[];
    selectedItem: Good | null;
    loading: boolean;
    error: string | null;
}

const initialState: GoodsState = {
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
};

export const fetchGoods = createAsyncThunk<
    Good[],
    void,
    { state: RootState }
>('goods/fetchGoods', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await axiosInstance.get('/goods/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data.results;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки товаров');
    }
});

export const fetchGoodById = createAsyncThunk<
    Good,
    number,
    { state: RootState }
>('goods/fetchGoodById', async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await axiosInstance.get(`/goods/${id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки товара');
    }
});

export const toggleWishlist = createAsyncThunk<
    { id: number },
    number,
    { state: RootState }
>('goods/toggleWishlist', async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        await axiosInstance.post(`/goods/${id}/switch_wishlist/`, {}, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return { id };
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка переключения вишлиста');
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
            })
            .addCase(fetchGoodById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoodById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedItem = action.payload;
            })
            .addCase(fetchGoodById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.selectedItem = null;
            })
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                const { id } = action.payload;

                const index = state.items.findIndex((item) => item.id === id);
                if (index !== -1) {
                    state.items[index].in_wishlist = !state.items[index].in_wishlist;
                }

                if (state.selectedItem?.id === id) {
                    state.selectedItem.in_wishlist = !state.selectedItem.in_wishlist;
                }
            });
    },
});

export default goodsSlice.reducer;
