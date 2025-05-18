export function formatPrice(price: number): string {
    if (!price) return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
