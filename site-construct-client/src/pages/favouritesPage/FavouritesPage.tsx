import React, { useEffect } from 'react';
import './favouritesPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import GoodsCard from '../../components/goodCard/GoodCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWishlist } from '../../store/wishlistSlice';


const FavouritesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items: goods/*, loading, error*/ } = useAppSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

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
