import React, { useState } from 'react';
import './ordersPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import CompletedOrderCard from '../../components/completedOrderCard/CompletedOrderCard';
import Header from '../../components/header/Header';

export interface Order {
    id?: number;
    placement_date: string;
    delivery_date?: string;
    price: number;
    address: string;
    status: string;
}

const OrdersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'current' | 'completed' | 'purchased'>('current');
    
    const currentOrders: Order[] = [
        {
            id: 4565854,
            placement_date: '6 марта',
            delivery_date: '8 марта',
            price: 704,
            address: 'г. Екатеринбург ул. Малышева 15',
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
            id: 565854,
            placement_date: '7 марта',
            delivery_date: '9 марта',
            price: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'Получен'
        }
    ];
    const completedOrders: Order[] = [
        {
            id: 565854,
            placement_date: '7 марта',
            delivery_date: '9 марта',
            price: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'Получен'
        },
        {
            id: 565854,
            placement_date: '7 марта',
            delivery_date: '9 марта',
            price: 800,
            address: 'г. Екатеринбург ул. Малышева 16',
            status: 'Получен'
        }
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
            </div>
            <div className="orders-content">
                {activeTab === 'current' && (
                    <ul className="orders-list">
                        {currentOrders.map((order, index) => (
                            <li className='order' key={index}>
                                <CompletedOrderCard order={order} />
                            </li>
                        ))}
                    </ul>
                )}
                {activeTab === 'completed' && (
                    <ul className="orders-list">
                        {completedOrders.map((order, index) => (
                            <li className='order' key={index}>
                                <CompletedOrderCard order={order} />
                            </li>
                        ))}
                    </ul>
                )}
                {activeTab === 'purchased' && (
                    <ul className="orders-list">
                        {purchasedGoods.map((order, index) => (
                            <li className='order' key={index}>
                                <CompletedOrderCard order={order} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
