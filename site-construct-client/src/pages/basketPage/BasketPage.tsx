import React, { useEffect, useState } from 'react';
import './basketPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import BasketCard from '../../components/basketCard/BasketCard';
import CustomCheckbox from '../../components/customCheckbox/CustomCheckbox';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearSelectedItems, fetchBasketWithGoods, setSelectedItems } from '../../store/basketSlice';
import { formatPrice } from '../../utils/formatPrice';

const BasketPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, selectedIds } = useAppSelector((state) => state.basket);

    useEffect(() => {
        dispatch(fetchBasketWithGoods());
    }, [dispatch]);

    const toggleSelectAll = () => {
        if (selectedIds.length === items.length) {
            dispatch(clearSelectedItems());
        } else {
            const allIds = items.map(({ item }) => item.id);
            dispatch(setSelectedItems(allIds));
        }
    };

    const clearAll = () => {
        dispatch(clearSelectedItems());
    };

    const handleToggleSingle = (id: number) => {
        const updated = selectedIds.includes(id)
            ? selectedIds.filter((i) => i !== id)
            : [...selectedIds, id];
        dispatch(setSelectedItems(updated));
    };

    const isAllSelected = selectedIds.length === items.length && items.length > 0;
    const selectedGoods = items.filter(({ item }) => selectedIds.includes(item.id));

    useEffect(() => {
        localStorage.setItem('selectedBasketIds', JSON.stringify(selectedIds));
    }, [selectedIds]);

    useEffect(() => {
        const saved = localStorage.getItem('selectedBasketIds');
        console.log(saved);
        if (saved) {
            const parsed = JSON.parse(saved);
            dispatch(setSelectedItems(parsed));
        }
    }, [dispatch]);

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content basket-page">
                <div className='basket_content'>
                    <div className='basket-actions'>
                        <button className='basket-btn text-n16 basket_select-all' onClick={toggleSelectAll}>
                            <CustomCheckbox
                                checked={isAllSelected}
                                onChange={toggleSelectAll}
                                checkboxClass='basket_checkbox'
                            />
                            Выбрать все
                        </button>
                        <button className='basket-btn text-n16' onClick={clearAll}>
                            Очистить все
                        </button>
                    </div>
                    <ul className='basket_list'>
                        {items.map(({ item, good }) =>
                            good ? (
                                <li className="basket_list-item" key={item.id}>
                                    <BasketCard
                                        good={good}
                                        id={item.id}
                                        count={item.count}
                                        isChecked={selectedIds.includes(item.id)}
                                        onToggle={() => handleToggleSingle(item.id)}
                                    />
                                </li>
                            ) : null
                        )}
                    </ul>
                </div>
                <div className='basket-placement'>
                    <div className='basket-placement_content'>
                        <div className="basket-placement_list">
                            {selectedGoods.map(({ good, item }) =>
                                good ? (
                                    <div key={item.id} className="basket-placement_list-item">
                                        <span className='basket-placement_list__label text-n14'>
                                            {good.name}
                                        </span>
                                        <span className='basket-placement_list__value text-price1'>
                                            {formatPrice(good.price * item.count)} ₽
                                        </span>
                                    </div>
                                ) : null
                            )}
                        </div>
                        <div className="basket-placement_sum">
                            <span className='basket-placement_content__label text-desc'>Итого:</span>
                            <span className='basket-placement_content__value text-price2'>
                                {selectedGoods.reduce((sum, { good, item }) => sum + (good ? good.price * item.count : 0), 0).toLocaleString()} ₽
                            </span>
                        </div>
                    </div>
                    <Link to='/make-order' className='basket-placement_link btn-black text-n16'>
                        <span className='basket-placement_link-text'>Перейти к оформлению</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BasketPage;
