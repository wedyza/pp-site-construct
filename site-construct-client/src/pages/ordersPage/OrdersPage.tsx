import React, { useEffect, useState } from 'react';
import './ordersPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import PurchasedCard from '../../components/purchasedCard/PurchasedCard';
import Header from '../../components/header/Header';
import OrderCard from '../../components/orderCard/OrderCard';
import { Good } from '../../api/api';
import Recommendations from '../../components/recommendations/Recommendations';
import EmptyOrders from '../../components/emptyOrders/EmptyOrders';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCompletedOrders, fetchCurrentOrders, Order } from '../../store/orderSlice';

const OrdersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'current' | 'completed' | 'purchased' | 'refunds'>('current');
    const purchasedGoods: Order[] = [
        {
            id: 65854,
            placement_date: '5 марта',
            delivery_date: '6 марта',
            payment_total: 900,
            address: 'г. Екатеринбург ул. Малышева 17',
            status: 'Получен'
        },
        {
            id: 565854,
            placement_date: '7 марта',
            delivery_date: '9 марта',
            payment_total: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'Получен'
        },
        {
            id: 5658541,
            placement_date: '10 марта',
            delivery_date: '10 марта',
            payment_total: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'Получен'
        }
    ];
    const refundsGoods: Order[] = [
        {
            id: 658540,
            placement_date: '5 марта',
            delivery_date: '6 марта',
            payment_total: 900,
            address: 'г. Екатеринбург ул. Малышева 17',
            status: 'возвращен'
        },
        {
            id: 5658540,
            placement_date: '7 марта',
            delivery_date: '9 марта',
            payment_total: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'возвращен'
        }
    ];
    const dispatch = useAppDispatch();
    const { currentOrders, completedOrders, loading } = useAppSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchCurrentOrders());
        dispatch(fetchCompletedOrders());
    }, [dispatch]);

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="orders-tabs">
                <button
                    className={`orders-tab text-h2 ${activeTab === 'current' ? 'orders-tab__active' : ''}`}
                    onClick={() => setActiveTab('current')}
                >
                    Текущие ({currentOrders.length})
                </button>
                <button
                    className={`orders-tab text-h2 ${activeTab === 'completed' ? 'orders-tab__active' : ''}`}
                    onClick={() => setActiveTab('completed')}
                >
                    Завершённые ({completedOrders.length})
                </button>
                <button
                    className={`orders-tab text-h2 ${activeTab === 'purchased' ? 'orders-tab__active' : ''}`}
                    onClick={() => setActiveTab('purchased')}
                >
                    Купленные товары ({purchasedGoods.length})
                </button>
                <button
                    className={`orders-tab text-h2 ${activeTab === 'refunds' ? 'orders-tab__active' : ''}`}
                    onClick={() => setActiveTab('refunds')}
                >
                    Возвраты ({refundsGoods.length})
                </button>
            </div>
            <div className="orders-content">
                {activeTab === 'current' && (
                    currentOrders.length > 0 ? (
                        <ul className="orders-list">
                            {currentOrders.map((order, index) => (
                                <li className='order' key={index}>
                                    <OrderCard order={order} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyOrders />
                    )
                )}
                {activeTab === 'completed' && (
                    completedOrders.length > 0 ? (
                        <ul className="orders-list">
                        {completedOrders.map((order, index) => (
                            <li className='order' key={index}>
                                <OrderCard order={order} />
                            </li>
                        ))}
                    </ul>
                    ) : (
                        <EmptyOrders />
                    )
                )}
                {activeTab === 'purchased' && (
                    purchasedGoods.length > 0 ? (
                        <ul className="orders_goods-list">
                            {purchasedGoods.map((order, index) => (
                                <li className='order' key={index}>
                                    <PurchasedCard order={order} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyOrders />
                    )
                )}
                {activeTab === 'refunds' && (
                    refundsGoods.length > 0 ? (
                        <ul className="orders_goods-list">
                            {refundsGoods.map((order, index) => (
                                <li className='order' key={index}>
                                    <PurchasedCard order={order} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyOrders />
                    )
                )}
            </div>
            <Recommendations />
        </div>
    );
};

export default OrdersPage;
