import React, { useState } from 'react';
import './orderCard.scss'
import Modal from '../modal/Modal';
import RefundForm from '../refundForm/RefundForm';
import { Order } from '../../store/orderSlice';
import { formatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [isRefundGoodModalOpen, setIsRefundGoodModalOpen] = useState(false);
    const [isRefundDoneModalOpen, setIsRefundDoneModalOpen] = useState(false);

    return (
        <div className="order-card order-card__wide">
            <div className='order-card_info'>
                <p className='order-card_id text-card'>№{order.id}</p>
                <p className='order-card_status text-n14'>{order.status}</p>
                {/* <div className='order-card_info-item'>
                    <p className='order-card_info-item__label text-n14'>Дата оформления заказа</p>
                    <p className='order-card_info-item__value text-n16'>{order.placement_date}</p>
                </div> */}
                <div className='order-card_info-item'>
                    <p className='order-card_info-item__label text-n14'>В пункт выдачи</p>
                    <p className='order-card_info-item__value text-n16'>{order.address}</p>
                </div>
                <div className='order-card_info-item'>
                    <p className='order-card_info-item__label text-n14'>
                        {order.status === 'Получен' ? 'Дата доставки' : 'Ожидаемая дата доставки'}
                    </p>
                    <p className='order-card_info-item__value text-n16'>{order.delivery_date}</p>
                </div>
                <div className='order-card_info-item order-card_info-item__price'>
                    <p className='order-card_info-item__label text-n14'>Оплачено</p>
                    <p className={`order-card_info-item__value text-n16 ${order.status !== 'Получен' && 'order-card_price__bold'}`}>{formatPrice(order.payment_total)} ₽</p>
                </div>
                {order.status === 'Создан' && (
                    <div className='order-card_actions'>
                        <div className='order-card_action text-n14 order-card_cancel'>
                            <span>Отменить заказ</span>
                        </div>
                    </div>
                )}
                {order.status === 'Получен' && (
                    <div className='order-card_actions'>
                        <div className='order-card_action text-n14 order-card_rate'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.75 1.8125C2.23223 1.8125 1.8125 2.23223 1.8125 2.75V13.8964L3.3604 11.9616C3.7518 11.4723 4.34438 11.1875 4.97094 11.1875H13.25C13.7678 11.1875 14.1875 10.7678 14.1875 10.25V2.75C14.1875 2.23223 13.7678 1.8125 13.25 1.8125H2.75ZM0.6875 2.75C0.6875 1.61091 1.61091 0.6875 2.75 0.6875H13.25C14.3891 0.6875 15.3125 1.61091 15.3125 2.75V10.25C15.3125 11.3891 14.3891 12.3125 13.25 12.3125H4.97094C4.68614 12.3125 4.41678 12.442 4.23887 12.6643L2.49063 14.8497C1.89274 15.597 0.6875 15.1742 0.6875 14.2171V2.75Z" fill="black"/>
                            </svg>
                            <span>Оставить отзыв и оценить заказ</span>
                        </div>
                        <div className='order-card_action text-n14 order-card_refund'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_197_1764)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.8315 5.16852 15.9375 9 15.9375C12.8315 15.9375 15.9375 12.8315 15.9375 9C15.9375 5.16852 12.8315 2.0625 9 2.0625ZM0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 13.4528 13.4528 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.99077 5.8125C7.27591 5.8125 5.96033 6.96164 5.80906 8.31259C5.77449 8.62132 5.49619 8.84358 5.18746 8.80901C4.87873 8.77444 4.65647 8.49614 4.69104 8.18741C4.917 6.16947 6.80699 4.6875 8.99077 4.6875C10.7265 4.6875 12.2585 5.61461 12.9418 7.00137C13.0791 7.28004 12.9645 7.61726 12.6859 7.75457C12.4072 7.89188 12.07 7.77729 11.9327 7.49863C11.4558 6.53085 10.3381 5.8125 8.99077 5.8125Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.7498 5.0625C13.0604 5.0625 13.3123 5.31434 13.3123 5.625V6.84167C13.3123 7.40086 12.8589 7.85417 12.2998 7.85417H10.8701C10.5595 7.85417 10.3076 7.60233 10.3076 7.29167C10.3076 6.98101 10.5595 6.72917 10.8701 6.72917H12.1873V5.625C12.1873 5.31434 12.4391 5.0625 12.7498 5.0625Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.00925 12.1875C10.6185 12.1875 12.0225 10.8167 12.1897 8.94981C12.2174 8.64039 12.4907 8.41203 12.8002 8.43974C13.1096 8.46746 13.3379 8.74077 13.3102 9.05019C13.1002 11.3944 11.2986 13.3125 9.00925 13.3125C7.20222 13.3125 5.69091 12.1089 5.03946 10.4563C4.92553 10.1673 5.06747 9.84062 5.35648 9.72669C5.6455 9.61276 5.97215 9.7547 6.08608 10.0437C6.59483 11.3343 7.73318 12.1875 9.00925 12.1875Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.25024 12.8623C4.93958 12.8623 4.68774 12.6105 4.68774 12.2998V10.6665C4.68774 10.1073 5.14105 9.65397 5.70024 9.65397H7.12988C7.44054 9.65397 7.69238 9.90581 7.69238 10.2165C7.69238 10.5271 7.44054 10.779 7.12988 10.779H5.81274V12.2998C5.81274 12.6105 5.5609 12.8623 5.25024 12.8623Z" fill="black"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_197_1764">
                                <rect width="18" height="18" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <button onClick={() => setIsRefundModalOpen(true)}>
                                Оформить возврат
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className='order-card_imgs'>
                {order && order.items?.map((good, index) => (
                    <Link to={`/product/${good.good_item.id}`} className='order_good-img' key={index}>
                        {good.good_item.media &&  good.good_item.media.length > 0 && (
                            <img src={good.good_item.media[0].source} alt="" />
                        )}
                        
                        <svg className='order-card_rate-arrow' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.770001 1C0.770001 0.585786 1.10579 0.25 1.52 0.25L14 0.25C14.4142 0.25 14.75 0.585786 14.75 1V13.48C14.75 13.8942 14.4142 14.23 14 14.23C13.5858 14.23 13.25 13.8942 13.25 13.48V2.81066L1.53033 14.5303C1.23744 14.8232 0.762563 14.8232 0.46967 14.5303C0.176777 14.2374 0.176777 13.7626 0.46967 13.4697L12.1893 1.75L1.52 1.75C1.10579 1.75 0.770001 1.41421 0.770001 1Z" fill="black"/>
                        </svg>
                    </Link>
                ))}
            </div>
            <Modal
                isOpen={isRefundModalOpen}
                onClose={() => setIsRefundModalOpen(false)}
                className="order_refund-modal"
            >
                <h2 className='text-h2'>Оформление возврата</h2>
                <button className='refund-modal_exit modal_exit-btn' onClick={() => setIsRefundModalOpen(false)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.227072 0.22703C0.519965 -0.0658633 0.994839 -0.0658636 1.28773 0.22703L6.00004 4.93934L10.7124 0.22703C11.0052 -0.0658633 11.4801 -0.0658637 11.773 0.22703C12.0659 0.519923 12.0659 0.994797 11.773 1.28769L7.0607 6L11.773 10.7123C12.0659 11.0052 12.0659 11.4801 11.773 11.773C11.4801 12.0659 11.0052 12.0659 10.7124 11.773L6.00004 7.06066L1.28773 11.773C0.994839 12.0659 0.519965 12.0659 0.227072 11.773C-0.0658213 11.4801 -0.0658213 11.0052 0.227072 10.7123L4.93938 6L0.227072 1.28769C-0.0658213 0.994797 -0.0658213 0.519923 0.227072 0.22703Z" fill="#02040F"/>
                    </svg>
                </button>

                <div className='refund-modal_info'>
                    <p className='refund-modal_info-id text-card'>№4565854</p>
                    <div className="refund-modal_info-item">
                        <p className='refund-modal_info-label text-n14'>
                            Дата оформления заказа
                        </p>
                        <p className='refund-modal_info-value text-n16'>
                            6 марта
                        </p>
                    </div>
                    <div className="refund-modal_info-item">
                        <p className='refund-modal_info-label text-n14'>
                            В пункт выдачи
                        </p>
                        <p className='refund-modal_info-value text-n16'>
                            г. Екатеринбург ул. Малышева 15
                        </p>
                    </div>
                    <div className="refund-modal_info-item">
                        <p className='refund-modal_info-label text-n14'>
                            Дата доставки
                        </p>
                        <p className='refund-modal_info-value text-n16'>
                            8 марта
                        </p>
                    </div>
                    <div className="refund-modal_info-item">
                        <p className='refund-modal_info-label text-n14'>
                            Оплачено
                        </p>
                        <p className='refund-modal_info-value text-n16'>
                            704 ₽
                        </p>
                    </div>
                </div>
                <p className='text-desc refund-modal_select-title'>Выберете заказ для оформления возврата</p>
                <div className="refund-modal_select-list">
                    <div className="refund-modal_select-item">
                        <div className="refund_select-img"></div>
                        <button
                            className="refund_select-btn text-n14"
                            onClick={() => {
                                setIsRefundModalOpen(false);
                                setIsRefundGoodModalOpen(true);
                            }}
                        >
                            Этот товар
                        </button>
                    </div>
                    <div className="refund-modal_select-item">
                        <div className="refund_select-img"></div>
                        <button
                            className="refund_select-btn text-n14"
                            onClick={() => {
                                setIsRefundModalOpen(false);
                                setIsRefundGoodModalOpen(true);
                            }}
                        >
                            Этот товар
                        </button>
                    </div>
                    <div className="refund-modal_select-item">
                        <div className="refund_select-img"></div>
                        <button
                            className="refund_select-btn text-n14"
                            onClick={() => {
                                setIsRefundModalOpen(false);
                                setIsRefundGoodModalOpen(true);
                            }}
                        >
                            Этот товар
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isRefundGoodModalOpen}
                onClose={() => setIsRefundGoodModalOpen(false)}
                className="order_refund-modal"
            >
                <h2 className='text-h2'>Оформление возврата</h2>
                <button className='refund-modal_exit modal_exit-btn' onClick={() => setIsRefundModalOpen(false)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.227072 0.22703C0.519965 -0.0658633 0.994839 -0.0658636 1.28773 0.22703L6.00004 4.93934L10.7124 0.22703C11.0052 -0.0658633 11.4801 -0.0658637 11.773 0.22703C12.0659 0.519923 12.0659 0.994797 11.773 1.28769L7.0607 6L11.773 10.7123C12.0659 11.0052 12.0659 11.4801 11.773 11.773C11.4801 12.0659 11.0052 12.0659 10.7124 11.773L6.00004 7.06066L1.28773 11.773C0.994839 12.0659 0.519965 12.0659 0.227072 11.773C-0.0658213 11.4801 -0.0658213 11.0052 0.227072 10.7123L4.93938 6L0.227072 1.28769C-0.0658213 0.994797 -0.0658213 0.519923 0.227072 0.22703Z" fill="#02040F"/>
                    </svg>
                </button>
                
                <div className='refund-modal_info'>
                    <p className='refund-modal_info-id text-card'>№4565854</p>
                    <div className="refund-modal_info-item">
                        <p className='refund-modal_info-label text-n14'>
                            Дата оформления заказа
                        </p>
                        <p className='refund-modal_info-value text-n16'>
                            6 марта
                        </p>
                    </div>
                    <div className="refund-modal_info-item">
                        <p className='refund-modal_info-label text-n14'>
                            В пункт выдачи
                        </p>
                        <p className='refund-modal_info-value text-n16'>
                            г. Екатеринбург ул. Малышева 15
                        </p>
                    </div>
                    <div className="refund-modal_info-item">
                        <p className='refund-modal_info-label text-n14'>
                            Дата доставки
                        </p>
                        <p className='refund-modal_info-value text-n16'>
                            8 марта
                        </p>
                    </div>
                    <div className="refund-modal_info-item">
                        <p className='refund-modal_info-label text-n14'>
                            Оплачено
                        </p>
                        <p className='refund-modal_info-value text-n16'>
                            704 ₽
                        </p>
                    </div>
                </div>
                <div className='refund-good_content'>
                    <div className="refund-good_current">
                        <div className="refund-good_img"></div>
                        <button 
                            className="refund-good_btn text-n14"
                            onClick={(e) => {
                                setIsRefundGoodModalOpen(false);
                                //setTimeout(() => setIsRefundModalOpen(true), 0);
                                setIsRefundModalOpen(true);
                            }}
                        >
                            Не этот товар
                        </button>
                    </div>
                    <RefundForm setIsOpenFirst={setIsRefundGoodModalOpen} setIsOpenSecond={setIsRefundDoneModalOpen} />
                </div>
            </Modal>
            <Modal
                isOpen={isRefundDoneModalOpen}
                onClose={() => setIsRefundDoneModalOpen(false)}
                className="order_refund-done-modal"
            >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M30 3.125C15.1573 3.125 3.125 15.1573 3.125 30C3.125 44.8427 15.1573 56.875 30 56.875C44.8427 56.875 56.875 44.8427 56.875 30C56.875 15.1573 44.8427 3.125 30 3.125ZM18.8261 29.9242C18.0939 29.1919 16.9067 29.1919 16.1745 29.9242C15.4422 30.6564 15.4422 31.8436 16.1745 32.5758L23.6745 40.0758C24.4067 40.8081 25.5939 40.8081 26.3261 40.0758L43.8261 22.5758C44.5583 21.8436 44.5583 20.6564 43.8261 19.9242C43.0939 19.1919 41.9067 19.1919 41.1745 19.9242L25.0003 36.0983L18.8261 29.9242Z" fill="#FFA600"/>
                </svg>
                <p className='text-n16'>Возврат оформлен</p>
            </Modal>
        </div>
    );
};

export default OrderCard;