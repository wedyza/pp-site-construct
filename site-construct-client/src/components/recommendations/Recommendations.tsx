import React from 'react';
import './recommendations.scss'
import GoodsCard from '../goodCard/GoodCard';
import { Good } from '../../store/goodsSlice';

const goods: Good[] = [
    {
        id: 0,
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999,
        in_wishlist: false,
        market: 1
    },
    {
        id: 0,
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999,
        in_wishlist: false,
        market: 1
    },
    {
        id: 0,
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999,
        in_wishlist: false,
        market: 1
    },
    {
        id: 0,
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999,
        in_wishlist: false,
        market: 1
    },
    {
        id: 0,
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999,
        in_wishlist: false,
        market: 1
    },
    {
        id: 0,
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999,
        in_wishlist: false,
        market: 1
    },
];

const Recommendations: React.FC = () => {
    return (
        <div className='order-page_rec'>
            <h2 className='order-page_rec-title text-h2'>Рекомендуем для вас</h2>
            <ul className='main_goods-list'>
                {goods.map((good, index) => (
                    <li key={index} className="main_good"><GoodsCard good={good} /></li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;