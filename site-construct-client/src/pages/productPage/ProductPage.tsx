import React, { useRef } from 'react';
import './productPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import Recommendations from '../../components/recommendations/Recommendations';
import { Link } from 'react-router-dom';
import ReviewPrev from '../../components/reviewPrev/ReviewPrev';
import ProductGallery from '../../components/productGallery/ProductGallery';


const ProductPage: React.FC = () => {
    const reviewsRef = useRef<HTMLDivElement | null>(null);
  
    const HEADER_HEIGHT = 137;

    const scrollToReviews = () => {
        if (reviewsRef.current) {
            const offsetTop = reviewsRef.current.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <div className='product_main-info'>
                    <ProductGallery />
                    <div className='product-info'>
                        <h1 className='product-name'>
                            Робот мойщик окон с распылением
                        </h1>
                        <h2 className='product-info_title product_subtitle'>
                            О товаре
                        </h2>
                        <ul className='product-info_list'>
                            <li className='product-info_item'>
                                <div className='product-info_label'>
                                    Тип уборки
                                </div>
                                <div className='product-info_value'>
                                    Сухая и влажная
                                </div>
                            </li>
                            <li className='product-info_item'>
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
                                    <div className="product_price">
                                        5 520 ₽
                                    </div>
                                    <div className="product_delivery">
                                        Доставка 15 апреля
                                    </div>
                                </div>
                                <button className='product_fav'>
                                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.3053 2.25C13.9937 2.25 12.7335 2.78909 11.8047 3.75232L11.5395 4.02714C11.3982 4.17365 11.2034 4.25641 10.9998 4.25642C10.7962 4.25642 10.6013 4.17365 10.46 4.02714L10.1949 3.75229C8.26309 1.74988 5.12529 1.74988 3.19352 3.7523C1.26883 5.74739 1.26883 8.97705 3.19352 10.9721L10.4886 18.534C10.7573 18.8126 11.2054 18.8232 11.4874 18.5573C13.1657 16.9409 14.7608 15.247 16.368 13.5402C17.1737 12.6847 17.9823 11.8259 18.806 10.9721C19.7292 10.0156 20.25 8.71777 20.25 7.36222C20.25 6.00674 19.7294 4.70909 18.8061 3.7524C17.8773 2.78925 16.617 2.25 15.3053 2.25ZM10.9999 2.44228C12.1757 1.35872 13.7069 0.75 15.3053 0.75C17.0313 0.75 18.679 1.45977 19.8854 2.71074C21.0832 3.95181 21.75 5.6248 21.75 7.36222C21.75 9.0997 21.0831 10.7728 19.8854 12.0137C19.089 12.8393 18.2938 13.6836 17.4945 14.5323C15.871 16.2562 14.2301 17.9985 12.5256 19.64L12.5216 19.6438C11.6426 20.4779 10.2505 20.4476 9.40903 19.5754L2.11399 12.0136C-0.37133 9.43736 -0.37133 5.28707 2.11399 2.71085C4.54605 0.189845 8.46239 0.100323 10.9999 2.44228Z" fill="black"/>
                                    </svg>
                                </button>
                            </div>
                            <button className='product_basket-btn'>
                                В корзину
                            </button>
                        </div>
                        <div className='product_to-reviews'>
                            <div className="product-rating">
                                <div className="product-rating_value">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.15647 6.86347L9.32107 2.5033C9.59895 1.94356 10.4017 1.94356 10.6796 2.5033L12.8442 6.86347L17.6849 7.56697C18.306 7.65723 18.5535 8.41631 18.1039 8.85176L14.6018 12.2433L15.4283 17.0347C15.5344 17.65 14.8848 18.1192 14.3291 17.8286L10.0003 15.5651L5.67155 17.8286C5.11583 18.1192 4.46623 17.65 4.57237 17.0347L5.39887 12.2433L1.89678 8.85176C1.44714 8.41631 1.69468 7.65723 2.31576 7.56697L7.15647 6.86347Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.92902 2.72684C9.91272 2.73646 9.89561 2.75178 9.881 2.78121L7.7164 7.14139C7.62516 7.32517 7.44953 7.45247 7.24648 7.48198L2.40577 8.18547C2.29317 8.20184 2.25852 8.33192 2.3317 8.40279L5.83379 11.7943C5.98223 11.9381 6.05002 12.1459 6.01489 12.3495L5.18839 17.1409C5.18288 17.1729 5.18768 17.1943 5.19467 17.2104C5.20272 17.229 5.21764 17.2487 5.23984 17.2647C5.26203 17.2807 5.28628 17.2893 5.30825 17.2913C5.3277 17.2931 5.35165 17.2906 5.38207 17.2747L9.71084 15.0113C9.89226 14.9164 10.1086 14.9164 10.29 15.0113L14.6188 17.2747C14.6492 17.2906 14.6732 17.2931 14.6926 17.2913C14.7146 17.2893 14.7389 17.2807 14.7611 17.2647C14.7832 17.2487 14.7982 17.229 14.8062 17.2104C14.8132 17.1943 14.818 17.1729 14.8125 17.1409L13.986 12.3495C13.9509 12.1459 14.0187 11.9381 14.1671 11.7943L17.6692 8.40279C17.7424 8.33192 17.7077 8.20184 17.5951 8.18547L12.7544 7.48198C12.5514 7.45247 12.3757 7.32517 12.2845 7.14139L10.1199 2.78121C10.1053 2.75178 10.0882 2.73646 10.0719 2.72684C10.0533 2.7159 10.0286 2.7085 10.0004 2.7085C9.97234 2.7085 9.94759 2.7159 9.92902 2.72684ZM8.76138 2.22538C9.269 1.20287 10.7319 1.20287 11.2395 2.22538L13.2584 6.29209L17.7749 6.94847C18.9045 7.11263 19.3649 8.50069 18.5388 9.30073L15.2739 12.4625L16.0443 16.9284C16.2398 18.062 15.0468 18.9091 14.0396 18.3825L10.0004 16.2704L5.96127 18.3825C4.95413 18.9091 3.76105 18.062 3.95659 16.9284L4.72695 12.4625L1.4621 9.30073C0.635989 8.5007 1.09641 7.11263 2.22599 6.94847L6.74247 6.29209L8.76138 2.22538Z" fill="black"/>
                                    </svg>
                                    <span>4,9</span>
                                </div>
                                <div className="product-rating_count">
                                    45 оценок
                                </div>
                            </div>
                            <button className="product_reviews-btn" onClick={scrollToReviews}>
                                <span className="product_reviews-btn__label">К отзывам</span>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.71967 11.9697C6.01256 11.6768 6.48744 11.6768 6.78033 11.9697L11.5 16.6893V6C11.5 5.58579 11.8358 5.25 12.25 5.25C12.6642 5.25 13 5.58579 13 6V16.6893L17.7197 11.9697C18.0126 11.6768 18.4874 11.6768 18.7803 11.9697C19.0732 12.2626 19.0732 12.7374 18.7803 13.0303L12.7803 19.0303C12.4874 19.3232 12.0126 19.3232 11.7197 19.0303L5.71967 13.0303C5.42678 12.7374 5.42678 12.2626 5.71967 11.9697Z" fill="black"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product_charc">
                    <h2 className='product-charc_title product_subtitle'>Характеристики</h2>
                    <div className="product-charc_content">
                        <div className='product-charc_card'>
                            <h3 className='product-charc_list-title'>
                                Общие
                            </h3>
                            <ul className='product-charc_list'>
                                <li className='product-charc_item'>
                                    <span className='product-charc_item__label'>
                                        Тип
                                    </span>
                                    <span className='product-charc_item__value'>
                                        Робот для мойки окон
                                    </span>
                                </li>
                                <li className='product-charc_item'>
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
                                <li className='product-charc_item'>
                                    <span className='product-charc_item__label'>
                                        Управление пылесосом
                                    </span>
                                    <span className='product-charc_item__value'>
                                        Пульт ДУ
                                    </span>
                                </li>
                                <li className='product-charc_item'>
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
                                <li className='product-charc_item'>
                                    <span className='product-charc_item__label'>
                                        Мощность всасывания, Вт
                                    </span>
                                    <span className='product-charc_item__value'>
                                        80
                                    </span>
                                </li>
                                <li className='product-charc_item'>
                                    <span className='product-charc_item__label'>
                                        Макс. уровень шума, дБ
                                    </span>
                                    <span className='product-charc_item__value'>
                                        65
                                    </span>
                                </li>
                                <li className='product-charc_item'>
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
                    <h2 className='product-package_title product_subtitle'>Комплектация</h2>
                    <p className='product-package_text'>
                        Робот-мойщик, сменные салфетки из микрофибры - 12 шт.(+2 салфетки на роботе), кольцо для салфетки - 2 шт., блок питания с удлинителем - 4м., кабель питания -  1,5 м., страховочный шнур - 4,5 м., инструкция, пульт ДУ
                    </p>
                </div>
                <div className='product-reviews' ref={reviewsRef}>
                    <div className="product-reviews_header">
                        <h2 className='product-reviews_title'>
                            Отзывы о товаре
                        </h2>
                        <Link to='/reviews' className='product-reviews_link'>
                            <span>Все  отзывы</span>
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.46967 13.2803C7.17678 12.9874 7.17678 12.5126 7.46967 12.2197L12.1893 7.5L1.5 7.5C1.08579 7.5 0.75 7.16421 0.75 6.75C0.75 6.33579 1.08579 6 1.5 6L12.1893 6L7.46967 1.28033C7.17678 0.987437 7.17678 0.512563 7.46967 0.21967C7.76256 -0.0732231 8.23744 -0.0732231 8.53033 0.21967L14.5303 6.21967C14.8232 6.51256 14.8232 6.98744 14.5303 7.28033L8.53033 13.2803C8.23744 13.5732 7.76256 13.5732 7.46967 13.2803Z" fill="black"/>
                            </svg>
                        </Link>
                        <div className='product-reviews_rating'>
                            <div className="product-reviews_value">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" fill="black"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9146 3.27202C11.8951 3.28355 11.8745 3.30194 11.857 3.33726L9.25948 8.56947C9.15 8.79001 8.93924 8.94276 8.69558 8.97817L2.88673 9.82237C2.75161 9.84201 2.71003 9.99811 2.79785 10.0832L7.00035 14.153C7.17848 14.3255 7.25983 14.5749 7.21768 14.8193L6.22588 20.5689C6.21927 20.6072 6.22502 20.6329 6.23341 20.6523C6.24307 20.6746 6.26098 20.6982 6.28761 20.7174C6.31424 20.7367 6.34334 20.747 6.36971 20.7494C6.39304 20.7516 6.42179 20.7486 6.45829 20.7295L11.6528 18.0134C11.8705 17.8995 12.1302 17.8995 12.3479 18.0134L17.5424 20.7295C17.5789 20.7486 17.6076 20.7516 17.631 20.7494C17.6573 20.747 17.6864 20.7367 17.7131 20.7174C17.7397 20.6982 17.7576 20.6746 17.7673 20.6523C17.7757 20.6329 17.7814 20.6072 17.7748 20.5689L16.783 14.8193C16.7408 14.5749 16.8222 14.3255 17.0003 14.153L21.2028 10.0832C21.2906 9.99811 21.2491 9.84201 21.114 9.82237L15.3051 8.97817C15.0614 8.94276 14.8507 8.79001 14.7412 8.56947L12.1437 3.33726C12.1261 3.30194 12.1056 3.28355 12.086 3.27202C12.0638 3.25889 12.0341 3.25 12.0003 3.25C11.9666 3.25 11.9369 3.25889 11.9146 3.27202ZM10.5135 2.67026C11.1226 1.44325 12.8781 1.44325 13.4872 2.67026L15.9099 7.55031L21.3297 8.33797C22.6852 8.53496 23.2377 10.2006 22.2463 11.1607L18.3285 14.9548L19.253 20.3139C19.4876 21.6742 18.0559 22.6907 16.8473 22.0587L12.0003 19.5243L7.15333 22.0587C5.94476 22.6907 4.51307 21.6742 4.74771 20.3139L5.67214 14.9548L1.75433 11.1607C0.762991 10.2006 1.3155 8.53496 2.671 8.33797L8.09077 7.55031L10.5135 2.67026Z" fill="black"/>
                                </svg>
                                <span>4,9</span>
                            </div>
                            <div className="product-reviews_count">
                                45 оценок
                            </div>
                        </div>
                    </div>
                    <ul className='product-reviews_list'>
                        <li className='product-review_prev'>
                            <ReviewPrev />
                        </li>
                        <li className='product-review_prev'>
                            <ReviewPrev />
                        </li>
                    </ul>
                </div>
                <Recommendations />
            </div>
        </div>
    );
};

export default ProductPage;
