import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';
import { fetchGoodById, Good, MediaItem } from './goodsSlice';
import { Reply } from './commentsSlice';

export interface Comment {
    id: number;
    user: number;
    item: number;
    body: string;
    rate: number;
    good?: Good;
    reply: Reply;
    media?: MediaItem[];
    created_at?: string;
}

interface ReviewsState {
    uncommentedGoods: Good[];
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewsState = {
    uncommentedGoods: [],
    comments: [],
    loading: false,
    error: null,
};

interface UpdateCommentPayload {
    commentId: number;
    body: string;
    rate: number;
}

export const fetchUncommentedGoods = createAsyncThunk<
    Good[],
    void,
    { state: RootState }
>(
    'reviews/fetchUncommentedGoods',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.get('/goods/bought/uncommented/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка получения товаров без отзыва');
        }
    }
);

export const addComment = createAsyncThunk<
    void,
    FormData,
    { state: RootState; dispatch: any }
>(
    'reviews/addComment',
    async (formData, { getState, rejectWithValue, dispatch }) => {
        const token = getState().auth.token;

        try {
            await axiosInstance.post('/comments/', formData, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            await dispatch(fetchComments());
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка отправки отзыва');
        }
    }
);

export const updateComment = createAsyncThunk<
    void,
    UpdateCommentPayload,
    { state: RootState; dispatch: any }
>(
    'reviews/updateComment',
    async ({ commentId, body, rate }, { getState, rejectWithValue, dispatch }) => {
        const token = getState().auth.token;

        try {
            await axiosInstance.patch(`/comments/${commentId}/`, { body, rate }, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            await dispatch(fetchComments());
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при обновлении отзыва');
        }
    }
);

export const fetchComments = createAsyncThunk<
    Comment[],
    void,
    { state: RootState }
>('reviews/fetchComments', async (_, { getState, dispatch, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await axiosInstance.get('/comments/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        const comments = response.data;

        const goodsPromises = comments.map((comment: Comment) =>
            dispatch(fetchGoodById(comment.item)).unwrap().then((good) => ({ ...comment, good }))
        );

        return await Promise.all(goodsPromises);
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки комментариев');
    }
});

export const fetchCommentById = createAsyncThunk<
    Comment,
    number,
    { state: RootState }
>('comments/fetchById', async (goodId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    try {
        const response = await axiosInstance.get(`/goods/${goodId}/my_comment/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка при загрузке комментария');
    }
});

export const addReply = createAsyncThunk<
    void,
    { comment: number; body: string },
    { state: RootState }
>(
    'reviews/addReply',
    async ({ comment, body }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            await axiosInstance.post(
                '/comments-replies/',
                { comment, body },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка отправки ответа');
        }
    }
);

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUncommentedGoods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUncommentedGoods.fulfilled, (state, action) => {
                state.loading = false;
                state.uncommentedGoods = action.payload;
            })
            .addCase(fetchUncommentedGoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action: any) => {
                state.loading = false;
                state.uncommentedGoods = state.uncommentedGoods.filter(
                    (good) => good.id !== Number(action.meta.arg.get('item'))
                );
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCommentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommentById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchCommentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default reviewsSlice.reducer;
