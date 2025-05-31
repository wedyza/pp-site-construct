import { useEffect, useState } from 'react';
import Search from '../../components/search/Search';
import SellerNav from '../../components/sellerNav/SellerNav';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './sellerGoodsPage.scss'
import { Link } from 'react-router-dom';
import { deleteGood, fetchGoods, updateWarehouse } from '../../store/goodsSlice';
import { formatPrice } from '../../utils/formatPrice';
import Modal from '../../components/modal/Modal';

const SellerGoodsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const goods = useAppSelector((state) => state.goods.items);

    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);

    const handleDelete = (id:number) => {
        dispatch(deleteGood(id));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGoodId, setSelectedGoodId] = useState<number | null>(null);
    const [countInput, setCountInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedGoodId && countInput) {
            dispatch(updateWarehouse({id: selectedGoodId, warehouse: Number(countInput)}))
            .then(() => {
                setIsModalOpen(false);
                setCountInput('');
                setSelectedGoodId(null);
            });
        }
    }

    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-orders'>
                <div className='seller-orders_title'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.3124 10.0718L2.4707 6.58657L3.02914 5.33008L10.9999 8.87265L18.9707 5.33008L19.5291 6.58657L11.6874 10.0718V19.7083H10.3124V10.0718Z" fill="#02040F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.4974 1.76266C10.8174 1.62045 11.1826 1.62045 11.5026 1.76266L19.2026 5.18489C19.6495 5.38351 19.9375 5.82668 19.9375 6.31573V15.6842C19.9375 16.1732 19.6495 16.6164 19.2026 16.815L11.5026 20.2373C11.1826 20.3795 10.8174 20.3795 10.4974 20.2373L2.7974 16.815C2.35051 16.6164 2.0625 16.1732 2.0625 15.6842V6.31573C2.0625 5.82668 2.35051 5.38351 2.7974 5.18489L10.4974 1.76266ZM3.4375 6.40509V15.5948L11 18.956L18.5625 15.5948V6.40509L11 3.04397L3.4375 6.40509Z" fill="#02040F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.24693 3.84571C6.40114 3.49874 6.80742 3.34247 7.15439 3.49668L15.0778 7.01818C15.5247 7.2168 15.8127 7.65998 15.8127 8.14902V11.4583C15.8127 11.838 15.5049 12.1458 15.1252 12.1458C14.7455 12.1458 14.4377 11.838 14.4377 11.4583V8.23838L6.59595 4.75317C6.24898 4.59896 6.09272 4.19268 6.24693 3.84571Z" fill="#02040F"/>
                    </svg>
                    <h1 className='text-h3'>Мои товары <span className='seller-orders_title__accent'>Все ({goods.length})</span></h1>
                    <Link to='/seller/good' className='text-n14 seller-orders_create-btn'>
                        Создать новый товар
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                        </svg>
                    </Link>
                </div>
                {/* <div className="seller-orders_search-container">
                    <div className="seller-orders_search">
                        <Search
                            value={''}
                            onChange={() => {}}
                            onSubmit={() => {}}
                        />
                    </div>
                    <div className="seller-orders_search-sort text-n14">
                        По дате
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L7.53033 7.53033C7.23744 7.82322 6.76256 7.82322 6.46967 7.53033L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967Z" fill="#02040F"/>
                        </svg>
                    </div>
                </div> */}
                <div className='seller-goods_table seller-table text-n11'>
                    <div className='seller-orders_table-head seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>id</div>
                        <div className='seller-orders_table-cell'>Фото</div>
                        <div className='seller-orders_table-cell'>Наименование товара</div>
                        <div className='seller-orders_table-cell'>Категория</div>
                        <div className='seller-orders_table-cell'>Подкатегория</div>
                        <div className='seller-orders_table-cell'>Цена</div>
                        <div className='seller-orders_table-cell'>Товара в наличии</div>
                        <div className='seller-orders_table-cell'>Рейтинг</div>
                        <div className='seller-orders_table-cell'></div>
                    </div>
                    {goods.map((good, index) => (
                        <div className='seller-orders_table-body seller-orders_table-row' key={index}>
                            <div className='seller-orders_table-cell'>{good.id}</div>
                            <div className='seller-orders_table-cell seller-order_table-imgs'>
                                {good.media?.map((img) => (
                                    <div className='seller-order_table-img'>
                                        <img src={img.source} alt="" />
                                    </div>
                                ))}
                            </div>
                            <div className='seller-orders_table-cell'>{good.name}</div>
                            <div className='seller-orders_table-cell'>
                                Электроприборы
                            </div>
                            <div className='seller-orders_table-cell'>Электроприборы</div>
                            <div className='seller-orders_table-cell'>{good.price && formatPrice(good.price)} ₽</div>
                            <div className='seller-orders_table-cell seller-orders_table-cell__warehouse'>
                                {good.warehouse_count} шт
                                <button onClick={() => {
                                    setSelectedGoodId(good.id);
                                    setIsModalOpen(true);

                                }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7427 5.96311C14.4587 5.24715 14.4587 4.08635 13.7427 3.37039L12.7999 2.42758C12.0839 1.71162 10.9231 1.71162 10.2072 2.42758L2.81007 9.82468C2.50566 10.1291 2.31809 10.5309 2.28021 10.9597L2.11882 12.7867C2.05492 13.51 2.66027 14.1154 3.38362 14.0515L5.21056 13.8901C5.63938 13.8522 6.0412 13.6646 6.3456 13.3602L13.7427 5.96311ZM13.0356 4.07749C13.361 4.40293 13.361 4.93057 13.0356 5.256L12.4025 5.88911L10.2812 3.76779L10.9143 3.13468C11.2397 2.80925 11.7673 2.80925 12.0928 3.13468L13.0356 4.07749ZM9.57406 4.4749L11.6954 6.59622L5.63849 12.6531C5.50013 12.7915 5.31749 12.8767 5.12257 12.8939L3.29562 13.0553C3.19229 13.0645 3.10581 12.978 3.11494 12.8747L3.27633 11.0477C3.29355 10.8528 3.37881 10.6701 3.51717 10.5318L9.57406 4.4749Z" fill="black"/>
                                    </svg>
                                </button>
                            </div>
                            <div className='seller-orders_table-cell'>{good.rate?.rate__avg ? good.rate.rate__avg : '0'}</div>
                            <div className='seller-orders_table-cell'>
                                <div className="seller-goods_actions">
                                    <Link to={`/seller/good/${good.id}`}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.7427 5.96311C14.4587 5.24715 14.4587 4.08635 13.7427 3.37039L12.7999 2.42758C12.0839 1.71162 10.9231 1.71162 10.2072 2.42758L2.81007 9.82468C2.50566 10.1291 2.31809 10.5309 2.28021 10.9597L2.11882 12.7867C2.05492 13.51 2.66027 14.1154 3.38362 14.0515L5.21056 13.8901C5.63938 13.8522 6.0412 13.6646 6.3456 13.3602L13.7427 5.96311ZM13.0356 4.07749C13.361 4.40293 13.361 4.93057 13.0356 5.256L12.4025 5.88911L10.2812 3.76779L10.9143 3.13468C11.2397 2.80925 11.7673 2.80925 12.0928 3.13468L13.0356 4.07749ZM9.57406 4.4749L11.6954 6.59622L5.63849 12.6531C5.50013 12.7915 5.31749 12.8767 5.12257 12.8939L3.29562 13.0553C3.19229 13.0645 3.10581 12.978 3.11494 12.8747L3.27633 11.0477C3.29355 10.8528 3.37881 10.6701 3.51717 10.5318L9.57406 4.4749Z" fill="black"/>
                                        </svg>
                                    </Link>
                                    <button className='seller-goods_delete' onClick={() => handleDelete(good.id)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4213 5.50764C13.6933 5.55546 13.875 5.8147 13.8272 6.08667L12.4972 13.6508C12.4972 13.6509 12.4972 13.6509 12.4972 13.6509C12.3431 14.5275 11.5816 15.1667 10.6916 15.1667H5.31121C4.42116 15.1667 3.6597 14.5275 3.50558 13.6509L2.17561 6.08667C2.12779 5.8147 2.3095 5.55546 2.58147 5.50764C2.85344 5.45982 3.11268 5.64153 3.1605 5.9135L4.49047 13.4777C4.56053 13.8762 4.90666 14.1667 5.31121 14.1667H10.6916C11.0961 14.1667 11.4422 13.8762 11.5123 13.4777L11.5123 13.4777L12.8423 5.9135C12.8901 5.64153 13.1493 5.45982 13.4213 5.50764Z" fill="black"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.08333 1.83325C6.6231 1.83325 6.25 2.20635 6.25 2.66659V3.49992H9.75V2.66659C9.75 2.20634 9.37692 1.83325 8.91667 1.83325H7.08333ZM5.25 3.49992V2.66659C5.25 1.65406 6.07081 0.833252 7.08333 0.833252H8.91667C9.92921 0.833252 10.75 1.65407 10.75 2.66659V3.49992H14C14.2761 3.49992 14.5 3.72378 14.5 3.99992C14.5 4.27606 14.2761 4.49992 14 4.49992H2C1.72386 4.49992 1.5 4.27606 1.5 3.99992C1.5 3.72378 1.72386 3.49992 2 3.49992H5.25Z" fill="black"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="payment-modal">
                <h2 className='text-h2'>Изменить количество товара в наличии</h2>
                <form className='warehouse-modal_form' onSubmit={handleSubmit}>
                    <input
                        type="number"
                        className='payment-modal_input payment-modal_cvv text-n14'
                        placeholder='Введите количество'
                        value={countInput}
                        onChange={(e) => setCountInput(e.target.value)}
                        required
                    />
                    <button className='payment-modal_form-btn text-btn btn-black'>Сохранить</button>
                </form>
            </Modal>
        </div>
    );
};

export default SellerGoodsPage;
