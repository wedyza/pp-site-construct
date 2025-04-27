import React from 'react';
import './mainPage.scss'
import GoodsCard from '../../components/goodCard/GoodCard';
import { Good } from '../../api/api'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';


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
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <div className="news"></div>
                <ul className='main_goods-list'>
                    {goods.map((good, index) => (
                        <li key={index} className="main_good">
                            <Link to={'/product'}>
                                <GoodsCard good={good} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MainPage;
