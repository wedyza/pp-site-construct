import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';
import { Good } from './goodsSlice';

export interface BasketItem {
    good_item: number;
    count: number;
    basket: number;
    id: number;
}

interface BasketState {
    items: { item: BasketItem; good: Good | null }[];
    loading: boolean;
    error: string | null;
}

const initialState: BasketState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchBasketItems = createAsyncThunk<
    BasketItem[],
    void,
    { state: RootState }
>(
    'basket/fetchBasketItems',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            const response = await axiosInstance.get('/me/basket-items/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки корзины');
        }
    }
);

export const fetchBasketWithGoods = createAsyncThunk<
    { item: BasketItem; good: Good | null }[],
    void,
    { state: RootState }
>(
    'basket/fetchBasketWithGoods',
    async (_, { dispatch, getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            const items: BasketItem[] = await dispatch(fetchBasketItems()).unwrap();
            const goodPromises = items.map(async (item) => {
                const goodResp = await axiosInstance.get(`/goods/${item.good_item}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                const good = {
                    ...goodResp.data,
                    id: item.id,
                };

                return {
                    item,
                    good,
                };
            });
            return await Promise.all(goodPromises);
        } catch (err: any) {
            return rejectWithValue('Ошибка при загрузке товаров корзины');
        }
    }
);

export const updateBasketItem = createAsyncThunk<
    BasketItem,
    { good_item: number; count: number },
    { state: RootState }
>(
    'basket/updateBasketItem',
    async ({ good_item, count }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            const response = await axiosInstance.patch(
                `/me/basket-items/${good_item}/`,
                { count },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue('Ошибка обновления количества');
        }
    }
);

export const updateBasketAndRefetch = createAsyncThunk<
    void,
    { good_item: number; count: number },
    { state: RootState }
>(
    'basket/updateBasketAndRefetch',
    async ({ good_item, count }, { dispatch, rejectWithValue }) => {
        try {
            await dispatch(updateBasketItem({ good_item, count })).unwrap();
            await dispatch(fetchBasketWithGoods()).unwrap();
        } catch (err: any) {
            return rejectWithValue('Ошибка при обновлении и загрузке корзины');
        }
    }
);


const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBasketWithGoods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBasketWithGoods.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBasketWithGoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateBasketItem.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                const index = state.items.findIndex(i => i.item.good_item === updatedItem.good_item);
                if (index !== -1) {
                    state.items[index].item.count = updatedItem.count;
                }
            })
            .addCase(updateBasketItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBasketItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default basketSlice.reducer;
