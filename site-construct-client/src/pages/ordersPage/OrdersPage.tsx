import React, { useEffect, useState } from 'react';
import './ordersPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import PurchasedCard from '../../components/purchasedCard/PurchasedCard';
import Header from '../../components/header/Header';
import OrderCard from '../../components/orderCard/OrderCard';
import Recommendations from '../../components/recommendations/Recommendations';
import EmptyOrders from '../../components/emptyOrders/EmptyOrders';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCompletedOrders, fetchCurrentOrders, Order } from '../../store/orderSlice';
import { fetchBoughtGoods } from '../../store/goodsSlice';
import { fetchRefunds } from '../../store/refundSlice';

const OrdersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'current' | 'completed' | 'purchased' | 'refunds'>('current');
    const dispatch = useAppDispatch();
    const { currentOrders, completedOrders/*, loading*/ } = useAppSelector(state => state.orders);
    const { boughtItems: purchasedGoods } = useAppSelector(state => state.goods);
    const { refunds } = useAppSelector(state => state.refund)

    useEffect(() => {
        dispatch(fetchCurrentOrders());
        dispatch(fetchCompletedOrders());
        dispatch(fetchRefunds());
        dispatch(fetchBoughtGoods());
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
                    Возвраты ({refunds.length})
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
                                    <PurchasedCard good={order} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyOrders />
                    )
                )}
                {activeTab === 'refunds' && (
                    refunds.length > 0 ? (
                        <ul className="orders_goods-list">
                            {refunds.map((refund, index) => (
                                <li className='order' key={index}>
                                    <PurchasedCard good={refund.item} order={refund.order} />
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
