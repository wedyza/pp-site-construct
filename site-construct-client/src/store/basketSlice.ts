import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';
import { Good, toggleWishlist } from './goodsSlice';

export interface BasketItem {
    good_item: number;
    count: number;
    basket: number;
    id: number;
}

interface BasketState {
    items: { item: BasketItem; good: Good | null }[];
    selectedIds: number[];
    loading: boolean;
    error: string | null;
}const loadSelectedIds = (): number[] => {
    try {
        const saved = localStorage.getItem('selectedBasketIds');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('Ошибка чтения selectedBasketIds из localStorage:', e);
        return [];
    }
};

const initialState: BasketState = {
    items: [],
    selectedIds: loadSelectedIds(),
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
    { id: number; count: number },
    { state: RootState }
>(
    'basket/updateBasketItem',
    async ({ id, count }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            const response = await axiosInstance.patch(
                `/me/basket-items/${id}/`,
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
    { id: number; count: number },
    { state: RootState }
>(
    'basket/updateBasketAndRefetch',
    async ({ id, count }, { dispatch, rejectWithValue }) => {
        try {
            await dispatch(updateBasketItem({ id, count })).unwrap();
            await dispatch(fetchBasketWithGoods()).unwrap();
        } catch (err: any) {
            return rejectWithValue('Ошибка при обновлении и загрузке корзины');
        }
    }
);

export const removeBasketItem = createAsyncThunk<
    number,
    number,
    { state: RootState }
>(
    'basket/removeBasketItem',
    async (id, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            await axiosInstance.delete(`/me/basket-items/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return id;
        } catch (err: any) {
            return rejectWithValue('Ошибка удаления товара из корзины');
        }
    }
);

export const removeAndRefetchBasket = createAsyncThunk<
    void,
    number,
    { dispatch: any }
>(
    'basket/removeAndRefetchBasket',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await dispatch(removeBasketItem(id)).unwrap();
            await dispatch(fetchBasketWithGoods()).unwrap();
        } catch (err: any) {
            return rejectWithValue('Ошибка при удалении и обновлении корзины');
        }
    }
);

export const addBasketItem = createAsyncThunk<
    void,
    { good_item: number; count: number },
    { state: RootState }
>(
    'basket/addBasketItem',
    async ({ good_item, count }, { getState, dispatch, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            await axiosInstance.post(
                '/me/basket-items/',
                { good_item, count },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            await dispatch(fetchBasketWithGoods());
        } catch (err: any) {
            return rejectWithValue('Ошибка при добавлении товара в корзину');
        }
    }
);

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setSelectedItems(state, action) {
            state.selectedIds = action.payload;
        },
        clearSelectedItems(state) {
            state.selectedIds = [];
        },
    },
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
            })
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                const { id } = action.payload;

                const index = state.items.findIndex((i) => i.good?.id === id);
                if (index !== -1 && state.items[index].good) {
                    state.items[index].good!.in_wishlist = !state.items[index].good!.in_wishlist;
                }
            })
            .addCase(removeBasketItem.fulfilled, (state, action) => {
                const id = action.payload;
                state.items = state.items.filter((i) => i.item.id !== id);
            })
            .addCase(removeBasketItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(addBasketItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBasketItem.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addBasketItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedItems, clearSelectedItems } = basketSlice.actions;
export default basketSlice.reducer;
