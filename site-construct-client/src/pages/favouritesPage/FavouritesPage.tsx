import React from 'react';
import './favouritesPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Good } from '../../services/api';
import { Link } from 'react-router-dom';
import GoodsCard from '../../components/goodCard/GoodCard';


const goods: Good[] = [
    {
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999,
        isFav: true
    },
    {
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999,
        isFav: true
    },
    {
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999,
        isFav: true
    },
    {
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999,
        isFav: true
    },
    {
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999,
        isFav: true
    },
    {
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999,
        isFav: true
    },
];

const FavouritesPage: React.FC = () => {
    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <ul className='main_goods-list fav_goods-list'>
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

export default FavouritesPage;
