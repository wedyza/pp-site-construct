import { useParams } from 'react-router-dom';
import SellerNav from '../../components/sellerNav/SellerNav';
import './sellerGoodPage.scss'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createGood, fetchGoodById } from '../../store/goodsSlice';

const SellerGoodPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const selectedItem = useAppSelector((state) => state.goods.selectedItem);

    const [titleInput, setTitleInput] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [descInput, setDescInput] = useState('');
    
    useEffect(() => {
        if (id) {
            dispatch(fetchGoodById(Number(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedItem && id) {
            setTitleInput(selectedItem.name);
            setPriceInput(selectedItem.price.toString());
            setDescInput(selectedItem.description);
        }
    }, [selectedItem, id]);
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const price = parseFloat(priceInput);
        if (!titleInput || !descInput || isNaN(price)) {
            alert('Пожалуйста, заполните все поля корректно');
            return;
        }

        dispatch(createGood({
            name: titleInput,
            description: descInput,
            price,
        }));
    };

    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-good'>
                <div className='text-h3 seller-orders_title'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7427 5.96311C14.4587 5.24715 14.4587 4.08635 13.7427 3.37039L12.7999 2.42758C12.0839 1.71162 10.9231 1.71162 10.2072 2.42758L2.81007 9.82468C2.50566 10.1291 2.31809 10.5309 2.28021 10.9597L2.11882 12.7867C2.05492 13.51 2.66027 14.1154 3.38362 14.0515L5.21056 13.8901C5.63938 13.8522 6.0412 13.6646 6.3456 13.3602L13.7427 5.96311ZM13.0356 4.07749C13.361 4.40293 13.361 4.93057 13.0356 5.256L12.4025 5.88911L10.2812 3.76779L10.9143 3.13468C11.2397 2.80925 11.7673 2.80925 12.0928 3.13468L13.0356 4.07749ZM9.57406 4.4749L11.6954 6.59622L5.63849 12.6531C5.50013 12.7915 5.31749 12.8767 5.12257 12.8939L3.29562 13.0553C3.19229 13.0645 3.10581 12.978 3.11494 12.8747L3.27633 11.0477C3.29355 10.8528 3.37881 10.6701 3.51717 10.5318L9.57406 4.4749Z" fill="black"/>
                    </svg>
                    <h1>
                        {id ? 'Редактирование товара' : 'Создание товара'}
                    </h1>
                    <span className='seller-good_id text-n11'>id {selectedItem?.id}</span>
                </div>
                <form className="seller-good_form" onSubmit={handleSubmit}>
                    <div className="seller-good_info seller-good_item">
                        <h2 className='text-desc seller-order_title'>Основная информация</h2>
                        <div className="seller-good_info-main">
                            <div className="seller-good_info-group">
                                <span className='seller-good_info-label text-n14'>
                                    Название товара
                                </span>
                                <input 
                                    className='seller-good_input text-n16' 
                                    type='text'
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    value={titleInput} 
                                />
                            </div>
                            <div className="seller-good_info-group">
                                <span className='seller-good_info-label text-n14'>
                                    Цена товара
                                </span>
                                <input 
                                    className='seller-good_input text-n16' 
                                    type="number"
                                    onChange={(e) => setPriceInput(e.target.value)}
                                    value={priceInput} 
                                />
                            </div>
                        </div>
                        <div className="seller-good_info-cat">
                            <div className="seller-good_info-group">
                                <span className='seller-good_info-label text-n14'>
                                    Категория
                                </span>
                                <div className='seller-good_cat text-n16'>
                                    Электроприборы
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="#02040F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967Z" fill="#02040F"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="seller-good_info-group">
                                <span className='seller-good_info-label text-n14'>
                                    Подкатегория
                                </span>
                                <div className='seller-good_cat text-n16'>
                                    Электроприборы
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="#02040F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967Z" fill="#02040F"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="seller-good_info-imgs seller-good_info-group">
                            <span className='seller-good_info-label text-n14'>Фотографии товара</span>
                            <ul className="seller-good_imgs-list">
                                <li className='seller-good_img'>
                                    <div className="seller-good_img-src"></div>
                                    <button className="seller-good_img-btn">
                                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.169572 0.170272C0.389242 -0.0493982 0.745397 -0.049398 0.965067 0.170272L4.4993 3.7045L8.03353 0.170272C8.2532 -0.0493975 8.60936 -0.0493982 8.82903 0.170272C9.0487 0.389942 9.0487 0.746098 8.82903 0.965767L5.2948 4.5L8.82903 8.03423C9.0487 8.2539 9.0487 8.61006 8.82903 8.82973C8.60936 9.0494 8.2532 9.0494 8.03353 8.82973L4.4993 5.2955L0.965067 8.82973C0.745397 9.0494 0.389242 9.0494 0.169572 8.82973C-0.0500982 8.61006 -0.050098 8.2539 0.169572 8.03423L3.7038 4.5L0.169572 0.965767C-0.050098 0.746097 -0.0500982 0.389942 0.169572 0.170272Z" fill="#02040F"/>
                                        </svg>
                                    </button>
                                </li>
                                <li className='seller-good_img'>
                                    <div className="seller-good_img-src"></div>
                                    <button className="seller-good_img-btn">
                                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.169572 0.170272C0.389242 -0.0493982 0.745397 -0.049398 0.965067 0.170272L4.4993 3.7045L8.03353 0.170272C8.2532 -0.0493975 8.60936 -0.0493982 8.82903 0.170272C9.0487 0.389942 9.0487 0.746098 8.82903 0.965767L5.2948 4.5L8.82903 8.03423C9.0487 8.2539 9.0487 8.61006 8.82903 8.82973C8.60936 9.0494 8.2532 9.0494 8.03353 8.82973L4.4993 5.2955L0.965067 8.82973C0.745397 9.0494 0.389242 9.0494 0.169572 8.82973C-0.0500982 8.61006 -0.050098 8.2539 0.169572 8.03423L3.7038 4.5L0.169572 0.965767C-0.050098 0.746097 -0.0500982 0.389942 0.169572 0.170272Z" fill="#02040F"/>
                                        </svg>
                                    </button>
                                </li>

                                <li className='seller-good_img seller-good_img-add'>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="black"/>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="seller-good_desc seller-good_item">
                        <h2 className='text-desc seller-order_title'>Описание товара</h2>
                        <div className="seller-good_desc-list">
                            <div className="seller-good_desc-item">
                                <h3><span className='text-h2'>О товаре </span><span className='text-desc'>(текстовое описание)</span></h3>
                                <textarea 
                                    className='seller-good_desc-main text-n16' 
                                    onChange={(e) => setDescInput(e.target.value)}
                                    value={descInput} 
                                />
                            </div>
                            <div className="seller-good_desc-item">
                                <div className="seller-good_desc-head">
                                    <h3><span className='text-h2'>О товаре </span><span className='text-desc'>(в таблице)</span></h3>
                                    <button className='text-n14 seller-good_desc-add'>
                                        Добавить строку
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="seller-good_desc-table">
                                    <div className="seller-good_desc-row">
                                        <p className="seller-good_desc-label text-n14">
                                            Тип уборки
                                        </p>
                                        <p className="seller-good_desc-value text-n14">
                                            Сухая и влажная
                                        </p>
                                        <div className="seller-good_desc-actions">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7427 5.96311C14.4587 5.24715 14.4587 4.08635 13.7427 3.37039L12.7999 2.42758C12.0839 1.71162 10.9231 1.71162 10.2072 2.42758L2.81007 9.82468C2.50566 10.1291 2.31809 10.5309 2.28021 10.9597L2.11882 12.7867C2.05492 13.51 2.66027 14.1154 3.38362 14.0515L5.21056 13.8901C5.63938 13.8522 6.0412 13.6646 6.3456 13.3602L13.7427 5.96311ZM13.0356 4.07749C13.361 4.40293 13.361 4.93057 13.0356 5.256L12.4025 5.88911L10.2812 3.76779L10.9143 3.13468C11.2397 2.80925 11.7673 2.80925 12.0928 3.13468L13.0356 4.07749ZM9.57406 4.4749L11.6954 6.59622L5.63849 12.6531C5.50013 12.7915 5.31749 12.8767 5.12257 12.8939L3.29562 13.0553C3.19229 13.0645 3.10581 12.978 3.11494 12.8747L3.27633 11.0477C3.29355 10.8528 3.37881 10.6701 3.51717 10.5318L9.57406 4.4749Z" fill="black"/>
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.4213 5.50764C13.6933 5.55546 13.875 5.8147 13.8272 6.08667L12.4972 13.6508C12.4972 13.6509 12.4972 13.6509 12.4972 13.6509C12.3431 14.5275 11.5816 15.1667 10.6916 15.1667H5.31121C4.42116 15.1667 3.6597 14.5275 3.50558 13.6509L2.17561 6.08667C2.12779 5.8147 2.3095 5.55546 2.58147 5.50764C2.85344 5.45982 3.11268 5.64153 3.1605 5.9135L4.49047 13.4777C4.56053 13.8762 4.90666 14.1667 5.31121 14.1667H10.6916C11.0961 14.1667 11.4422 13.8762 11.5123 13.4777L11.5123 13.4777L12.8423 5.9135C12.8901 5.64153 13.1493 5.45982 13.4213 5.50764Z" fill="black"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.08333 1.83325C6.6231 1.83325 6.25 2.20635 6.25 2.66659V3.49992H9.75V2.66659C9.75 2.20634 9.37692 1.83325 8.91667 1.83325H7.08333ZM5.25 3.49992V2.66659C5.25 1.65406 6.07081 0.833252 7.08333 0.833252H8.91667C9.92921 0.833252 10.75 1.65407 10.75 2.66659V3.49992H14C14.2761 3.49992 14.5 3.72378 14.5 3.99992C14.5 4.27606 14.2761 4.49992 14 4.49992H2C1.72386 4.49992 1.5 4.27606 1.5 3.99992C1.5 3.72378 1.72386 3.49992 2 3.49992H5.25Z" fill="black"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="seller-good_desc-row">
                                        <p className="seller-good_desc-label text-n14">
                                            Управление пылесосом
                                        </p>
                                        <p className="seller-good_desc-value text-n14">
                                            Пульт ДУ
                                        </p>
                                        <div className="seller-good_desc-actions">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7427 5.96311C14.4587 5.24715 14.4587 4.08635 13.7427 3.37039L12.7999 2.42758C12.0839 1.71162 10.9231 1.71162 10.2072 2.42758L2.81007 9.82468C2.50566 10.1291 2.31809 10.5309 2.28021 10.9597L2.11882 12.7867C2.05492 13.51 2.66027 14.1154 3.38362 14.0515L5.21056 13.8901C5.63938 13.8522 6.0412 13.6646 6.3456 13.3602L13.7427 5.96311ZM13.0356 4.07749C13.361 4.40293 13.361 4.93057 13.0356 5.256L12.4025 5.88911L10.2812 3.76779L10.9143 3.13468C11.2397 2.80925 11.7673 2.80925 12.0928 3.13468L13.0356 4.07749ZM9.57406 4.4749L11.6954 6.59622L5.63849 12.6531C5.50013 12.7915 5.31749 12.8767 5.12257 12.8939L3.29562 13.0553C3.19229 13.0645 3.10581 12.978 3.11494 12.8747L3.27633 11.0477C3.29355 10.8528 3.37881 10.6701 3.51717 10.5318L9.57406 4.4749Z" fill="black"/>
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.4213 5.50764C13.6933 5.55546 13.875 5.8147 13.8272 6.08667L12.4972 13.6508C12.4972 13.6509 12.4972 13.6509 12.4972 13.6509C12.3431 14.5275 11.5816 15.1667 10.6916 15.1667H5.31121C4.42116 15.1667 3.6597 14.5275 3.50558 13.6509L2.17561 6.08667C2.12779 5.8147 2.3095 5.55546 2.58147 5.50764C2.85344 5.45982 3.11268 5.64153 3.1605 5.9135L4.49047 13.4777C4.56053 13.8762 4.90666 14.1667 5.31121 14.1667H10.6916C11.0961 14.1667 11.4422 13.8762 11.5123 13.4777L11.5123 13.4777L12.8423 5.9135C12.8901 5.64153 13.1493 5.45982 13.4213 5.50764Z" fill="black"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.08333 1.83325C6.6231 1.83325 6.25 2.20635 6.25 2.66659V3.49992H9.75V2.66659C9.75 2.20634 9.37692 1.83325 8.91667 1.83325H7.08333ZM5.25 3.49992V2.66659C5.25 1.65406 6.07081 0.833252 7.08333 0.833252H8.91667C9.92921 0.833252 10.75 1.65407 10.75 2.66659V3.49992H14C14.2761 3.49992 14.5 3.72378 14.5 3.99992C14.5 4.27606 14.2761 4.49992 14 4.49992H2C1.72386 4.49992 1.5 4.27606 1.5 3.99992C1.5 3.72378 1.72386 3.49992 2 3.49992H5.25Z" fill="black"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="seller-good_desc-item">
                                <div className="seller-good_desc-head">
                                    <h3><span className='text-h2'>Подробные характеристики </span><span className='text-desc'>(в таблицах)</span></h3>
                                    <button className='text-n14 seller-good_desc-add'>
                                        Добавить характеристику
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="seller-good_charc">
                                    <div className='product-charc_card'>
                                        <div className="seller-good_charc-head product-charc_list-title">
                                            <h4>
                                                Общие
                                            </h4>
                                            <div className="seller-good_charc-actions">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7427 5.96311C14.4587 5.24715 14.4587 4.08635 13.7427 3.37039L12.7999 2.42758C12.0839 1.71162 10.9231 1.71162 10.2072 2.42758L2.81007 9.82468C2.50566 10.1291 2.31809 10.5309 2.28021 10.9597L2.11882 12.7867C2.05492 13.51 2.66027 14.1154 3.38362 14.0515L5.21056 13.8901C5.63938 13.8522 6.0412 13.6646 6.3456 13.3602L13.7427 5.96311ZM13.0356 4.07749C13.361 4.40293 13.361 4.93057 13.0356 5.256L12.4025 5.88911L10.2812 3.76779L10.9143 3.13468C11.2397 2.80925 11.7673 2.80925 12.0928 3.13468L13.0356 4.07749ZM9.57406 4.4749L11.6954 6.59622L5.63849 12.6531C5.50013 12.7915 5.31749 12.8767 5.12257 12.8939L3.29562 13.0553C3.19229 13.0645 3.10581 12.978 3.11494 12.8747L3.27633 11.0477C3.29355 10.8528 3.37881 10.6701 3.51717 10.5318L9.57406 4.4749Z" fill="black"/>
                                                </svg>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4213 5.50764C13.6933 5.55546 13.875 5.8147 13.8272 6.08667L12.4972 13.6508C12.4972 13.6509 12.4972 13.6509 12.4972 13.6509C12.3431 14.5275 11.5816 15.1667 10.6916 15.1667H5.31121C4.42116 15.1667 3.6597 14.5275 3.50558 13.6509L2.17561 6.08667C2.12779 5.8147 2.3095 5.55546 2.58147 5.50764C2.85344 5.45982 3.11268 5.64153 3.1605 5.9135L4.49047 13.4777C4.56053 13.8762 4.90666 14.1667 5.31121 14.1667H10.6916C11.0961 14.1667 11.4422 13.8762 11.5123 13.4777L11.5123 13.4777L12.8423 5.9135C12.8901 5.64153 13.1493 5.45982 13.4213 5.50764Z" fill="black"/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.08333 1.83325C6.6231 1.83325 6.25 2.20635 6.25 2.66659V3.49992H9.75V2.66659C9.75 2.20634 9.37692 1.83325 8.91667 1.83325H7.08333ZM5.25 3.49992V2.66659C5.25 1.65406 6.07081 0.833252 7.08333 0.833252H8.91667C9.92921 0.833252 10.75 1.65407 10.75 2.66659V3.49992H14C14.2761 3.49992 14.5 3.72378 14.5 3.99992C14.5 4.27606 14.2761 4.49992 14 4.49992H2C1.72386 4.49992 1.5 4.27606 1.5 3.99992C1.5 3.72378 1.72386 3.49992 2 3.49992H5.25Z" fill="black"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <ul className='product-charc_list'>
                                            <li className='product-charc_item text-n16'>
                                                <span className='product-charc_item__label'>
                                                    Тип
                                                </span>
                                                <span className='product-charc_item__value'>
                                                    Робот для мойки окон
                                                </span>
                                            </li>
                                            <li className='product-charc_item text-n16'>
                                                <span className='product-charc_item__label'>
                                                    Партномер
                                                </span>
                                                <span className='product-charc_item__value'>
                                                    Cleanbot Ultraspray
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='product-charc_card'>
                                        <div className="seller-good_charc-head product-charc_list-title">
                                            <h4>
                                                Управление пылесосом
                                            </h4>
                                            <div className="seller-good_charc-actions">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7427 5.96311C14.4587 5.24715 14.4587 4.08635 13.7427 3.37039L12.7999 2.42758C12.0839 1.71162 10.9231 1.71162 10.2072 2.42758L2.81007 9.82468C2.50566 10.1291 2.31809 10.5309 2.28021 10.9597L2.11882 12.7867C2.05492 13.51 2.66027 14.1154 3.38362 14.0515L5.21056 13.8901C5.63938 13.8522 6.0412 13.6646 6.3456 13.3602L13.7427 5.96311ZM13.0356 4.07749C13.361 4.40293 13.361 4.93057 13.0356 5.256L12.4025 5.88911L10.2812 3.76779L10.9143 3.13468C11.2397 2.80925 11.7673 2.80925 12.0928 3.13468L13.0356 4.07749ZM9.57406 4.4749L11.6954 6.59622L5.63849 12.6531C5.50013 12.7915 5.31749 12.8767 5.12257 12.8939L3.29562 13.0553C3.19229 13.0645 3.10581 12.978 3.11494 12.8747L3.27633 11.0477C3.29355 10.8528 3.37881 10.6701 3.51717 10.5318L9.57406 4.4749Z" fill="black"/>
                                                </svg>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4213 5.50764C13.6933 5.55546 13.875 5.8147 13.8272 6.08667L12.4972 13.6508C12.4972 13.6509 12.4972 13.6509 12.4972 13.6509C12.3431 14.5275 11.5816 15.1667 10.6916 15.1667H5.31121C4.42116 15.1667 3.6597 14.5275 3.50558 13.6509L2.17561 6.08667C2.12779 5.8147 2.3095 5.55546 2.58147 5.50764C2.85344 5.45982 3.11268 5.64153 3.1605 5.9135L4.49047 13.4777C4.56053 13.8762 4.90666 14.1667 5.31121 14.1667H10.6916C11.0961 14.1667 11.4422 13.8762 11.5123 13.4777L11.5123 13.4777L12.8423 5.9135C12.8901 5.64153 13.1493 5.45982 13.4213 5.50764Z" fill="black"/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.08333 1.83325C6.6231 1.83325 6.25 2.20635 6.25 2.66659V3.49992H9.75V2.66659C9.75 2.20634 9.37692 1.83325 8.91667 1.83325H7.08333ZM5.25 3.49992V2.66659C5.25 1.65406 6.07081 0.833252 7.08333 0.833252H8.91667C9.92921 0.833252 10.75 1.65407 10.75 2.66659V3.49992H14C14.2761 3.49992 14.5 3.72378 14.5 3.99992C14.5 4.27606 14.2761 4.49992 14 4.49992H2C1.72386 4.49992 1.5 4.27606 1.5 3.99992C1.5 3.72378 1.72386 3.49992 2 3.49992H5.25Z" fill="black"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <ul className='product-charc_list'>
                                            <li className='product-charc_item text-n16'>
                                                <span className='product-charc_item__label'>
                                                    Управление пылесосом
                                                </span>
                                                <span className='product-charc_item__value'>
                                                    Пульт ДУ
                                                </span>
                                            </li>
                                            <li className='product-charc_item text-n16'>
                                                <span className='product-charc_item__label'>
                                                    Автоматические системы
                                                </span>
                                                <span className='product-charc_item__value'>
                                                    Автоматическая парковка
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='product-charc_card'>
                                        <div className="seller-good_charc-head product-charc_list-title">
                                            <h4>
                                                Технические характеристики
                                            </h4>
                                            <div className="seller-good_charc-actions">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7427 5.96311C14.4587 5.24715 14.4587 4.08635 13.7427 3.37039L12.7999 2.42758C12.0839 1.71162 10.9231 1.71162 10.2072 2.42758L2.81007 9.82468C2.50566 10.1291 2.31809 10.5309 2.28021 10.9597L2.11882 12.7867C2.05492 13.51 2.66027 14.1154 3.38362 14.0515L5.21056 13.8901C5.63938 13.8522 6.0412 13.6646 6.3456 13.3602L13.7427 5.96311ZM13.0356 4.07749C13.361 4.40293 13.361 4.93057 13.0356 5.256L12.4025 5.88911L10.2812 3.76779L10.9143 3.13468C11.2397 2.80925 11.7673 2.80925 12.0928 3.13468L13.0356 4.07749ZM9.57406 4.4749L11.6954 6.59622L5.63849 12.6531C5.50013 12.7915 5.31749 12.8767 5.12257 12.8939L3.29562 13.0553C3.19229 13.0645 3.10581 12.978 3.11494 12.8747L3.27633 11.0477C3.29355 10.8528 3.37881 10.6701 3.51717 10.5318L9.57406 4.4749Z" fill="black"/>
                                                </svg>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4213 5.50764C13.6933 5.55546 13.875 5.8147 13.8272 6.08667L12.4972 13.6508C12.4972 13.6509 12.4972 13.6509 12.4972 13.6509C12.3431 14.5275 11.5816 15.1667 10.6916 15.1667H5.31121C4.42116 15.1667 3.6597 14.5275 3.50558 13.6509L2.17561 6.08667C2.12779 5.8147 2.3095 5.55546 2.58147 5.50764C2.85344 5.45982 3.11268 5.64153 3.1605 5.9135L4.49047 13.4777C4.56053 13.8762 4.90666 14.1667 5.31121 14.1667H10.6916C11.0961 14.1667 11.4422 13.8762 11.5123 13.4777L11.5123 13.4777L12.8423 5.9135C12.8901 5.64153 13.1493 5.45982 13.4213 5.50764Z" fill="black"/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.08333 1.83325C6.6231 1.83325 6.25 2.20635 6.25 2.66659V3.49992H9.75V2.66659C9.75 2.20634 9.37692 1.83325 8.91667 1.83325H7.08333ZM5.25 3.49992V2.66659C5.25 1.65406 6.07081 0.833252 7.08333 0.833252H8.91667C9.92921 0.833252 10.75 1.65407 10.75 2.66659V3.49992H14C14.2761 3.49992 14.5 3.72378 14.5 3.99992C14.5 4.27606 14.2761 4.49992 14 4.49992H2C1.72386 4.49992 1.5 4.27606 1.5 3.99992C1.5 3.72378 1.72386 3.49992 2 3.49992H5.25Z" fill="black"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <ul className='product-charc_list'>
                                            <li className='product-charc_item text-n16'>
                                                <span className='product-charc_item__label'>
                                                    Мощность всасывания, Вт
                                                </span>
                                                <span className='product-charc_item__value'>
                                                    80
                                                </span>
                                            </li>
                                            <li className='product-charc_item text-n16'>
                                                <span className='product-charc_item__label'>
                                                    Макс. уровень шума, дБ
                                                </span>
                                                <span className='product-charc_item__value'>
                                                    65
                                                </span>
                                            </li>
                                            <li className='product-charc_item text-n16'>
                                                <span className='product-charc_item__label'>
                                                    Потребляемая мощность, Вт
                                                </span>
                                                <span className='product-charc_item__value'>
                                                    80
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="seller-good_form-btns">
                        <button type="submit" className='btn-black text-btn seller-good_form-btn'>Сохранить товар</button>
                        <button className='text-btn seller-good_form-del'>Удалить товар</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellerGoodPage;
