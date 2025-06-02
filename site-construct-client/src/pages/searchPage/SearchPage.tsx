import React, { useEffect, useRef, useState } from 'react';
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
    const { items } = useAppSelector((state) => state.goods);
    const [priceGt, setPriceGt] = useState('');
    const [priceLt, setPriceLt] = useState('');
    const lastRequestParams = useRef<{ search?: string; price__gt?: number; price__lt?: number }>({});

    const sendSearchRequest = () => {
        const filters: { search?: string; price__gt?: number; price__lt?: number } = {};
        if (searchQuery) filters.search = searchQuery;
        if (priceGt.trim() !== '') filters.price__gt = Number(priceGt);
        if (priceLt.trim() !== '') filters.price__lt = Number(priceLt);
        const hasChanged = JSON.stringify(filters) !== JSON.stringify(lastRequestParams.current);
        if (!hasChanged) return;
        lastRequestParams.current = filters;
        dispatch(fetchGoods(filters));
    };

    useEffect(() => {
        sendSearchRequest();
    }, [searchQuery]);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendSearchRequest();
        }
    };

    const handleBlur = () => {
        sendSearchRequest();
    };

    useEffect(() => {
        if (!searchQuery) return;
        document.title = `${searchQuery} - Результаты поиска | Kaufen`;
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            `Результаты поиска по запросу "${searchQuery}". Найдите нужные товары в магазине Kaufen.`
        );
        return () => {
            document.title = 'Kaufen';
            if (metaDescription) {
                metaDescription.setAttribute('content', 'Kaufen – интернет-магазин качественных товаров.');
            }
        };
    }, [searchQuery]);

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
                                <input
                                    className='category-page_price-input text-n14'
                                    type="text"
                                    placeholder='от 100'
                                    value={priceGt}
                                    onChange={(e) => setPriceGt(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                />
                                <input
                                    className='category-page_price-input text-n14'
                                    type="text"
                                    placeholder='до 1000'
                                    value={priceLt}
                                    onChange={(e) => setPriceLt(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="category-page_products">
                        <ul className='main_goods-list category-page_products-list search-page_products-list'>
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
