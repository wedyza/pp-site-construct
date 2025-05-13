import React, { useEffect, useState } from 'react';
import './basketPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import BasketCard from '../../components/basketCard/BasketCard';
import CustomCheckbox from '../../components/customCheckbox/CustomCheckbox';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBasketWithGoods } from '../../store/basketSlice';

const BasketPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.basket);
    console.log(items);

    useEffect(() => {
        dispatch(fetchBasketWithGoods());
    }, [dispatch]);
    
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelectAll = () => {
        if (selectedIds.length === items.length) {
            setSelectedIds([]);
        } else {
            const allIds = items.map(({ item }) => item.id);
            setSelectedIds(allIds);
        }
    };

    const clearAll = () => {
        setSelectedIds([]);
    };

    const handleToggleSingle = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const isAllSelected = selectedIds.length === items.length && items.length > 0;

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
                    <Link to='/make-order' className='basket-placement_link btn-black text-n16'>
                        <span className='basket-placement_link-text'>Перейти к оформлению</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BasketPage;
