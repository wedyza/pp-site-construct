import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';
import { Good } from './goodsSlice';

interface OrderItems {
    count: number;
    good_item: Good;
}

interface User {
    first_name: string;
    last_name: string;
}

export interface Order {
    id?: number;
    placement_date: string;
    delivery_date?: string;
    payment_total: number;
    address: string;
    status: string;
    items?: OrderItems[];
    user?: User
}

interface OrderState {
    currentOrders: Order[];
    completedOrders: Order[];
    selectedOrder: Order | null;
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    currentOrders: [],
    completedOrders: [],
    selectedOrder: null,
    orders: [],
    loading: false,
    error: null,
};

export const fetchCurrentOrders = createAsyncThunk<Order[], void, { state: RootState }>(
    'orders/fetchCurrentOrders',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.get('/orders/processing/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки текущих заказов');
        }
    }
);

export const fetchCompletedOrders = createAsyncThunk<Order[], void, { state: RootState }>(
    'orders/fetchCompletedOrders',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.get('/orders/ended/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки завершённых заказов');
        }
    }
);

export const fetchOrders = createAsyncThunk<Order[], void, { state: RootState }>(
    'orders/fetchOrders',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.get('/orders/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки заказов');
        }
    }
);

export const fetchOrderById = createAsyncThunk<
    Order,
    number,
    { state: RootState }
>('orders/fetchOrderById', async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        if (token) {
            const response = await axiosInstance.get(`/orders/${id}/`, {
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
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки заказа');
    }
});

export const createOrder = createAsyncThunk<
    Order, 
    { address: string; payment_method: number; delivery_method: number; basket_ids: number[] }, 
    { state: RootState }
>(
    'orders/createOrder',
    async ({ address, payment_method, delivery_method, basket_ids }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            await Promise.all(
                basket_ids.map((id) =>
                    axiosInstance.post(
                        `/me/basket-items/${id}/switch_to_order/`,
                        { enable: 1 },
                        {
                            headers: {
                                Authorization: `Token ${token}`,
                            },
                        }
                    )
                )
            );

            const response = await axiosInstance.post(
                '/orders/',
                {
                    address,
                    payment_method,
                    delivery_method,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при создании заказа');
        }
    }
);

export const changeOrderStatus = createAsyncThunk<
    Order,
    { id: number; status: string },
    { state: RootState }
>(
    'orders/changeOrderStatus',
    async ({ id, status }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axiosInstance.patch(
                `/orders/${id}/change_status/`,
                { status },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка смены статуса заказа');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.currentOrders = [];
            state.completedOrders = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentOrders.fulfilled, (state, action) => {
                state.currentOrders = action.payload;
                state.loading = false;
            })
            .addCase(fetchCurrentOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchCompletedOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompletedOrders.fulfilled, (state, action) => {
                state.completedOrders = action.payload;
                state.loading = false;
            })
            .addCase(fetchCompletedOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.selectedOrder = null;
            })
            .addCase(changeOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(changeOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;