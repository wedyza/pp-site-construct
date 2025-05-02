import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1";

export interface DeliveryMethod {
    id?: number;
    title: string;
    description: string;
}

export interface GoodCategory {
    id?: number;
    title: string;
    description: string;
    parent?: number | null;
}

export interface Good {
    id?: number;
    name: string;
    description: string;
    price?: number;
    category?: number | null;
    isFav?: boolean;
}

export interface BasketItem {
    id?: number;
    count?: number;
    good_item: number;
    basket?: number;
}

// export interface PaymentMethod {
//     id?: number;
//     title: string;
//     description: string;
// }
  
const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
});

export const getDeliveryMethods = async (): Promise<DeliveryMethod[]> => {
    const response = await api.get("/delivery-methods/");
    return response.data;
};

export const createDeliveryMethod = async (
    data: Omit<DeliveryMethod, "id">
): Promise<DeliveryMethod> => {
    const response = await api.post("/delivery-methods/", data);
    return response.data;
};

export const getDeliveryMethodById = async (
    id: number
): Promise<DeliveryMethod> => {
    const response = await api.get(`/delivery-methods/${id}/`);
    return response.data;
};

export const updateDeliveryMethod = async (
    id: number,
    data: Omit<DeliveryMethod, "id">
): Promise<DeliveryMethod> => {
    const response = await api.put(`/delivery-methods/${id}/`, data);
    return response.data;
};

export const patchDeliveryMethod = async (
    id: number,
    data: Partial<Omit<DeliveryMethod, "id">>
): Promise<DeliveryMethod> => {
    const response = await api.patch(`/delivery-methods/${id}/`, data);
    return response.data;
};

export const deleteDeliveryMethod = async (id: number): Promise<void> => {
    await api.delete(`/delivery-methods/${id}/`);
};



export const getGoodCategories = async (): Promise<GoodCategory[]> => {
    const response = await api.get("/good-categories/");
    return response.data;
};
  
export const createGoodCategory = async (
    data: Omit<GoodCategory, "id">
): Promise<GoodCategory> => {
    const response = await api.post("/good-categories/", data);
    return response.data;
};
  
export const getGoodCategoryById = async (
    id: number
): Promise<GoodCategory> => {
    const response = await api.get(`/good-categories/${id}/`);
    return response.data;
};
  
export const updateGoodCategory = async (
    id: number,
    data: Omit<GoodCategory, "id">
): Promise<GoodCategory> => {
    const response = await api.put(`/good-categories/${id}/`, data);
    return response.data;
};
  
export const patchGoodCategory = async (
    id: number,
    data: Partial<Omit<GoodCategory, "id">>
): Promise<GoodCategory> => {
    const response = await api.patch(`/good-categories/${id}/`, data);
    return response.data;
};
  
export const deleteGoodCategory = async (id: number): Promise<void> => {
    await api.delete(`/good-categories/${id}/`);
};



export const getGoods = async (): Promise<Good[]> => {
    const response = await api.get("/goods/");
    return response.data;
};

export const createGood = async (
    data: Omit<Good, "id">
): Promise<Good> => {
    const response = await api.post("/goods/", data);
    return response.data;
};

export const getGoodById = async (
    id: number
): Promise<Good> => {
    const response = await api.get(`/goods/${id}/`);
    return response.data;
};

export const updateGood = async (
    id: number,
    data: Omit<Good, "id">
): Promise<Good> => {
    const response = await api.put(`/goods/${id}/`, data);
    return response.data;
};

export const patchGood = async (
    id: number,
    data: Partial<Omit<Good, "id">>
): Promise<Good> => {
    const response = await api.patch(`/goods/${id}/`, data);
    return response.data;
};

export const deleteGood = async (id: number): Promise<void> => {
    await api.delete(`/goods/${id}/`);
};



export const getBasketItems = async (): Promise<BasketItem[]> => {
    const response = await api.get("/me/basket-items/");
    return response.data;
};

export const createBasketItem = async (
    data: Omit<BasketItem, "id">
): Promise<BasketItem> => {
    const response = await api.post("/me/basket-items/", data);
    return response.data;
};

export const updateBasketItem = async (
    id: number,
    data: Omit<BasketItem, "id">
): Promise<BasketItem> => {
    const response = await api.put(`/me/basket-items/${id}/`, data);
    return response.data;
};

export const patchBasketItem = async (
    id: number,
    data: Partial<Omit<BasketItem, "id">>
): Promise<BasketItem> => {
    const response = await api.patch(`/me/basket-items/${id}/`, data);
    return response.data;
};

export const deleteBasketItem = async (id: number): Promise<void> => {
    await api.delete(`/me/basket-items/${id}/`);
};



// export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
//     const response = await api.get("/payment-methods/");
//     return response.data;
// };

// export const createPaymentMethod = async (
//     data: Omit<PaymentMethod, "id">
// ): Promise<PaymentMethod> => {
//     const response = await api.post("/payment-methods/", data);
//     return response.data;
// };

// export const getPaymentMethodById = async (
//     id: number
// ): Promise<PaymentMethod> => {
//     const response = await api.get(`/payment-methods/${id}/`);
//     return response.data;
// };

// export const updatePaymentMethod = async (
//     id: number,
//     data: Omit<PaymentMethod, "id">
// ): Promise<PaymentMethod> => {
//     const response = await api.put(`/payment-methods/${id}/`, data);
//     return response.data;
// };

// export const patchPaymentMethod = async (
//     id: number,
//     data: Partial<Omit<PaymentMethod, "id">>
// ): Promise<PaymentMethod> => {
//     const response = await api.patch(`/payment-methods/${id}/`, data);
//     return response.data;
// };

export const deletePaymentMethod = async (id: number): Promise<void> => {
    await api.delete(`/payment-methods/${id}/`);
};
