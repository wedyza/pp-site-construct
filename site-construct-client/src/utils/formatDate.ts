export function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы от 0 до 11
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}.${month}.${year}`;
}
