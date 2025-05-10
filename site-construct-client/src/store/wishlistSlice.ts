import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';
import { Good, toggleWishlist } from './goodsSlice';

interface WishlistState {
    items: Good[];
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchWishlist = createAsyncThunk<
    Good[],
    void,
    { state: RootState }
>('wishlist/fetchWishlist', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await axiosInstance.get('/me/wishlist/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        const updatedGoods = response.data.map((good: Good) => ({
            ...good,
            in_wishlist: true,
        }));
        return updatedGoods;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки избранного');
    }
});

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                const toggledId = action.payload.id;

                const index = state.items.findIndex((item) => item.id === toggledId);
                if (index !== -1) {
                    state.items.splice(index, 1);
                } else {
                }
            });
    },
});

export default wishlistSlice.reducer;
