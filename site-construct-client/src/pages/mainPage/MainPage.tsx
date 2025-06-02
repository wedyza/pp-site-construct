import React, { useEffect } from 'react';
import './mainPage.scss'
import GoodsCard from '../../components/goodCard/GoodCard';
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGoods } from '../../store/goodsSlice';

const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const goods = useAppSelector((state) => state.goods.items);

    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);

    useEffect(() => {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }

        metaDescription.setAttribute(
            'content',
            'Добро пожаловать в интернет-магазин Kaufen. У нас вы найдете широкий ассортимент товаров по выгодным ценам.'
        );

        return () => {
            document.title = 'Kaufen';
            if (metaDescription) {
                metaDescription.setAttribute('content', 'Kaufen – интернет-магазин качественных товаров.');
            }
        };
    }, []);

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <div className="news"></div>
                <ul className='main_goods-list'>
                    {goods.map((good, index) => (
                        <li key={index} className="main_good">
                            <Link to={`/product/${good.id}`}>
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
