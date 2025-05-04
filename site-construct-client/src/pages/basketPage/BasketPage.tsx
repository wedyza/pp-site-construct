import React, { useState } from 'react';
import './basketPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import BasketCard from '../../components/basketCard/BasketCard';
import CustomCheckbox from '../../components/customCheckbox/CustomCheckbox';

const BasketPage: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content basket-page">
                <div className='basket_content'>
                    <div className='basket-actions'>
                        <button className='basket-btn text-n16 basket_select-all'>
                            <CustomCheckbox
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                                checkboxClass='basket_checkbox'
                            />
                            Выбрать все
                        </button>
                        <button className='basket-btn text-n16'>
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
                        <div className="basket-placement_list">
                            <div className="basket-placement_list-item">
                                <span className='basket-placement_list__label text-n14'>
                                    Специальное чистящее средство для посудомоечной машины
                                </span>
                                <span className='basket-placement_list__value text-price1'>5 520 ₽</span>
                            </div>
                            <div className="basket-placement_list-item">
                                <span className='basket-placement_list__label text-n14'>
                                    Специальное чистящее средство для посудомоечной машины
                                </span>
                                <span className='basket-placement_list__value text-price1'>5 520 ₽</span>
                            </div>
                        </div>
                        <div className="basket-placement_sum">
                            <span className='basket-placement_content__label text-desc'>Итого:</span>
                            <span className='basket-placement_content__value text-price2'>5 520 ₽</span>
                        </div>
                    </div>
                    <Link to='' className='basket-placement_link btn-black'>
                        <span className='text-n16'>Перейти к оформлению</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BasketPage;
