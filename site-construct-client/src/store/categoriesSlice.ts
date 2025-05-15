import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export interface Category {
    id: number;
    title: string;
    description: string;
    parent: number | null;
}

interface NestedCategories {
    [topCategoryTitle: string]: {
        data: Category;
        subcategories: {
            [subCategoryTitle: string]: {
                data: Category;
                subcategories: Category[];
            };
        };
    };
}

interface CategoriesState {
    raw: Category[];
    structured: NestedCategories;
    loading: boolean;
    error: string | null;
    selected: Category | null;
}

const initialState: CategoriesState = {
    raw: [],
    structured: {},
    loading: false,
    error: null,
    selected: null,
};

export const fetchCategories = createAsyncThunk<Category[]>(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/good-categories/');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при загрузке категорий');
        }
    }
);

function buildStructuredCategories(categories: Category[]): NestedCategories {
    const mapById = new Map<number, Category>();
    const result: NestedCategories = {};

    categories.forEach(cat => mapById.set(cat.id, cat));

    categories.forEach(cat => {
        if (cat.parent === null) {
            result[cat.title] = { data: cat, subcategories: {} };
        }
    });

    categories.forEach(cat => {
        if (cat.parent !== null) {
            const parent = mapById.get(cat.parent);
            if (!parent) return;

            const grandparent = parent.parent !== null ? mapById.get(parent.parent) : null;

            if (grandparent) {
                const top = result[grandparent.title];
                if (!top) return;

                const parentSubcat = top.subcategories[parent.title];
                if (!parentSubcat) return;

                parentSubcat.subcategories.push(cat);
            } else {
                const top = result[parent.title];
                if (!top) return;

                if (!top.subcategories[cat.title]) {
                    top.subcategories[cat.title] = {
                        data: cat,
                        subcategories: [],
                    };
                }
            }
        }
    });

    return result;
}

export const fetchCategoryById = createAsyncThunk<Category, number>(
    'categories/fetchCategoryById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/good-categories/${id}/`);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при загрузке категории');
        }
    }
);

export const getCategoryPath = (category: Category | null, allCategories: Category[]): string[] => {
    if (!category) return [];

    const map = new Map<number, Category>();
    allCategories.forEach((c) => map.set(c.id, c));

    const path: string[] = [];
    let current: Category | undefined = category;

    while (current) {
        path.unshift(current.title);
        current = current.parent !== null ? map.get(current.parent) : undefined;
    }

    return path;
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.raw = action.payload;
                state.structured = buildStructuredCategories(action.payload);
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selected = null;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selected = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.selected = null;
            });
    },
});

export default categoriesSlice.reducer;