import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

interface UserState {
    firstName: string;
    lastName: string;
    email: string;
    gender: 'MALE' | 'FEMALE' | undefined;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    firstName: '',
    lastName: '',
    email: '',
    gender: undefined,
    loading: false,
    error: null,
};

export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async (_, { rejectWithValue, getState }: any) => {
        const token = getState().auth.token;
        try {
            const res = await axiosInstance.get('/users/me/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка получения пользователя');
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    'user/updateUserInfo',
    async (
        updatedData: {
            first_name: string;
            last_name: string;
            email: string;
            gender: 'MALE' | 'FEMALE';
        },
        { rejectWithValue, getState }: any
    ) => {
        const token = getState().auth.token;
        try {
            const res = await axiosInstance.patch('/users/me/', updatedData, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при обновлении данных');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                const { first_name, last_name, email, sex } = action.payload;
                state.firstName = first_name;
                state.lastName = last_name;
                state.email = email;
                state.gender = sex;
                state.loading = false;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                const { first_name, last_name, email, sex } = action.payload;
                state.firstName = first_name;
                state.lastName = last_name;
                state.email = email;
                state.gender = sex;
                state.loading = false;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
