import SellerNav from '../../components/sellerNav/SellerNav';
import './sellerFinancePage.scss'

const SellerFinancePage: React.FC = () => {
    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-finance'>
                <div className='text-h3 seller-finance_title'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.0625 8.25008C2.0625 6.85786 3.19112 5.72925 4.58333 5.72925H17.4167C18.8089 5.72925 19.9375 6.85786 19.9375 8.25008V16.5001C19.9375 17.8923 18.8089 19.0209 17.4167 19.0209H4.58333C3.19112 19.0209 2.0625 17.8923 2.0625 16.5001V8.25008ZM4.58333 7.10425C3.95051 7.10425 3.4375 7.61726 3.4375 8.25008V16.5001C3.4375 17.1329 3.95051 17.6459 4.58333 17.6459H17.4167C18.0495 17.6459 18.5625 17.1329 18.5625 16.5001V8.25008C18.5625 7.61726 18.0495 7.10425 17.4167 7.10425H4.58333Z" fill="#02040F"/>
                        <path d="M15.1257 12.8334C14.8725 12.8334 14.6673 12.6282 14.6673 12.3751C14.6673 12.122 14.8725 11.9167 15.1257 11.9167C15.3788 11.9167 15.584 12.122 15.584 12.3751C15.584 12.6282 15.3788 12.8334 15.1257 12.8334Z" fill="#02040F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.1257 12.6042C14.9991 12.6042 14.8965 12.5016 14.8965 12.3751C14.8965 12.2485 14.9991 12.1459 15.1257 12.1459C15.2522 12.1459 15.3548 12.2485 15.3548 12.3751C15.3548 12.5016 15.2522 12.6042 15.1257 12.6042ZM16.2715 12.3751C16.2715 11.7423 15.7585 11.2292 15.1257 11.2292C14.4928 11.2292 13.9798 11.7423 13.9798 12.3751C13.9798 13.0079 14.4928 13.5209 15.1257 13.5209C15.7585 13.5209 16.2715 13.0079 16.2715 12.3751Z" fill="#02040F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.8125 5.13622C15.8125 4.38338 15.0989 3.8351 14.3714 4.02908L4.28809 6.71797C3.7865 6.85173 3.4375 7.30599 3.4375 7.82511V8.24994H2.0625V7.82511C2.0625 6.68305 2.83031 5.68366 3.93381 5.3894L14.0171 2.70051C15.6175 2.27375 17.1875 3.47996 17.1875 5.13622V6.4166H15.8125V5.13622Z" fill="#02040F"/>
                    </svg>
                    <h1>Финансы</h1>
                </div>
                    
                <div className='seller-finance_table seller-table text-n11'>
                    <div className='seller-orders_table-head seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>Дата транзакции</div>
                        <div className='seller-orders_table-cell'>Дата заказа</div>
                        <div className='seller-orders_table-cell'>Номер заказа</div>
                        <div className='seller-orders_table-cell'>Детали</div>
                        <div className='seller-orders_table-cell'>Сумма заказа</div>
                        <div className='seller-orders_table-cell'>Комиссия</div>
                        <div className='seller-orders_table-cell'>Доставка</div>
                        <div className='seller-orders_table-cell'>Итого</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                    <div className='seller-orders_table-body seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                        <div className='seller-orders_table-cell'>565156488</div>
                        <div className='seller-orders_table-cell'>
                            Робот мойщик окон с распылением <span className='seller-orders_count'>(3шт)</span>
                        </div>
                        <div className='seller-orders_table-cell'>5 520 ₽</div>
                        <div className='seller-orders_table-cell'>540 ₽</div>
                        <div className='seller-orders_table-cell'>63 ₽</div>
                        <div className='seller-orders_table-cell'>5200 ₽</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerFinancePage;
