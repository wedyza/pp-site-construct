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
    //const loading = useAppSelector((state) => state.goods.loading);

    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);

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
