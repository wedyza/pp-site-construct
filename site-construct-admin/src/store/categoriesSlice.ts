import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { CharacteristicGroup } from './characteristicsSlice';

export interface Good {
    id: number;
    name: string;
    description: string;
    price: number;
    discount?: number;
    visible?: boolean;
    apply?: boolean;
    characteristics?: CharacteristicGroup[] | undefined;
    category?: number;
    market: number;
    in_wishlist: boolean;
    basket_count?: number;
    basket_id?: number;
}

interface CategoryInput {
    title: string;
    description?: string;
    parent?: number | null;
}

export interface Category {
    id: number;
    title: string;
    description?: string;
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
    categoryGoods: {
        [categoryId: number]: {
            items: Good[];
            count: number;
            loading: boolean;
            error: string | null;
        };
    };
}

const initialState: CategoriesState = {
    raw: [],
    structured: {},
    loading: false,
    error: null,
    selected: null,
    categoryGoods: {},
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
    categories.sort((a, b) => a.id - b.id);
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

export const fetchGoodsByCategory = createAsyncThunk<
    { categoryId: number; results: Good[]; count: number },
    number
>(
    'categories/fetchGoodsByCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/good-categories/${categoryId}/items/`);
            return {
                categoryId,
                results: res.data.results,
                count: res.data.count,
            };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка загрузки товаров категории');
        }
    }
);

export const createCategory = createAsyncThunk<Category, CategoryInput>(
    'categories/createCategory',
    async (data, { rejectWithValue, getState }) => {
        try {
            const state: any = getState();
            const token = state.auth?.token;

            const res = await axiosInstance.post('/good-categories/', data, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при создании категории');
        }
    }
);

export const updateCategory = createAsyncThunk<Category, { id: number; title: string }>(
    'categories/updateCategory',
    async ({ id, title }, { rejectWithValue, getState }) => {
        try {
            const state: any = getState();
            const token = state.auth?.token;
            console.log(title);

            const res = await axiosInstance.patch(`/good-categories/${id}/`, {title}, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при обновлении категории');
        }
    }
);

export const deleteCategory = createAsyncThunk<number, number>(
    'categories/deleteCategory',
    async (id, { rejectWithValue, getState }) => {
        try {
            const state: any = getState();
            const token = state.auth?.token;

            await axiosInstance.delete(`/good-categories/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при удалении категории');
        }
    }
);

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
            })
            .addCase(fetchGoodsByCategory.pending, (state, action) => {
                const categoryId = action.meta.arg;
                state.categoryGoods[categoryId] = {
                    items: [],
                    count: 0,
                    loading: true,
                    error: null,
                };
            })
            .addCase(fetchGoodsByCategory.fulfilled, (state, action) => {
                const { categoryId, results, count } = action.payload;
                state.categoryGoods[categoryId] = {
                    items: results,
                    count,
                    loading: false,
                    error: null,
                };
            })
            .addCase(fetchGoodsByCategory.rejected, (state, action) => {
                const categoryId = action.meta.arg;
                state.categoryGoods[categoryId] = {
                    items: [],
                    count: 0,
                    loading: false,
                    error: action.payload as string,
                };
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.raw.push(action.payload);
                state.structured = buildStructuredCategories(state.raw);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.raw.findIndex(cat => cat.id === action.payload.id);
                if (index !== -1) {
                    state.raw[index] = action.payload;
                    state.structured = buildStructuredCategories(state.raw);
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.raw = state.raw.filter(cat => cat.id !== action.payload);
                state.structured = buildStructuredCategories(state.raw);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default categoriesSlice.reducer;