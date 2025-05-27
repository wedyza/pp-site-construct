import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    avatar?: string;
    email?: string;
    gender?: 'MALE' | 'FEMALE';
    user_type?: 'Администратор' | 'Продавец' | 'Покупатель';
    is_active: boolean;
}

interface UsersState {
    users: Record<number, User>;
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: {},
    selectedUser: null,
    loading: false,
    error: null,
};

export const fetchAllUsers = createAsyncThunk<User[]>(
    'users/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/users/');
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки пользователей');
        }
    }
);

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

export const deleteUser = createAsyncThunk<number, number, { state: RootState }>(
    'users/deleteUser',
    async (userId, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            await axiosInstance.delete(`/users/${userId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return userId;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка удаления пользователя');
        }
    }
);

export const toggleUserActiveStatus = createAsyncThunk<User, number, { state: RootState }>(
    'users/toggleUserActiveStatus',
    async (userId, { getState, getState: state, rejectWithValue }) => {
        const token = state().auth.token;
        const user = state().users.users[userId];
        if (!user) return rejectWithValue('Пользователь не найден');

        try {
            const response = await axiosInstance.patch(
                `/users/${userId}/`,
                { is_active: user.is_active ? 0 : 1 },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка смены статуса');
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
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedUser = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = {};
                action.payload.forEach(user => {
                    state.users[user.id] = user;
                });
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                delete state.users[action.payload];
                if (state.selectedUser?.id === action.payload) {
                    state.selectedUser = null;
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(toggleUserActiveStatus.fulfilled, (state, action) => {
                state.users[action.payload.id] = action.payload;
                if (state.selectedUser?.id === action.payload.id) {
                    state.selectedUser = action.payload;
                }
            })
            .addCase(toggleUserActiveStatus.rejected, (state, action) => {
                state.error = action.payload as string;
            });;
    },
});

export default usersSlice.reducer;