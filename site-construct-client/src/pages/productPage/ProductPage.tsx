import React, { useEffect, useRef, useState } from 'react';
import './productPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import Recommendations from '../../components/recommendations/Recommendations';
import { Link, useParams } from 'react-router-dom';
import ReviewPrev from '../../components/reviewPrev/ReviewPrev';
import ProductGallery from '../../components/productGallery/ProductGallery';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGoodById, toggleWishlist } from '../../store/goodsSlice';
import { formatPrice } from '../../utils/formatPrice';
import { addBasketItem, removeBasketItem, updateBasketItem } from '../../store/basketSlice';
import { fetchComments } from '../../store/commentsSlice';


const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const reviewsRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    
    const { selectedItem/*, loading, error*/ } = useAppSelector((state) => state.goods);

    const [count, setCount] = useState(selectedItem?.basket_count);
    
    useEffect(() => {
        setCount(selectedItem?.basket_count);
    }, [selectedItem]);

    useEffect(() => {
        if (selectedItem){
            dispatch(fetchComments(selectedItem.id));
        }
    }, [dispatch, selectedItem]);
    const comments = useAppSelector((state) => state.comments.comments);

    const handleCountChange = async (newCount: number) => {
        if (!selectedItem || !selectedItem.basket_id) return;
        if (newCount < 1) {
            dispatch(removeBasketItem(selectedItem.basket_id));
        } else {
            setCount(newCount);
            await dispatch(updateBasketItem({ id: selectedItem.basket_id, count: newCount }));
        }
    };

    const handleAddToBasket = async () => {
        await dispatch(addBasketItem({ good_item: Number(id), count: 1 }));
        await dispatch(fetchGoodById(Number(id)));
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchGoodById(Number(id)));
        }
    }, [dispatch, id]);
  
    const HEADER_HEIGHT = 137;

    const scrollToReviews = () => {
        if (reviewsRef.current) {
            const offsetTop = reviewsRef.current.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    //if (loading) return <div>Загрузка...</div>;
    if (!selectedItem) return <div>Товар не найден</div>;
    
    const handleToggleWishlist = (e: React.MouseEvent ) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(toggleWishlist(selectedItem.id));
    };

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <div className='product_main-info'>
                    <ProductGallery />
                    <div className='product-info'>
                        <h1 className='product-name text-h1'>
                            {selectedItem.name}
                        </h1>
                        <h2 className='product-info_title text-h2 product_subtitle'>
                            О товаре
                        </h2>
                        <ul className='product-info_list'>
                            <li className='product-info_item text-n14'>
                                <div className='product-info_label'>
                                    Тип уборки
                                </div>
                                <div className='product-info_value'>
                                    Сухая и влажная
                                </div>
                            </li>
                            <li className='product-info_item text-n14'>
                                <div className='product-info_label'>
                                    Управление пылесосом
                                </div>
                                <div className='product-info_value'>
                                    Пульт ДУ
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='product-actions'>
                        <div className='product_to-basket'>
                            <div className="product-basket_info">
                                <div className="product-basket_info-text">
                                    <div className="product_price text-price2">
                                        {formatPrice(selectedItem.price)} ₽
                                    </div>
                                    <div className="product_delivery text-desc">
                                        Доставка 15 апреля
                                    </div>
                                </div>
                                
                                <button className='product_fav' onClick={handleToggleWishlist}>
                                    {selectedItem.in_wishlist ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z" fill="black"/>
                                        </svg>
                                    ) : (
                                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.3053 1.75C13.9937 1.75 12.7335 2.28909 11.8047 3.25232L11.5395 3.52714C11.3982 3.67365 11.2034 3.75641 10.9998 3.75642C10.7962 3.75642 10.6013 3.67365 10.46 3.52714L10.1949 3.25229C8.26309 1.24988 5.12529 1.24988 3.19352 3.2523C1.26883 5.24739 1.26883 8.47705 3.19352 10.4721L10.4886 18.034C10.7573 18.3126 11.2054 18.3232 11.4874 18.0573C13.1657 16.4409 14.7608 14.747 16.368 13.0402C17.1737 12.1847 17.9823 11.3259 18.806 10.4721C19.7292 9.5156 20.25 8.21777 20.25 6.86222C20.25 5.50674 19.7294 4.20909 18.8061 3.2524C17.8773 2.28925 16.617 1.75 15.3053 1.75ZM10.9999 1.94228C12.1757 0.85872 13.7069 0.25 15.3053 0.25C17.0313 0.25 18.679 0.959767 19.8854 2.21074C21.0832 3.45181 21.75 5.1248 21.75 6.86222C21.75 8.5997 21.0831 10.2728 19.8854 11.5137C19.089 12.3393 18.2938 13.1836 17.4945 14.0323C15.871 15.7562 14.2301 17.4985 12.5256 19.14L12.5216 19.1438C11.6426 19.9779 10.2505 19.9476 9.40903 19.0754L2.11399 11.5136C-0.37133 8.93736 -0.37133 4.78707 2.11399 2.21085C4.54605 -0.310155 8.46239 -0.399677 10.9999 1.94228Z" fill="black"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {count && count > 0 ? (
                                <div className="product_basket-on">
                                    <div className='text-btn product_basket-text'>
                                        Товар в корзине
                                        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.969783 6.46967C1.26268 6.17678 1.73755 6.17678 2.03044 6.46967L5.50011 9.93934L14.9698 0.46967C15.2627 0.176777 15.7375 0.176777 16.0304 0.46967C16.3233 0.762563 16.3233 1.23744 16.0304 1.53033L6.03044 11.5303C5.73755 11.8232 5.26268 11.8232 4.96978 11.5303L0.969783 7.53033C0.67689 7.23744 0.67689 6.76256 0.969783 6.46967Z" fill="#FEFEFE"/>
                                        </svg>
                                    </div>
                                    <div className='text-h2 product_basket-count'>
                                        <svg onClick={() => handleCountChange(count - 1)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z" fill="#FEFEFE"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="#FEFEFE"/>
                                        </svg>
                                        {count}
                                        <svg onClick={() => handleCountChange(count + 1)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H12.75V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V12.75H8C7.58579 12.75 7.25 12.4142 7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H11.25V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="#FEFEFE"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="#FEFEFE"/>
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <button className='text-btn product_basket-btn btn-black' onClick={handleAddToBasket}>
                                    В корзину
                                </button>
                            )}
                        </div>
                        <div className='product_to-reviews'>
                            <div className="product-rating">
                                <div className="product-rating_value text-n16">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.15647 6.86347L9.32107 2.5033C9.59895 1.94356 10.4017 1.94356 10.6796 2.5033L12.8442 6.86347L17.6849 7.56697C18.306 7.65723 18.5535 8.41631 18.1039 8.85176L14.6018 12.2433L15.4283 17.0347C15.5344 17.65 14.8848 18.1192 14.3291 17.8286L10.0003 15.5651L5.67155 17.8286C5.11583 18.1192 4.46623 17.65 4.57237 17.0347L5.39887 12.2433L1.89678 8.85176C1.44714 8.41631 1.69468 7.65723 2.31576 7.56697L7.15647 6.86347Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.92902 2.72684C9.91272 2.73646 9.89561 2.75178 9.881 2.78121L7.7164 7.14139C7.62516 7.32517 7.44953 7.45247 7.24648 7.48198L2.40577 8.18547C2.29317 8.20184 2.25852 8.33192 2.3317 8.40279L5.83379 11.7943C5.98223 11.9381 6.05002 12.1459 6.01489 12.3495L5.18839 17.1409C5.18288 17.1729 5.18768 17.1943 5.19467 17.2104C5.20272 17.229 5.21764 17.2487 5.23984 17.2647C5.26203 17.2807 5.28628 17.2893 5.30825 17.2913C5.3277 17.2931 5.35165 17.2906 5.38207 17.2747L9.71084 15.0113C9.89226 14.9164 10.1086 14.9164 10.29 15.0113L14.6188 17.2747C14.6492 17.2906 14.6732 17.2931 14.6926 17.2913C14.7146 17.2893 14.7389 17.2807 14.7611 17.2647C14.7832 17.2487 14.7982 17.229 14.8062 17.2104C14.8132 17.1943 14.818 17.1729 14.8125 17.1409L13.986 12.3495C13.9509 12.1459 14.0187 11.9381 14.1671 11.7943L17.6692 8.40279C17.7424 8.33192 17.7077 8.20184 17.5951 8.18547L12.7544 7.48198C12.5514 7.45247 12.3757 7.32517 12.2845 7.14139L10.1199 2.78121C10.1053 2.75178 10.0882 2.73646 10.0719 2.72684C10.0533 2.7159 10.0286 2.7085 10.0004 2.7085C9.97234 2.7085 9.94759 2.7159 9.92902 2.72684ZM8.76138 2.22538C9.269 1.20287 10.7319 1.20287 11.2395 2.22538L13.2584 6.29209L17.7749 6.94847C18.9045 7.11263 19.3649 8.50069 18.5388 9.30073L15.2739 12.4625L16.0443 16.9284C16.2398 18.062 15.0468 18.9091 14.0396 18.3825L10.0004 16.2704L5.96127 18.3825C4.95413 18.9091 3.76105 18.062 3.95659 16.9284L4.72695 12.4625L1.4621 9.30073C0.635989 8.5007 1.09641 7.11263 2.22599 6.94847L6.74247 6.29209L8.76138 2.22538Z" fill="black"/>
                                    </svg>
                                    <span>{selectedItem.rating ? selectedItem.rating : '0.0'}</span>
                                </div>
                                <div className="product-rating_count text-n14">
                                    45 оценок
                                </div>
                            </div>
                            <button className="product_reviews-btn" onClick={scrollToReviews}>
                                <span className="product_reviews-btn__label text-n14">К отзывам</span>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.71967 11.9697C6.01256 11.6768 6.48744 11.6768 6.78033 11.9697L11.5 16.6893V6C11.5 5.58579 11.8358 5.25 12.25 5.25C12.6642 5.25 13 5.58579 13 6V16.6893L17.7197 11.9697C18.0126 11.6768 18.4874 11.6768 18.7803 11.9697C19.0732 12.2626 19.0732 12.7374 18.7803 13.0303L12.7803 19.0303C12.4874 19.3232 12.0126 19.3232 11.7197 19.0303L5.71967 13.0303C5.42678 12.7374 5.42678 12.2626 5.71967 11.9697Z" fill="black"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product_charc">
                    <h2 className='product-charc_title product_subtitle text-h2'>Характеристики</h2>
                    <div className="product-charc_content">
                        <div className='product-charc_card'>
                            <h3 className='product-charc_list-title'>
                                Общие
                            </h3>
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
                            <h3 className='product-charc_list-title'>
                                Управление пылесосом
                            </h3>
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
                            <h3 className='product-charc_list-title'>
                                Технические характеристики
                            </h3>
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
                <div className="product-package">
                    <h2 className='product-package_title product_subtitle text-h2'>Комплектация</h2>
                    <p className='product-package_text text-n16'>
                        {selectedItem.description}
                    </p>
                </div>
                <div className='product-reviews' ref={reviewsRef}>
                    <div className="product-reviews_header">
                        <h2 className='product-reviews_title text-h1'>
                            Отзывы о товаре
                        </h2>
                        <Link to={`/reviews/${id}`} className='product-reviews_link text-n14'>
                            <span>Все отзывы</span>
                        </Link>
                        <div className='product-reviews_rating'>
                            <div className="product-reviews_value text-h1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" fill="black"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9146 3.27202C11.8951 3.28355 11.8745 3.30194 11.857 3.33726L9.25948 8.56947C9.15 8.79001 8.93924 8.94276 8.69558 8.97817L2.88673 9.82237C2.75161 9.84201 2.71003 9.99811 2.79785 10.0832L7.00035 14.153C7.17848 14.3255 7.25983 14.5749 7.21768 14.8193L6.22588 20.5689C6.21927 20.6072 6.22502 20.6329 6.23341 20.6523C6.24307 20.6746 6.26098 20.6982 6.28761 20.7174C6.31424 20.7367 6.34334 20.747 6.36971 20.7494C6.39304 20.7516 6.42179 20.7486 6.45829 20.7295L11.6528 18.0134C11.8705 17.8995 12.1302 17.8995 12.3479 18.0134L17.5424 20.7295C17.5789 20.7486 17.6076 20.7516 17.631 20.7494C17.6573 20.747 17.6864 20.7367 17.7131 20.7174C17.7397 20.6982 17.7576 20.6746 17.7673 20.6523C17.7757 20.6329 17.7814 20.6072 17.7748 20.5689L16.783 14.8193C16.7408 14.5749 16.8222 14.3255 17.0003 14.153L21.2028 10.0832C21.2906 9.99811 21.2491 9.84201 21.114 9.82237L15.3051 8.97817C15.0614 8.94276 14.8507 8.79001 14.7412 8.56947L12.1437 3.33726C12.1261 3.30194 12.1056 3.28355 12.086 3.27202C12.0638 3.25889 12.0341 3.25 12.0003 3.25C11.9666 3.25 11.9369 3.25889 11.9146 3.27202ZM10.5135 2.67026C11.1226 1.44325 12.8781 1.44325 13.4872 2.67026L15.9099 7.55031L21.3297 8.33797C22.6852 8.53496 23.2377 10.2006 22.2463 11.1607L18.3285 14.9548L19.253 20.3139C19.4876 21.6742 18.0559 22.6907 16.8473 22.0587L12.0003 19.5243L7.15333 22.0587C5.94476 22.6907 4.51307 21.6742 4.74771 20.3139L5.67214 14.9548L1.75433 11.1607C0.762991 10.2006 1.3155 8.53496 2.671 8.33797L8.09077 7.55031L10.5135 2.67026Z" fill="black"/>
                                </svg>
                                <span>4,9</span>
                            </div>
                            <div className="product-reviews_count text-n14">
                                45 оценок
                            </div>
                        </div>
                    </div>
                    <ul className='product-reviews_list'>
                        {comments.map((comment) => (
                            <li className='product-review_prev'>
                                <ReviewPrev 
                                    key={comment.id}
                                    commentId={comment.id}
                                    userId={comment.user}
                                    body={comment.body}
                                    rate={comment.rate}
                                    date={'14 апреля 2025'}
                                />
                            </li>
                        ))}
                        
                        {/* <li className='product-review_prev'>
                            <ReviewPrev />
                        </li> */}
                    </ul>
                </div>
                <Recommendations />
            </div>
        </div>
    );
};

export default ProductPage;
