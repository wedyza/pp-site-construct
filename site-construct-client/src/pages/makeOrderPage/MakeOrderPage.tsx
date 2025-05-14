import './makeOrderPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { fetchBasketWithGoods, setSelectedItems } from '../../store/basketSlice';
import { fetchPaymentMethods } from '../../store/paymentMethodsSlice';
import { formatPrice } from '../../utils/formatPrice';

const MakeOrderPage: React.FC = () => {
    const [selectedMethodId, setSelectedMethodId] = useState<number | undefined>(1);
    const [pickupPoint, setPickupPoint] = useState('г. Екатеринбург ул. Малышева 15');
    const dispatch = useAppDispatch();
    const { items, selectedIds } = useAppSelector((state) => state.basket);
    const selectedGoods = items.filter(({ item }) => selectedIds.includes(item.id));
    const { items: methods/*, loading*/ } = useAppSelector((state) => state.paymentMethods);
    
    useEffect(() => {
        localStorage.setItem('selectedBasketIds', JSON.stringify(selectedIds));
    }, [selectedIds]);
    
    useEffect(() => {
        dispatch(fetchBasketWithGoods());
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(fetchPaymentMethods());
    }, [dispatch]);

    useEffect(() => {
        if (items.length > 0) {
            const saved = localStorage.getItem('selectedBasketIds');
            if (saved) {
                const parsed = JSON.parse(saved);
                dispatch(setSelectedItems(parsed));
            }
        }
    }, [items, dispatch]);

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <h1 className='text-h1'>Оформление заказа</h1>
                <div className="make-order">
                    <div className="order_payment">
                        <h2 className="text-h2">Способ оплаты</h2>
                        <div className="order_payment-list">
                            {methods.map((method) => (
                                <div 
                                    key={method.id} 
                                    className='payment-method'
                                    onClick={() => setSelectedMethodId(method.id)}
                                >
                                    <div className={`order_payment-card ${selectedMethodId === method.id ? 'order_payment-card__active' : ''}`}>
                                        <p className='order_payment-bank text-card'>SberPay</p>
                                        <p className='order_payment-number'>{`...${method.card_body.slice(-4)}`}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order_del">
                        <h2 className="text-h2">Доставка</h2>
                        <div className="order_del-info">
                            <div className="order_del-item">
                                <p className='order_del-label text-n14'>Пункт выдачи</p>
                                <input
                                    className='order_del-value text-n16'
                                    type="text"
                                    value={pickupPoint}
                                    onChange={(e) => setPickupPoint(e.target.value)}
                                />
                                {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.8982 6.19949C17.8826 5.21504 17.8826 3.61894 16.8982 2.63449L15.6018 1.33813C14.6174 0.353685 13.0213 0.353685 12.0368 1.33813L1.86579 11.5091C1.44724 11.9277 1.18932 12.4802 1.13724 13.0698L0.915325 15.5819C0.827462 16.5765 1.65982 17.4088 2.65443 17.321L5.16648 17.0991C5.75611 17.047 6.3086 16.7891 6.72715 16.3705L16.8982 6.19949ZM15.9259 3.60677C16.3734 4.05424 16.3734 4.77974 15.9259 5.22722L15.0554 6.09774L12.1386 3.18093L13.0091 2.3104C13.4566 1.86293 14.1821 1.86293 14.6295 2.3104L15.9259 3.60677ZM11.1663 4.1532L14.0831 7.07001L5.75488 15.3982C5.56463 15.5885 5.3135 15.7057 5.04548 15.7294L2.53343 15.9513C2.39135 15.9639 2.27244 15.8449 2.28499 15.7029L2.5069 13.1908C2.53058 12.9228 2.64781 12.6717 2.83806 12.4814L11.1663 4.1532Z" fill="#FFA600"/>
                                </svg> */}
                            </div>
                            <div className="order_del-item">
                                <p className='order_del-label text-n14'>Срок хранения</p>
                                <p className='order_del-value text-n16'>14 дней</p>
                            </div>
                        </div>
                        <span className='order_del-type text-n14'>самовывоз</span>
                    </div>
                    <div className="order_items">
                        <h2 className="text-h2">Доставим 15 марта, бесплатно</h2>
                        <p className='text-n14 order_items-count'>{selectedGoods.length} товара</p>
                        <div className="order_items-list">
                            {selectedGoods.map((good) => (
                                <div className="order_items-card">
                                    <div className="order_item-img"></div>
                                    <div className="order_items-card-text">
                                        <p className="order_item-price text-price1">{good.good?.price && formatPrice(good.good?.price)} ₽</p>
                                        <p className="order_item-name text-n14 goods-card_name">{good.good?.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-info">
                        <div className='basket-placement_content'>
                            <div className="basket-placement_list">
                                {selectedGoods.map(({ good, item }) =>
                                    good ? (
                                        <div key={item.id} className="basket-placement_list-item">
                                            <span className='basket-placement_list__label text-n14'>
                                                {good.name}
                                            </span>
                                            <span className='basket-placement_list__value text-price1'>
                                                {good.price * item.count} ₽
                                            </span>
                                        </div>
                                    ) : null
                                )}
                            </div>
                            <div className="basket-placement_sum">
                                <span className='basket-placement_content__label text-desc'>Итого:</span>
                                <span className='basket-placement_content__value text-price2'>{selectedGoods.reduce((sum, { good, item }) => sum + (good ? good.price * item.count : 0), 0).toLocaleString()} ₽</span>
                            </div>
                        </div>
                        <button className='order-make_link btn-black text-n16'>
                            <span className='basket-placement_link-text'>Перейти к оформлению</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeOrderPage;
