export const getDateTwoWeeksLater = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);

    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
    });
};