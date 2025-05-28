import { Link } from 'react-router-dom';
import SellerNav from '../../components/sellerNav/SellerNav';
import './sellerMainPage.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchAnalytics } from '../../store/analyticsSlice';
import SellDynamicsCharts from '../../components/sellDynamicsCharts/SellDynamicsCharts';
import { fetchTodayOrders } from '../../store/todayOrdersSlice';
import { formatDate } from '../../utils/formatDate';
import { fetchItemsLeft } from '../../store/itemsLeftSlice';

const SellerMainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data/*, loading, error*/ } = useAppSelector((state) => state.analytics);
    const { orders, total } = useAppSelector((state) => state.todayOrders);
    const { items } = useAppSelector((state) => state.itemsLeft);

    useEffect(() => {
        dispatch(fetchItemsLeft());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAnalytics());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchTodayOrders());
    }, [dispatch]);

    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-main'>
                <div className='seller-main_first seller-main_column'>
                    <div className='seller-main_item'>
                        <h1 className='text-h3 seller-main_item-title'>Основные KPI</h1>
                        <div className='seller-main_item-body seller-main_kpi-body'>
                            <div className='seller-main_kpi-item'>
                                <span className='seller-main_kpi-label text-n14'>
                                    Выручка в марте
                                </span>
                                <div className='seller-main_kpi-value-main'>
                                    <span className='seller-main_kpi-value text-n16'>
                                        {(data?.total_payed.amount__sum || 0) + (data?.total_freezed.amount__sum || 0)} ₽
                                    </span>
                                    {/* <span className='seller-main_kpi-stat text-n14'>
                                        (+12% за неделю)
                                    </span> */}
                                </div>
                            </div>
                            <div className='seller-main_kpi-item'>
                                <span className='seller-main_kpi-label text-n14'>
                                    Заказы в марте
                                </span>
                                <div className='seller-main_kpi-value-main'>
                                    <span className='seller-main_kpi-value text-n16'>
                                        {data?.orders_per_this_month.total}
                                    </span>
                                    {/* <span className='seller-main_kpi-stat text-n14'>
                                        (+5 новых)
                                    </span> */}
                                </div>
                            </div>
                            <div className='seller-main_kpi-item'>
                                <span className='seller-main_kpi-label text-n14'>
                                    Отмены в марте
                                </span>
                                <div className='seller-main_kpi-value-main'>
                                    <span className='seller-main_kpi-value text-n16'>
                                        {data?.refunds_per_this_month.total}
                                    </span>
                                    {/* <span className='seller-main_kpi-stat text-n14'>
                                        (4% от заказов)
                                    </span> */}
                                </div>
                            </div>
                            <div className='seller-main_kpi-item'>
                                <span className='seller-main_kpi-label text-n14'>
                                    Общий рейтинг магазина
                                </span>
                                <div className='seller-main_kpi-value-main'>
                                    <span className='seller-main_kpi-value text-n16'>
                                        {data?.average_rating.rate__avg}
                                    </span>
                                    {/* <span className='seller-main_kpi-stat text-n14'>
                                        (+142 отзыва за март)
                                    </span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='seller-main_item'>
                        <h1 className='text-h3 seller-main_item-title'>Последние заказы сегодня (12 мая)</h1>
                        <div className='seller-main_item-body seller-main_del-body'>
                            <div className='seller-main_del-head'>
                                <p className='text-desc'>{total} заказов</p>
                                <Link to='' className='text-n14'>
                                    <span className='seller-main_del-link'>Смотреть все</span>
                                </Link>
                            </div>
                            <div className='seller-main_del-list'>
                                {orders.map((order) => (
                                    <div key={order.id} className='seller-main_del-item'>
                                        <div className='seller-main_del-item-id text-n11'>
                                            № {order.id}
                                        </div>
                                        <div className='seller-main_del-item-info text-n11'>
                                            <span className='seller-main_del-item-info__name'>{order.items[0].good_item}</span>
                                            <span>{order.items[0].count} шт</span>
                                            <span className='seller-main_del-item-info__last'>{formatDate(order.created_at).slice(0, 5)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='seller-main_second seller-main_column'>
                    <div className='seller-main_item'>
                        <div className='seller-main_item-title seller-main_rem-title'>
                            <h1 className='text-h3'>
                                Остатки товаров
                            </h1>
                            <Link to='' className='text-n14'>Подробнее</Link>
                        </div>
                        <div className='seller-main_item-body'>
                            <div className="seller-main_rem-table text-n11">
                                <div className="seller-main_rem-head">
                                    <p className="seller-main_rem-cell">№</p>
                                    <p className="seller-main_rem-cell">Товар</p>
                                    <p className="seller-main_rem-cell">Продажи за нед.</p>
                                    <p className="seller-main_rem-cell">Остаток</p>
                                    <p className="seller-main_rem-cell">Статус</p>
                                </div>
                                {items.map((item, index) => (
                                    <div key={index} className="seller-main_rem-row">
                                        <p className="seller-main_rem-cell">{index + 1}</p>
                                        <div className="seller-main_rem-cell">
                                            <p className='seller-main_rem-cell__name'>
                                                {item.item.name}
                                            </p>
                                        </div>
                                        <p className="seller-main_rem-cell">{item.sell_count}</p>
                                        <p className="seller-main_rem-cell">{item.item.warehouse_count}</p>
                                        <div className="seller-main_rem-cell">
                                            <div className={`seller-main_rem-cell-img ${
                                                item.status === 'В наличии' ? 'available' : 'out-of-stock'
                                            }`}></div>
                                            {item.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='seller-main_item'>
                        <div className='seller-main_item-title seller-main_dyn-title'>
                            <h1 className='text-h3'>
                                Динамика продаж
                            </h1>
                        </div>
                        <div className='seller-main_item-body'>
                            <div className="grafictemp">
                                <SellDynamicsCharts />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerMainPage;
