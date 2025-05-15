import React, { useEffect } from 'react';
import './reviewsPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link, useParams } from 'react-router-dom';
import Recommendations from '../../components/recommendations/Recommendations';
import ReviewCard from '../../components/reviewCard/ReviewCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchComments } from '../../store/commentsSlice';

const ReviewsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();    
    const { selectedItem/*, loading, error*/ } = useAppSelector((state) => state.goods);

    useEffect(() => {
        if (selectedItem){
            dispatch(fetchComments(selectedItem.id));
        }
    }, [dispatch, selectedItem]);
    const comments = useAppSelector((state) => state.comments.comments);

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <div className='reviews-page_content'>
                    <div className='reviews-content'>
                        <div className="text-desc reviews-path">
                            <Link to={`/product/${id}`}>Робот мойщик окон с распылением</Link>
                            <span> / Отзывы</span>
                        </div>
                        <div className="reviews-product">
                            <div className="reviews-product_img"></div>
                            <div className="reviews-product_name text-h1">
                                Робот мойщик окон с распылением
                            </div>
                            <div className="reviews-product_rating product-rating">
                                <div className="product-rating_value">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.15647 6.86347L9.32107 2.5033C9.59895 1.94356 10.4017 1.94356 10.6796 2.5033L12.8442 6.86347L17.6849 7.56697C18.306 7.65723 18.5535 8.41631 18.1039 8.85176L14.6018 12.2433L15.4283 17.0347C15.5344 17.65 14.8848 18.1192 14.3291 17.8286L10.0003 15.5651L5.67155 17.8286C5.11583 18.1192 4.46623 17.65 4.57237 17.0347L5.39887 12.2433L1.89678 8.85176C1.44714 8.41631 1.69468 7.65723 2.31576 7.56697L7.15647 6.86347Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.92902 2.72684C9.91272 2.73646 9.89561 2.75178 9.881 2.78121L7.7164 7.14139C7.62516 7.32517 7.44953 7.45247 7.24648 7.48198L2.40577 8.18547C2.29317 8.20184 2.25852 8.33192 2.3317 8.40279L5.83379 11.7943C5.98223 11.9381 6.05002 12.1459 6.01489 12.3495L5.18839 17.1409C5.18288 17.1729 5.18768 17.1943 5.19467 17.2104C5.20272 17.229 5.21764 17.2487 5.23984 17.2647C5.26203 17.2807 5.28628 17.2893 5.30825 17.2913C5.3277 17.2931 5.35165 17.2906 5.38207 17.2747L9.71084 15.0113C9.89226 14.9164 10.1086 14.9164 10.29 15.0113L14.6188 17.2747C14.6492 17.2906 14.6732 17.2931 14.6926 17.2913C14.7146 17.2893 14.7389 17.2807 14.7611 17.2647C14.7832 17.2487 14.7982 17.229 14.8062 17.2104C14.8132 17.1943 14.818 17.1729 14.8125 17.1409L13.986 12.3495C13.9509 12.1459 14.0187 11.9381 14.1671 11.7943L17.6692 8.40279C17.7424 8.33192 17.7077 8.20184 17.5951 8.18547L12.7544 7.48198C12.5514 7.45247 12.3757 7.32517 12.2845 7.14139L10.1199 2.78121C10.1053 2.75178 10.0882 2.73646 10.0719 2.72684C10.0533 2.7159 10.0286 2.7085 10.0004 2.7085C9.97234 2.7085 9.94759 2.7159 9.92902 2.72684ZM8.76138 2.22538C9.269 1.20287 10.7319 1.20287 11.2395 2.22538L13.2584 6.29209L17.7749 6.94847C18.9045 7.11263 19.3649 8.50069 18.5388 9.30073L15.2739 12.4625L16.0443 16.9284C16.2398 18.062 15.0468 18.9091 14.0396 18.3825L10.0004 16.2704L5.96127 18.3825C4.95413 18.9091 3.76105 18.062 3.95659 16.9284L4.72695 12.4625L1.4621 9.30073C0.635989 8.5007 1.09641 7.11263 2.22599 6.94847L6.74247 6.29209L8.76138 2.22538Z" fill="black"/>
                                    </svg>
                                    <span className='text-n16'>4,9</span>
                                </div>
                                <div className="product-rating_count text-n14">
                                    45 оценок
                                </div>
                            </div>
                        </div>
                        <div className="reviews-sort">

                        </div>
                        <div className='reviews-list'>
                            {comments.map((comment) => (
                                <ReviewCard
                                    key={comment.id}
                                    commentId={comment.id}
                                    userId={comment.user}
                                    body={comment.body}
                                    rate={comment.rate}
                                    date={'14 апреля 2025'}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='product_to-basket reviews-product_to-basket'>
                        <div className="product-basket_info">
                            <div className="product-basket_info-text">
                                <div className="product_price text-price2">
                                    5 520 ₽
                                </div>
                                <div className="product_delivery text-desc">
                                    Доставка 15 апреля
                                </div>
                            </div>
                            <button className='product_fav'>
                                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.3053 2.25C13.9937 2.25 12.7335 2.78909 11.8047 3.75232L11.5395 4.02714C11.3982 4.17365 11.2034 4.25641 10.9998 4.25642C10.7962 4.25642 10.6013 4.17365 10.46 4.02714L10.1949 3.75229C8.26309 1.74988 5.12529 1.74988 3.19352 3.7523C1.26883 5.74739 1.26883 8.97705 3.19352 10.9721L10.4886 18.534C10.7573 18.8126 11.2054 18.8232 11.4874 18.5573C13.1657 16.9409 14.7608 15.247 16.368 13.5402C17.1737 12.6847 17.9823 11.8259 18.806 10.9721C19.7292 10.0156 20.25 8.71777 20.25 7.36222C20.25 6.00674 19.7294 4.70909 18.8061 3.7524C17.8773 2.78925 16.617 2.25 15.3053 2.25ZM10.9999 2.44228C12.1757 1.35872 13.7069 0.75 15.3053 0.75C17.0313 0.75 18.679 1.45977 19.8854 2.71074C21.0832 3.95181 21.75 5.6248 21.75 7.36222C21.75 9.0997 21.0831 10.7728 19.8854 12.0137C19.089 12.8393 18.2938 13.6836 17.4945 14.5323C15.871 16.2562 14.2301 17.9985 12.5256 19.64L12.5216 19.6438C11.6426 20.4779 10.2505 20.4476 9.40903 19.5754L2.11399 12.0136C-0.37133 9.43736 -0.37133 5.28707 2.11399 2.71085C4.54605 0.189845 8.46239 0.100323 10.9999 2.44228Z" fill="black"/>
                                </svg>
                            </button>
                        </div>
                        <button className='product_basket-btn btn-black text-btn'>
                            В корзину
                        </button>
                    </div>
                </div>
                <Recommendations />
            </div>
        </div>
    );
};

export default ReviewsPage;
