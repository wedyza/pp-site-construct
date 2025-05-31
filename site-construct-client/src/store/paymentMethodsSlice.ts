import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';

export interface PaymentMethod {
    id?: number;
    card_body: string;
    card_expire_date: string;
    card_cvv_code?: string;
}

interface PaymentState {
    items: PaymentMethod[];
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchPaymentMethods = createAsyncThunk<
    PaymentMethod[],
    void,
    { state: RootState }
>('paymentMethods/fetch', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    try {
        const response = await axiosInstance.get('/payment-methods/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки');
    }
});

export const addPaymentMethod = createAsyncThunk<
    void,
    PaymentMethod,
    { state: RootState }
>('paymentMethods/add', async (payload, { getState, dispatch, rejectWithValue }) => {
    const token = getState().auth.token;

    try {
        await axiosInstance.post('/payment-methods/', payload, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        dispatch(fetchPaymentMethods());
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка добавления');
    }
});

const paymentMethodsSlice = createSlice({
    name: 'paymentMethods',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentMethods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchPaymentMethods.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(addPaymentMethod.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default paymentMethodsSlice.reducer;
