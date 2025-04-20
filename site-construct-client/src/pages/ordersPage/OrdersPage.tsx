import React, { useState } from 'react';
import './ordersPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import PurchasedCard from '../../components/purchasedCard/PurchasedCard';
import Header from '../../components/header/Header';
import OrderCard from '../../components/orderCard/OrderCard';
import { Good } from '../../services/api';
import Recommendations from '../../components/recommendations/Recommendations';
import EmptyOrders from '../../components/emptyOrders/EmptyOrders';

export interface Order {
    id?: number;
    placement_date: string;
    delivery_date?: string;
    price: number;
    address: string;
    status: string;
    goods?: Good[];
}

const OrdersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'current' | 'completed' | 'purchased' | 'refunds'>('current');
    
    const currentOrders: Order[] = [
        {
            id: 4565854,
            placement_date: '6 марта',
            delivery_date: '8 марта',
            price: 704,
            address: 'г. Екатеринбург ул. Малышева 15',
            status: 'Создан',
            goods: [
                {
                    name: 'a',
                    description: 'b',
                },
            ]
        },
        {
            id: 565854,
            placement_date: '7 марта',
            delivery_date: '9 марта',
            price: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'В пути',
            goods: [
                {
                    name: 'a',
                    description: 'b',
                },
                {
                    name: 'a',
                    description: 'b',
                },
            ]
        },
        {
            id: 565854,
            placement_date: '7 марта',
            delivery_date: '9 марта',
            price: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'В пути',
            goods: [
                {
                    name: 'a',
                    description: 'b',
                },
                {
                    name: 'a',
                    description: 'b',
                },
                {
                    name: 'a',
                    description: 'b',
                },
            ]
        }
    ];
    const completedOrders: Order[] = [
        // {
        //     id: 565854,
        //     placement_date: '7 марта',
        //     delivery_date: '9 марта',
        //     price: 800,
        //     address: 'г. Екатеринбург ул. Малышева 16',
        //     status: 'Получен',
        //     goods: [
        //         {
        //             name: 'a',
        //             description: 'b',
        //         },
        //         {
        //             name: 'a',
        //             description: 'b',
        //         },
        //     ]
        // },
        // {
        //     id: 565854,
        //     placement_date: '7 марта',
        //     delivery_date: '9 марта',
        //     price: 800,
        //     address: 'г. Екатеринбург ул. Малышева 16',
        //     status: 'Получен',
        //     goods: [
        //         {
        //             name: 'a',
        //             description: 'b',
        //         }
        //     ]
        // }
    ];
    const purchasedGoods: Order[] = [
        {
            id: 65854,
            placement_date: '5 марта',
            delivery_date: '6 марта',
            price: 900,
            address: 'г. Екатеринбург ул. Малышева 17',
            status: 'Получен'
        },
        {
            id: 565854,
            placement_date: '7 марта',
            delivery_date: '9 марта',
            price: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'Получен'
        },
        {
            id: 5658541,
            placement_date: '10 марта',
            delivery_date: '10 марта',
            price: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'Получен'
        }
    ];
    const refundsGoods: Order[] = [
        {
            id: 658540,
            placement_date: '5 марта',
            delivery_date: '6 марта',
            price: 900,
            address: 'г. Екатеринбург ул. Малышева 17',
            status: 'возвращен'
        },
        {
            id: 5658540,
            placement_date: '7 марта',
            delivery_date: '9 марта',
            price: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'возвращен'
        }
    ];

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="orders-tabs">
                <button
                    className={activeTab === 'current' ? 'orders-tab orders-tab__active' : 'orders-tab'}
                    onClick={() => setActiveTab('current')}
                >
                    Текущие ({currentOrders.length})
                </button>
                <button
                    className={activeTab === 'completed' ? 'orders-tab orders-tab__active' : 'orders-tab'}
                    onClick={() => setActiveTab('completed')}
                >
                    Завершённые ({completedOrders.length})
                </button>
                <button
                    className={activeTab === 'purchased' ? 'orders-tab orders-tab__active' : 'orders-tab'}
                    onClick={() => setActiveTab('purchased')}
                >
                    Купленные товары ({purchasedGoods.length})
                </button>
                <button
                    className={activeTab === 'refunds' ? 'orders-tab orders-tab__active' : 'orders-tab'}
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
