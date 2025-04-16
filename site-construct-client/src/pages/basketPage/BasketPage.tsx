import React from 'react';
import './basketPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import BasketCard from '../../components/basketCard/BasketCard';

const BasketPage: React.FC = () => {
    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content basket-page">
                <div className='basket_content'>
                    <div className='basket-actions'>
                        <button className='basket-btn'>
                            Выбрать все
                        </button>
                        <button className='basket-btn'>
                            Очистить все
                        </button>
                    </div>
                    <ul className='basket_list'>
                        <li className='basket_list-item'>
                            <BasketCard />
                        </li>
                        <li className='basket_list-item'>
                            <BasketCard />
                        </li>
                    </ul>
                </div>
                <div className='basket-placement'>
                    <div className='basket-placement_content'>
                        <span className='basket-placement_content__label'>Итого:</span>
                        <span className='basket-placement_content__value'>5 520 ₽</span>
                    </div>
                    <Link to='' className='basket-placement_link'>
                        Перейти к оформлению
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BasketPage;
