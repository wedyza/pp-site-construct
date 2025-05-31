import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from './store';

export type DocumentType = 'REFUND_POLICY' | 'OTHER' | 'OFFER' | 'PLATFORM_RULES' | 'USER_REGLAMENT' | 'PLATFORM_POLICY';

export interface Document {
    source: string;
    id: number;
    created_at: string;
    type: DocumentType;
    title: string;
}

interface DocumentsState {
    items: Document[];
    loading: boolean;
    uploadLoading: boolean;
    error: string | null;
}

const initialState: DocumentsState = {
    items: [],
    loading: false,
    uploadLoading: false,
    error: null,
};

export const fetchDocuments = createAsyncThunk<
    Document[],
    void,
    { state: RootState }
>('documents/fetch', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    try {
        const response = await axiosInstance.get('/me/documents/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки документов');
    }
});

export const uploadDocument = createAsyncThunk<
    Document,
    { file: File; type: DocumentType },
    { state: RootState }
>('documents/upload', async ({ file, type }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    const formData = new FormData();
    formData.append('source', file);
    formData.append('type', type);

    try {
        const response = await axiosInstance.post('/me/documents/', formData, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки документа');
    }
});

export const deleteDocument = createAsyncThunk<
    number,
    number,
    { state: RootState }
>('documents/delete', async (documentId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    try {
        await axiosInstance.delete(`/me/documents/${documentId}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return documentId;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка удаления документа');
    }
});

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocuments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDocuments.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchDocuments.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(uploadDocument.pending, (state) => {
                state.uploadLoading = true;
                state.error = null;
            })
            .addCase(uploadDocument.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.uploadLoading = false;
            })
            .addCase(uploadDocument.rejected, (state, action) => {
                state.error = action.payload as string;
                state.uploadLoading = false;
            })
            .addCase(deleteDocument.fulfilled, (state, action) => {
                state.items = state.items.filter(doc => doc.id !== action.payload);
            })
            .addCase(deleteDocument.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default documentsSlice.reducer;