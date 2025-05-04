import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

interface AuthState {
    email: string;
    token: string | null;
    step: 'email' | 'otp' | 'authenticated';
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    email: '',
    token: null,
    step: 'email',
    loading: false,
    error: null,
};

export const createOtp = createAsyncThunk(
    'auth/createOtp',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/create-otp', {
                email,
                user_type: 'Покупатель',
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка отправки кода');
        }
    }
);

export const validateOtp = createAsyncThunk(
    'auth/validateOtp',
    async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/validate-otp', { email, otp });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при проверке кода');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
        logout(state) {
            state.token = null;
            state.step = 'email';
            state.email = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOtp.fulfilled, (state) => {
                state.loading = false;
                state.step = 'otp';
            })
            .addCase(createOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(validateOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validateOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.step = 'authenticated';
            })
            .addCase(validateOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setEmail, logout } = authSlice.actions;
export default authSlice.reducer;
