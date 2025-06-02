import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import axiosInstance from '../api/axiosInstance';

export interface Characteristic {
    id: number;
    title: string;
    value?: string;
    category?: number;
}

export interface CharacteristicGroup {
    id: number;
    title: string;
    characteristics: Characteristic[];
}

interface CharacteristicsState {
    data: CharacteristicGroup[];
    about: Characteristic | null;
    loading: boolean;
    error: string | null;
}

const initialState: CharacteristicsState = {
    data: [],
    about: null,
    loading: false,
    error: null,
};

export const fetchCharacteristics = createAsyncThunk<
    CharacteristicGroup[],
    number,
    { state: RootState }
>('characteristics/fetchByCategory', async (categoryId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/good-categories/${categoryId}/characteristics/`);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки характеристик');
    }
});

export const applyCharacteristicsToGood = createAsyncThunk<
    void,
    { goodId: number; characteristics: { characteristic: number; body: string }[] },
    { state: RootState }
>(
    'characteristics/applyToGood',
    async ({ goodId, characteristics }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            await axiosInstance.post(
                `/goods/${goodId}/apply_characteristic/`,
                { characteristics },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при применении характеристик');
        }
    }
);

export const upsertCharacteristicGroup = createAsyncThunk<
    CharacteristicGroup,
    { id?: number; title: string; category: number },
    { state: RootState }
>('characteristics/upsertGroup', async (payload, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    try {
        const method = payload.id ? 'patch' : 'post';
        const url = payload.id
            ? `/characteristics-categories/${payload.id}/`
            : '/characteristics-categories/';

        const data = method === 'patch'
            ? { id: payload.id, title: payload.title }
            : payload;

        const response = await axiosInstance[method](url, data, {
            headers: { Authorization: `Token ${token}` },
        });

        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка сохранения группы');
    }
});

export const upsertCharacteristic = createAsyncThunk<
    Characteristic,
    { id?: number; title: string; category: number },
    { state: RootState }
>('characteristics/upsert', async (payload, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    try {
        const method = payload.id ? 'patch' : 'post';
        const url = payload.id
            ? `/characteristics/${payload.id}/`
            : '/characteristics/';

        const response = await axiosInstance[method](url, payload, {
            headers: { Authorization: `Token ${token}` },
        });

        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка сохранения характеристики');
    }
});

export const deleteCharacteristic = createAsyncThunk<
    { id: number; categoryId: number },
    { id: number; categoryId: number },
    { state: RootState }
>('characteristics/delete', async ({ id, categoryId }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    try {
        await axiosInstance.delete(`/characteristics/${id}/`, {
            headers: { Authorization: `Token ${token}` },
        });

        return { id, categoryId };
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка удаления характеристики');
    }
});


const characteristicsSlice = createSlice({
    name: 'characteristics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacteristics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCharacteristics.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                let about: Characteristic | null = null;

                const cleanedGroups = action.payload.map((group) => {
                    const characteristics = group.characteristics.filter((char) => {
                        if (char.title === 'О товаре') {
                            about = char;
                            return false;
                        }
                        return true;
                    });

                    return { ...group, characteristics };
                });

                state.about = about;
                state.data = cleanedGroups;
            })
            .addCase(fetchCharacteristics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(upsertCharacteristicGroup.fulfilled, (state, action) => {
                const existingIndex = state.data.findIndex(group => group.id === action.payload.id);
                if (existingIndex !== -1) {
                    state.data[existingIndex] = { ...state.data[existingIndex], ...action.payload };
                } else {
                    state.data.push({ ...action.payload, characteristics: [] });
                }
            })
            .addCase(upsertCharacteristic.fulfilled, (state, action) => {
                const group = state.data.find(g => g.id === action.payload.category);
                if (group) {
                    const index = group.characteristics.findIndex(c => c.id === action.payload.id);
                    if (index !== -1) {
                        group.characteristics[index] = action.payload;
                    } else {
                        group.characteristics.push(action.payload);
                    }
                }
            })
            .addCase(deleteCharacteristic.fulfilled, (state, action) => {
                const group = state.data.find(g => g.id === action.payload.categoryId);
                if (group) {
                    group.characteristics = group.characteristics.filter(c => c.id !== action.payload.id);
                }
            });
    },
});

export default characteristicsSlice.reducer;
