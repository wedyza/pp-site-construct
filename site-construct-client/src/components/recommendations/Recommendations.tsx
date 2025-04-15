import React from 'react';
import './recommendations.scss'
import { Good } from '../../services/api';
import GoodsCard from '../goodCard/GoodCard';

const goods: Good[] = [
    {
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999
    },
    {
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999
    },
    {
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999
    },
    {
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999
    },
    {
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999
    },
    {
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999
    },
];

const Recommendations: React.FC = () => {
    return (
        <div className='order-page_rec'>
            <h2 className='order-page_rec-title'>Рекомендуем для вас</h2>
            <ul className='main_goods-list'>
                {goods.map((good, index) => (
                    <li key={index} className="main_good"><GoodsCard good={good} /></li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;