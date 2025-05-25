import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    avatar?: string;
}

interface UsersState {
    users: Record<number, User>;
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: {},
    loading: false,
    error: null,
};

export const fetchUserById = createAsyncThunk<User, number>(
    'users/fetchUserById',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}/`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки пользователя');
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.users[action.payload.id] = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default usersSlice.reducer;