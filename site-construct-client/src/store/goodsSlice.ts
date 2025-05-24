import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';
import { addBasketItem, removeBasketItem } from './basketSlice';
import { Characteristic, CharacteristicGroup } from './characteristicsSlice';

export interface Rating {
    rate__avg: number;
    rate__count: number;
}

export interface MediaItem {
    id: number;
    source: string;
}

export interface Good {
    id: number;
    name: string;
    description: string;
    price: number;
    discount?: number;
    visible?: boolean;
    apply?: boolean;
    characteristics?: CharacteristicGroup[] | undefined;
    about?: Characteristic[] | null;
    category?: number;
    market: number;
    in_wishlist: boolean;
    basket_count?: number;
    basket_id?: number;
    rate?: Rating;
    media?: MediaItem[];
}

interface GoodsState {
    items: Good[];
    selectedItem: Good | null;
    boughtItems: Good[];
    loading: boolean;
    error: string | null;
}

const initialState: GoodsState = {
    items: [],
    selectedItem: null,
    boughtItems: [],
    loading: false,
    error: null,
};

export const fetchGoods = createAsyncThunk<
    Good[],
    { search?: string } | undefined,
    { state: RootState }
>('goods/fetchGoods', async ({ search } = {}, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const config = {
            headers: token ? { Authorization: `Token ${token}` } : {},
            params: search ? { search } : {},
        };

        const response = await axiosInstance.get('/goods/', config);
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
        if (token) {
            const response = await axiosInstance.get(`/goods/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } else {
            const response = await axiosInstance.get(`/goods/${id}/`);
            return response.data;
        }
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки товара');
    }
});

export const toggleWishlist = createAsyncThunk<
    { id: number },
    number,
    { state: RootState }
>('goods/toggleWishlist', async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    const good = state.goods.items.find((item) => item.id === id);
    if (!good) {
        return rejectWithValue('Товар не найден');
    }
    const enable = !good.in_wishlist;
    try {
        await axiosInstance.post(`/goods/${id}/switch_wishlist/`, { enable }, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return { id };
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка переключения вишлиста');
    }
});

export const createGood = createAsyncThunk<
    Good,
    { name: string; description: string; price: number },
    { state: RootState }
>('goods/createGood', async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await axiosInstance.post('/goods/', data, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка создания товара');
    }
});

export const updateGood = createAsyncThunk<
    Good,
    { id: number; name: string; description: string; price: number; visible: boolean },
    { state: RootState }
>('goods/updateGood', async ({ id, name, description, price, visible }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await axiosInstance.patch(`/goods/${id}/`, {
            name,
            description,
            price,
            visible,
        }, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка обновления товара');
    }
});

export const createGoodForm = createAsyncThunk<Good, FormData, { state: RootState }>(
    'goods/createGoodForm',
    async (formData, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.post('/goods/', formData, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка создания товара');
        }
    }
);

export const updateGoodForm = createAsyncThunk<
    Good,
    { id: number; formData: FormData },
    { state: RootState }
>(
    'goods/updateGoodForm',
    async ({ id, formData }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.patch(`/goods/${id}/`, formData, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка обновления товара');
        }
    }
);

export const deleteGood = createAsyncThunk<
    number,
    number,
    { state: RootState }
>(
    'goods/deleteGood',
    async (id, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            await axiosInstance.delete(`/goods/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка удаления товара');
        }
    }
);

export const fetchBoughtGoods = createAsyncThunk<
    Good[],
    void,
    { state: RootState }
>('goods/fetchBoughtGoods', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await axiosInstance.get('/goods/bought/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки купленных товаров');
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
            })
            .addCase(removeBasketItem.fulfilled, (state, action) => {
                if (state.selectedItem) {
                    state.selectedItem = {
                        ...state.selectedItem,
                        basket_count: 0,
                    };
                }              
            })
            .addCase(createGood.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGood.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createGood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateGood.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGood.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedItem = action.payload;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateGood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createGoodForm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGoodForm.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createGoodForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateGoodForm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGoodForm.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedItem = action.payload;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateGoodForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteGood.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
                if (state.selectedItem?.id === action.payload) {
                    state.selectedItem = null;
                }
            })
            .addCase(deleteGood.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(fetchBoughtGoods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoughtGoods.fulfilled, (state, action) => {
                state.loading = false;
                state.boughtItems = action.payload;
            })
            .addCase(fetchBoughtGoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default goodsSlice.reducer;
