import React from 'react';
import './mainPage.scss'
import GoodsCard from '../../components/goodCard/GoodCard';
import {Good} from '../../services/api'

const categories: string[] = ['Одежда и обувь', 'Электроника и гаджеты', 'Дом и сад', 'Красота и здоровье', 'Детские товары', 'Автотовары', 'Товары для животных', 'Аксессуары'];

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

const MainPage: React.FC = () => {
    return (
        <div className='page-content'>
            <ul className="header-categories">
                {categories.map((category, index) => (
                    <React.Fragment key={index}>
                        <li className="header-categories_item">{category}</li>
                        {index < categories.length - 1 && (
                            <li className="header-categories_dot">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6" cy="6.5" r="6" fill="#D9D9D9"/>
                                </svg>
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ul>
            <div className="main-content">
                <div className="news"></div>
                <ul className='main_goods-list'>
                    {goods.map((good, index) => (
                        <li key={index} className="main_good"><GoodsCard good={good} /></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MainPage;
