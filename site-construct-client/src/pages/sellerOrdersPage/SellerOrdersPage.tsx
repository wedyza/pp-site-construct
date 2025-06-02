import { useEffect } from 'react';
import Search from '../../components/search/Search';
import SellerNav from '../../components/sellerNav/SellerNav';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './sellerOrdersPage.scss'
import { Link } from 'react-router-dom';
import { fetchOrders } from '../../store/orderSlice';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';

const ORDER_STATUSES: Record<string, string> = {
    PAYED: "Оплачен",
    PROCESSING: "В обработке",
    ON_THE_WAY: "В пути",
    DELIVERED: "Доставлен",
    RECEIVED: "Получен",
    REFUND: "Возврат",
    DECLINED: "Отклонен"
};

const getTranslatedStatus = (status: string): string => {
    return ORDER_STATUSES[status] || status;
};

const SellerOrdersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orders/*, loading*/ } = useAppSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-orders'>
                <div className='text-h3 seller-orders_title'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0.624742V1.24974H0.996094H1.98828L2.02734 1.39427C2.05078 1.4763 2.54688 3.46849 3.13281 5.82005L4.20312 10.0974L3.85156 10.2693C3.22656 10.574 2.73828 11.1794 2.5625 11.8591C2.48438 12.1638 2.48047 12.7888 2.55859 13.1208C2.71484 13.7693 3.21094 14.406 3.8125 14.7185C4.39844 15.0193 3.83203 14.9997 11.4844 14.9997C18.2578 14.9997 18.3398 14.9997 18.4688 14.9216C18.6562 14.8044 18.75 14.6286 18.75 14.3747C18.75 14.1208 18.6562 13.9451 18.4688 13.8279C18.3398 13.7497 18.2578 13.7497 11.7188 13.7497C7.34766 13.7497 5.01172 13.7341 4.84766 13.7107C4.54297 13.6599 4.33984 13.5583 4.14062 13.3591C3.875 13.0935 3.80859 12.9255 3.80859 12.4997C3.80859 12.2107 3.82422 12.0974 3.88281 11.9919C4.03125 11.7107 4.21875 11.5271 4.48438 11.3982L4.74609 11.2693L12.0352 11.2576L19.3281 11.2497L19.3516 11.0622C19.3672 10.9607 19.5156 9.46068 19.6875 7.7263C19.9531 5.04662 20 4.46849 20 3.8513V3.12474H19.375H18.75V3.63646C18.75 3.98021 18.6602 5.0388 18.4766 6.88646C18.3281 8.39427 18.1953 9.71068 18.1797 9.81224L18.1562 9.99974H11.832H5.51172L5.47266 9.8513C5.44922 9.77318 4.90625 7.58959 4.25781 4.99974C3.60938 2.4099 3.06641 0.226304 3.04297 0.144273L3.00391 -0.000258446H1.50391H0V0.624742Z" fill="#02040F"/>
                        <path d="M13.4258 3.15625L10.4297 6.15234L8.95312 4.67578C8.14453 3.86719 7.46094 3.20312 7.44141 3.20312C7.39062 3.20312 6.5625 4.03125 6.5625 4.08203C6.5625 4.10547 7.43359 4.99219 8.49609 6.05469L10.4297 7.98828L13.8867 4.53125L17.3438 1.07422L16.8828 0.613281L16.4258 0.15625L13.4258 3.15625Z" fill="#02040F"/>
                        <path d="M6.24609 16.3438C5.47266 16.6172 5 17.2852 5 18.1172C5 18.6641 5.14453 19.043 5.5 19.4219C5.87109 19.8164 6.30469 20 6.875 20C7.44531 20 7.87891 19.8164 8.25 19.4219C8.60547 19.043 8.75 18.6641 8.75 18.125C8.75 17.5859 8.60547 17.207 8.25 16.8281C7.87891 16.4336 7.44141 16.25 6.86719 16.25C6.58984 16.25 6.44531 16.2734 6.24609 16.3438ZM7.17969 17.6172C7.56641 17.8555 7.55469 18.4141 7.15625 18.6445C6.78125 18.8633 6.28906 18.5742 6.28906 18.1289C6.28906 17.6719 6.79297 17.3828 7.17969 17.6172Z" fill="#02040F"/>
                        <path d="M14.9961 16.3438C14.2227 16.6172 13.75 17.2852 13.75 18.1172C13.75 18.6641 13.8945 19.043 14.25 19.4219C14.6211 19.8164 15.0547 20 15.625 20C16.1953 20 16.6289 19.8164 17 19.4219C17.3555 19.043 17.5 18.6641 17.5 18.125C17.5 17.5859 17.3555 17.207 17 16.8281C16.6289 16.4336 16.1914 16.25 15.6172 16.25C15.3398 16.25 15.1953 16.2734 14.9961 16.3438ZM15.9297 17.6172C16.3164 17.8555 16.3047 18.4141 15.9062 18.6445C15.5312 18.8633 15.0391 18.5742 15.0391 18.1289C15.0391 17.6719 15.543 17.3828 15.9297 17.6172Z" fill="#02040F"/>
                    </svg>
                    <h1>Мои заказы <span className='seller-orders_title__accent'>Все ({orders.length})</span></h1>
                </div>
                {/* <div className="seller-orders_search-container">
                    <div className="seller-orders_search">
                        <Search
                            value={''}
                            onChange={() => {}}
                            onSubmit={() => {}}
                        />
                    </div>
                    <div className="seller-orders_search-sort text-n14">
                        По дате
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L7.53033 7.53033C7.23744 7.82322 6.76256 7.82322 6.46967 7.53033L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967Z" fill="#02040F"/>
                        </svg>
                    </div>
                </div> */}
                <div className='seller-orders_table seller-table text-n11'>
                    <div className='seller-orders_table-head seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>Номер заказа</div>
                        <div className='seller-orders_table-cell'>Дата заказа</div>
                        <div className='seller-orders_table-cell'>Покупатель</div>
                        <div className='seller-orders_table-cell'>Товары в заказе</div>
                        <div className='seller-orders_table-cell'>Сумма заказа</div>
                        <div className='seller-orders_table-cell'>Статус заказа</div>
                        <div className='seller-orders_table-cell'>Дата отправления</div>
                        <div className='seller-orders_table-cell'>Пункт выдачи</div>
                    </div>
                    {orders.map((order) => (
                        <Link to={`/seller/order/${order.id}`} key={order.id} className='seller-orders_table-body seller-orders_table-row'>
                            <div className='seller-orders_table-cell'>№{order.id}</div>
                            <div className='seller-orders_table-cell'>{formatDate(order.created_at)}</div>
                            <div className='seller-orders_table-cell'>
                                {`${order.user?.last_name} ${order.user?.first_name[0]}.`}
                            </div>
                            <div className='seller-orders_table-cell seller-orders_table-items'>
                                {order.items?.map((item) => (
                                    <div className='seller-orders_table-item'>{item.good_item.name} <span className='seller-orders_count'>({item.count} шт)</span></div>
                                ))}
                                
                            </div>
                            <div className='seller-orders_table-cell'>{formatPrice(order.payment_total)} ₽</div>
                            <div className='seller-orders_table-cell'>{getTranslatedStatus(order.status)}</div>
                            <div className='seller-orders_table-cell'>15.01.2025</div>
                            <div className='seller-orders_table-cell'>{order.address}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SellerOrdersPage;
