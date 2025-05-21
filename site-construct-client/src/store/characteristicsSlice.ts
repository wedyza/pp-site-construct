import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import axiosInstance from '../api/axiosInstance';

export interface Characteristic {
    id: number;
    title: string;
    value?: string;
}

export interface CharacteristicGroup {
    id: number;
    title: string;
    characteristics: Characteristic[];
}

interface CharacteristicsState {
    data: CharacteristicGroup[];
    loading: boolean;
    error: string | null;
}

const initialState: CharacteristicsState = {
    data: [],
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
                state.data = action.payload;
            })
            .addCase(fetchCharacteristics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default characteristicsSlice.reducer;
