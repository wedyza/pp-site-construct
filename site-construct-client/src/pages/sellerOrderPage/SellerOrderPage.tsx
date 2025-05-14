import SellerNav from '../../components/sellerNav/SellerNav';
import './sellerOrderPage.scss'

const SellerOrderPage: React.FC = () => {
    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-order'>
                <h1 className='text-h3'>Обработка заказа</h1>
                <div className="seller-order_main">
                    <div className='seller-order_info'>
                        <h2 className='seller-order_info-title seller-order_title text-desc'>
                            Основная информация
                        </h2>
                        <p className='seller-order_info-id text-card'>
                            №4565854
                        </p>
                        <div className='seller-order_info-list seller-order_list'>
                            <div className='seller-order_info-item seller-order_item'>
                                <span className='seller-order_label seller-order_info-label text-n14'>
                                    Дата и время оформления заказа
                                </span>
                                <span className='seller-order_value seller-order_info-value text-n16'>
                                    6 марта, 14:51
                                </span>
                            </div>
                            <div className='seller-order_info-item seller-order_item'>
                                <span className='seller-order_label seller-order_info-label text-n14'>
                                    Срок  отправления
                                </span>
                                <span className='seller-order_value seller-order_info-value text-n16'>
                                    6 марта, 14:51 <span className='seller-order_value__accent'>(осталось 2 ч 15 мин)</span>
                                </span>
                            </div>
                            <div className='seller-order_info-item seller-order_item'>
                                <span className='seller-order_label seller-order_info-label text-n14'>
                                    Доставка
                                </span>
                                <span className='seller-order_value seller-order_info-value text-n16'>
                                    г. Екатеринбург ул. Малышева 15, 13.05 – 15.05
                                </span>
                            </div>
                            <div className='seller-order_info-item seller-order_item'>
                                <span className='seller-order_label seller-order_info-label text-n14'>
                                    Сумма
                                </span>
                                <span className='seller-order_value seller-order_info-value text-n16'>
                                    704 ₽ <span className='seller-order_value__accent'>(доход с заказа 650)</span>
                                </span>
                            </div>
                        </div>
                        <h2 className='seller-order_buyer-title seller-order_title text-desc'>
                            Данные покупателя
                        </h2>
                        <div className='seller-order_buyer-list seller-order_list'>
                            <div className='seller-order_buyer-item seller-order_item'>
                                <span className='seller-order_label seller-order_buyer-label text-n14'>
                                    Покупатель
                                </span>
                                <span className='seller-order_value seller-order_buyer-value text-n16'>
                                    Иванов Алексей 
                                </span>
                            </div>
                            <div className='seller-order_buyer-item seller-order_item'>
                                <span className='seller-order_label seller-order_buyer-label text-n14'>
                                    Телефон
                                </span>
                                <span className='seller-order_value seller-order_buyer-value text-n16'>
                                    +7 (XXX) XXX-XX-XX (замаскирован)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="seller-order_items">
                    <h2 className='seller-order_title text-desc'>Товары</h2>                    
                    <div className='seller-order_table text-n11'>
                        <div className='seller-orders_table-head seller-orders_table-row'>
                            <div className='seller-orders_table-cell'>id</div>
                            <div className='seller-orders_table-cell'>Фото</div>
                            <div className='seller-orders_table-cell'>Наименование товара</div>
                            <div className='seller-orders_table-cell'>Количество</div>
                            <div className='seller-orders_table-cell'>Цена</div>
                            <div className='seller-orders_table-cell'>Товара в наличии</div>
                        </div>
                        <div className='seller-orders_table-body seller-orders_table-row'>
                            <div className='seller-orders_table-cell'>4565854</div>
                            <div className='seller-orders_table-cell seller-order_table-imgs'>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                            </div>
                            <div className='seller-orders_table-cell'>Робот мойщик окон с распылением</div>
                            <div className='seller-orders_table-cell'>1 шт</div>
                            <div className='seller-orders_table-cell'>5 520 ₽</div>
                            <div className='seller-orders_table-cell'>480 шт</div>
                        </div>
                        <div className='seller-orders_table-body seller-orders_table-row'>
                            <div className='seller-orders_table-cell'>4565854</div>
                            <div className='seller-orders_table-cell seller-order_table-imgs'>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                                <div className='seller-order_table-img'></div>
                            </div>
                            <div className='seller-orders_table-cell'>Робот мойщик окон с распылением</div>
                            <div className='seller-orders_table-cell'>1 шт</div>
                            <div className='seller-orders_table-cell'>5 520 ₽</div>
                            <div className='seller-orders_table-cell'>480 шт</div>
                        </div>
                    </div>
                </div>
                <button className='seller-order_btn btn-black text-btn'>
                    Заказ обработан и передан в доставку
                </button>
            </div>
        </div>
    );
};

export default SellerOrderPage;
