import { Link } from 'react-router-dom';
import SellerNav from '../../components/sellerNav/SellerNav';
import './sellerMainPage.scss'

const SellerMainPage: React.FC = () => {
    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-main'>
                <div className='seller-main_first seller-main_column'>
                    <div className='seller-main_item'>
                        <h1 className='text-h3 seller-main_item-title'>Основные KPI</h1>
                        <div className='seller-main_item-body seller-main_kpi-body'>
                            <div className='seller-main_kpi-item'>
                                <span className='seller-main_kpi-label text-n14'>
                                    Выручка в марте
                                </span>
                                <div className='seller-main_kpi-value-main'>
                                    <span className='seller-main_kpi-value text-n16'>
                                        152 000 ₽
                                    </span>
                                    <span className='seller-main_kpi-stat text-n14'>
                                        (+12% за неделю)
                                    </span>
                                </div>
                            </div>
                            <div className='seller-main_kpi-item'>
                                <span className='seller-main_kpi-label text-n14'>
                                    Заказы в марте
                                </span>
                                <div className='seller-main_kpi-value-main'>
                                    <span className='seller-main_kpi-value text-n16'>
                                        87
                                    </span>
                                    <span className='seller-main_kpi-stat text-n14'>
                                        (+5 новых)
                                    </span>
                                </div>
                            </div>
                            <div className='seller-main_kpi-item'>
                                <span className='seller-main_kpi-label text-n14'>
                                    Отмены в марте
                                </span>
                                <div className='seller-main_kpi-value-main'>
                                    <span className='seller-main_kpi-value text-n16'>
                                        3
                                    </span>
                                    <span className='seller-main_kpi-stat text-n14'>
                                        (4% от заказов)
                                    </span>
                                </div>
                            </div>
                            <div className='seller-main_kpi-item'>
                                <span className='seller-main_kpi-label text-n14'>
                                    Общий рейтинг магазина
                                </span>
                                <div className='seller-main_kpi-value-main'>
                                    <span className='seller-main_kpi-value text-n16'>
                                        4.8
                                    </span>
                                    <span className='seller-main_kpi-stat text-n14'>
                                        (+142 отзыва за март)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='seller-main_item'>
                        <h1 className='text-h3 seller-main_item-title'>К отправке сегодня (12 мая)</h1>
                        <div className='seller-main_item-body seller-main_del-body'>
                            <div className='seller-main_del-head'>
                                <p className='text-desc'>19 заказов</p>
                                <Link to='' className='text-n14'>
                                    <span className='seller-main_del-link'>Смотреть все</span>
                                </Link>
                            </div>
                            <div className='seller-main_del-list'>
                                <div className='seller-main_del-item'>
                                    <div className='seller-main_del-item-id text-n11'>
                                        № 1235654
                                    </div>
                                    <div className='seller-main_del-item-info text-n11'>
                                        <span>Смартфон XIAOMI 13</span>
                                        <span>1шт</span>
                                        <span>до 18:00</span>
                                    </div>
                                </div>
                                <div className='seller-main_del-item'>
                                    <div className='seller-main_del-item-id text-n11'>
                                        № 1235654
                                    </div>
                                    <div className='seller-main_del-item-info text-n11'>
                                        <span>Смартфон XIAOMI 13</span>
                                        <span>1шт</span>
                                        <span>до 18:00</span>
                                    </div>
                                </div>
                                <div className='seller-main_del-item'>
                                    <div className='seller-main_del-item-id text-n11'>
                                        № 1235654
                                    </div>
                                    <div className='seller-main_del-item-info text-n11'>
                                        <span>Смартфон XIAOMI 13</span>
                                        <span>1шт</span>
                                        <span>до 18:00</span>
                                    </div>
                                </div>
                                <div className='seller-main_del-item'>
                                    <div className='seller-main_del-item-id text-n11'>
                                        № 1235654
                                    </div>
                                    <div className='seller-main_del-item-info text-n11'>
                                        <span>Смартфон XIAOMI 13</span>
                                        <span>1шт</span>
                                        <span>до 18:00</span>
                                    </div>
                                </div>
                                <div className='seller-main_del-item'>
                                    <div className='seller-main_del-item-id text-n11'>
                                        № 1235654
                                    </div>
                                    <div className='seller-main_del-item-info text-n11'>
                                        <span>Смартфон XIAOMI 13</span>
                                        <span>1шт</span>
                                        <span>до 18:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='seller-main_second seller-main_column'>
                    <div className='seller-main_item'>
                        <div className='seller-main_item-title seller-main_rem-title'>
                            <h1 className='text-h3'>
                                Остатки товаров
                            </h1>
                            <Link to='' className='text-n14'>Подробнее</Link>
                        </div>
                        <div className='seller-main_item-body'>
                            <div className="seller-main_rem-table text-n11">
                                <div className="seller-main_rem-head">
                                    <p className="seller-main_rem-cell">№</p>
                                    <p className="seller-main_rem-cell">Товар</p>
                                    <p className="seller-main_rem-cell">Продажи за нед.</p>
                                    <p className="seller-main_rem-cell">Остаток</p>
                                    <p className="seller-main_rem-cell">Статус</p>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">1</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">2</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">3</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">4</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">5</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">6</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">7</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">8</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">9</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                                <div className="seller-main_rem-row">
                                    <p className="seller-main_rem-cell">10</p>
                                    <p className="seller-main_rem-cell">Смартфон XIAOMI 13</p>
                                    <p className="seller-main_rem-cell">45</p>
                                    <p className="seller-main_rem-cell">456</p>
                                    <div className="seller-main_rem-cell">
                                        <div className="seller-main_rem-cell-img"></div>
                                        В наличии
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='seller-main_item'>
                        <div className='seller-main_item-title seller-main_dyn-title'>
                            <h1 className='text-h3'>
                                Динамика продаж
                            </h1>
                        </div>
                        <div className='seller-main_item-body'>
                            <div className="grafictemp"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerMainPage;
