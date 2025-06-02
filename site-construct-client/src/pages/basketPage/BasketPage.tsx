import React, { useEffect } from 'react';
import './basketPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import BasketCard from '../../components/basketCard/BasketCard';
import CustomCheckbox from '../../components/customCheckbox/CustomCheckbox';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearSelectedItems, fetchBasketWithGoods, setSelectedItems } from '../../store/basketSlice';
import { formatPrice } from '../../utils/formatPrice';
import empty from '../../img/basket.png'

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
        if (saved) {
            const parsed = JSON.parse(saved);
            dispatch(setSelectedItems(parsed));
        }
    }, [dispatch]);
    
    useEffect(() => {
        document.title = `Корзина | Kaufen`;

        return () => {
            document.title = 'Kaufen';
        };
    }, []);

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content basket-page">
                {items.length > 0 ? (
                    <>
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
                    </>
                ) : (
                    <div className='basket-empty'>
                        <img src={empty} className='basket-empty_img' alt="" />
                        <div className='basket-empty_info'>
                            <p className='basket-empty_text text-n16'>
                                У вас пока нет товаров в корзине, 
                                давайте это исправим
                            </p>
                            <Link to='/' className="empty-orders_link btn-black">
                                <span className="text-n16 empty-orders_link-text">К покупкам</span>
                            </Link>
                            <svg className='empty-orders_arrow' width="47" height="68" viewBox="0 0 47 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.1498 64.6966C16.618 64.5479 16.3074 63.9961 16.4561 63.4643L18.88 54.7968C19.0287 54.2649 19.5805 53.9543 20.1123 54.1031C20.6442 54.2518 20.9548 54.8036 20.8061 55.3354L18.6515 63.0398L26.3559 65.1944C26.8878 65.3431 27.1984 65.8949 27.0497 66.4268C26.9009 66.9586 26.3492 67.2692 25.8173 67.1205L17.1498 64.6966ZM1.23724 0.115463C23.549 5.5643 35.9807 12.261 41.9105 19.4136C44.8986 23.0179 46.2368 26.7406 46.3356 30.4407C46.4338 34.1234 45.3027 37.7035 43.4885 41.0442C39.8726 47.7027 33.4398 53.5978 27.9889 57.7961C25.2515 59.9044 22.737 61.6035 20.9061 62.776C19.9902 63.3625 19.2444 63.8179 18.7261 64.1275C18.4669 64.2823 18.2645 64.4007 18.126 64.4809C18.0568 64.521 18.0036 64.5516 17.9672 64.5723C17.9491 64.5827 17.9351 64.5906 17.9255 64.5961C17.9207 64.5988 17.9169 64.6009 17.9143 64.6024C17.913 64.6031 17.9118 64.6038 17.9112 64.6042C17.9103 64.6047 17.9097 64.605 17.4192 63.7336C16.9286 62.8622 16.9286 62.8622 16.9288 62.8621C16.9292 62.8618 16.9298 62.8615 16.9306 62.861C16.9324 62.86 16.9353 62.8584 16.9392 62.8562C16.9471 62.8517 16.9593 62.8448 16.9757 62.8354C17.0085 62.8167 17.0581 62.7882 17.1236 62.7503C17.2547 62.6744 17.4493 62.5605 17.7005 62.4105C18.2028 62.1104 18.9308 61.666 19.8275 61.0918C21.6216 59.9428 24.0868 58.277 26.7685 56.2116C32.1557 52.0623 38.3183 46.374 41.7309 40.0898C43.431 36.9592 44.4225 33.728 44.3363 30.4941C44.2505 27.2777 43.097 23.9784 40.3708 20.69C34.872 14.0572 22.9845 7.48521 0.762759 2.05836L1.23724 0.115463Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BasketPage;
