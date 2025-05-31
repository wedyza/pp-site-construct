import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';
import { MediaItem } from './goodsSlice';

export interface Reply {
    id: number;
    body: string;
    comment: number;
    user: number;
}

interface Comment {
    id: number;
    body: string;
    rate: number;
    user: number;
    item: number;
    reply: Reply;
    media?: MediaItem[];
    created_at?: string;
}

interface CommentsState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    comments: [],
    loading: false,
    error: null,
};

export const fetchComments = createAsyncThunk<
    Comment[],
    number,
    { state: RootState }
>('comments/fetchComments', async (itemId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/goods/${itemId}/comments/`);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки комментариев');
    }
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default commentsSlice.reducer;