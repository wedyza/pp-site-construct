import React, { useEffect } from 'react';
import './searchPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGoods } from '../../store/goodsSlice';
import GoodsCard from '../../components/goodCard/GoodCard';

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const dispatch = useAppDispatch();
    const { items/*, loading, error*/ } = useAppSelector((state) => state.goods);

    useEffect(() => {
        if (searchQuery) {
            dispatch(fetchGoods({ search: searchQuery }));
        }
    }, [searchQuery, dispatch]);

    return (
        <div className='page-content__no-pad'>
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <div className="category-page_header">
                    <h1 className="category-header_title text-h1">{searchQuery}</h1>
                </div>
                <div className="main-content category-page_content">
                    <div className="category-page_filters">
                        <div className='category-page_filter'>
                            <p className='text-h3'>
                                Цена
                            </p>
                            <div className='category-page_filter-price'>
                                <input className='category-page_price-input text-n14' type="text" placeholder='от 100' />
                                <input className='category-page_price-input text-n14' type="text" placeholder='до 1000' />
                            </div>
                        </div>
                    </div>
                    <div className="category-page_products">
                        <ul className='main_goods-list category-page_products-list'>
                            {items.map((good, index) => (
                                <li key={index} className="main_good">
                                    <Link to={`/product/${good.id}`}>
                                        <GoodsCard good={good} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
