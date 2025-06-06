import React from 'react';
import './purchasedCard.scss'
import { Good } from '../../store/goodsSlice';
import { Order } from '../../store/orderSlice';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

interface OrderCardProps {
    good: Good;
    order?: Order;
    onOpen: (good: Good) => void;
}

const PurchasedCard: React.FC<OrderCardProps> = ({ good, order, onOpen }) => {
    return (
        <Link to={`/product/${good.id}`} className="order-card">
            <div className='order_good-card_info'>
                <p className='order-card_id text-card'>№{good.id}</p>
                {order ? (
                    <>
                        <p className='order-card_status text-n14'>возвращен</p>
                        {/* <div className='order-card_info-item'>
                            <p className='order-card_info-item__label text-n14'>Дата оформления заказа</p>
                            <p className='order-card_info-item__value text-n16'>{order.placement_date}</p>
                        </div> */}
                        <div className='order-card_info-item'>
                            <p className='order-card_info-item__label text-n14'>В пункт выдачи</p>
                            <p className='order-card_info-item__value text-n16'>{order.address}</p>
                        </div>
                        {/* <div className='order-card_info-item'>
                            <p className='order-card_info-item__label text-n14'>Дата доставки</p>
                            <p className='order-card_info-item__value text-n16'>{order.delivery_date}</p>
                        </div> */}
                    </>
                ) : (
                    <p className='order-card_status text-n14'>получен</p>
                )}
                <div className='order-card_info-item'>
                    <p className='order-card_info-item__label text-n14'>Оплачено</p>
                    <p className='order-card_info-item__value text-n16'>{formatPrice(good.price)} ₽</p>
                </div>
                {/* <p className='order-card_status text-n14'>{good.status}</p>
                <div className='order-card_info-item'>
                    <p className='order-card_info-item__label text-n14'>Дата оформления заказа</p>
                    <p className='order-card_info-item__value text-n16'>{good.placement_date}</p>
                </div>
                <div className='order-card_info-item'>
                    <p className='order-card_info-item__label text-n14'>В пункт выдачи</p>
                    <p className='order-card_info-item__value text-n16'>{good.address}</p>
                </div>
                <div className='order-card_info-item'>
                    <p className='order-card_info-item__label text-n14'>Дата доставки</p>
                    <p className='order-card_info-item__value text-n16'>{good.delivery_date}</p>
                </div>
                <div className='order-card_info-item'>
                    <p className='order-card_info-item__label text-n14'>Оплачено</p>
                    <p className='order-card_info-item__value text-n16'>{good.payment_total} ₽</p>
                </div> */}
                <button className='order-card_action text-n14 order-card_rate' onClick={(e) => {
                    onOpen(good);
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.75 1.8125C2.23223 1.8125 1.8125 2.23223 1.8125 2.75V13.8964L3.3604 11.9616C3.7518 11.4723 4.34438 11.1875 4.97094 11.1875H13.25C13.7678 11.1875 14.1875 10.7678 14.1875 10.25V2.75C14.1875 2.23223 13.7678 1.8125 13.25 1.8125H2.75ZM0.6875 2.75C0.6875 1.61091 1.61091 0.6875 2.75 0.6875H13.25C14.3891 0.6875 15.3125 1.61091 15.3125 2.75V10.25C15.3125 11.3891 14.3891 12.3125 13.25 12.3125H4.97094C4.68614 12.3125 4.41678 12.442 4.23887 12.6643L2.49063 14.8497C1.89274 15.597 0.6875 15.1742 0.6875 14.2171V2.75Z" fill="black"/>
                    </svg>
                    <span>
                        {good.able_to_comment
                             ? 'Оставить отзыв и оценить товар'
                             : 'Редактировать отзыв'
                        }
                    </span>
                </button>
            </div>
            <div className='order-card_img'>
                {good.media && good.media.length > 0 && (
                    <img src={good.media[0].source} alt="" />
                )}
            </div>
            <svg className='order-card_rate-arrow' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.770001 1C0.770001 0.585786 1.10579 0.25 1.52 0.25L14 0.25C14.4142 0.25 14.75 0.585786 14.75 1V13.48C14.75 13.8942 14.4142 14.23 14 14.23C13.5858 14.23 13.25 13.8942 13.25 13.48V2.81066L1.53033 14.5303C1.23744 14.8232 0.762563 14.8232 0.46967 14.5303C0.176777 14.2374 0.176777 13.7626 0.46967 13.4697L12.1893 1.75L1.52 1.75C1.10579 1.75 0.770001 1.41421 0.770001 1Z" fill="black"/>
            </svg>
        </Link>
    );
};

export default PurchasedCard;