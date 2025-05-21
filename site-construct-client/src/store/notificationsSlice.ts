import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';

export interface Notification {
    id: number;
    body: string;
    type: string;
    created_at: string;
    readed: boolean;
}

interface NotificationsState {
    items: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchNotifications = createAsyncThunk<
    Notification[],
    void,
    { state: RootState }
>('notifications/fetchNotifications', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await axiosInstance.get('/notifications/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки уведомлений');
    }
});

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default notificationsSlice.reducer;
