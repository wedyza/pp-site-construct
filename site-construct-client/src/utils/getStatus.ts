const ORDER_STATUSES: Record<string, string> = {
    PAYED: "Оплачен",
    PROCESSING: "В обработке",
    ON_THE_WAY: "В пути",
    DELIVERED: "Доставлен",
    RECEIVED: "Получен",
    REFUND: "Возврат",
    DECLINED: "Отклонен"
};

export const getTranslatedStatus = (status: string): string => {
    return ORDER_STATUSES[status] || status;
};