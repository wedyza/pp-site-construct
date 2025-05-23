import React, { useEffect, useState } from 'react';
import './reviewsPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import { Link, useParams } from 'react-router-dom';
import Recommendations from '../../components/recommendations/Recommendations';
import ReviewCard from '../../components/reviewCard/ReviewCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchComments } from '../../store/commentsSlice';
import { fetchGoodById, toggleWishlist } from '../../store/goodsSlice';
import { formatPrice } from '../../utils/formatPrice';
import { addBasketItem, removeBasketItem, updateBasketItem } from '../../store/basketSlice';

const ReviewsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { selectedItem/*, loading, error*/ } = useAppSelector((state) => state.goods);
    const [count, setCount] = useState(selectedItem?.basket_count);

    useEffect(() => {
        if (id) {
            dispatch(fetchGoodById(Number(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedItem){
            dispatch(fetchComments(selectedItem.id));
        }
    }, [dispatch, selectedItem]);
    const comments = useAppSelector((state) => state.comments.comments);
    
        
    useEffect(() => {
        setCount(selectedItem?.basket_count);
    }, [selectedItem]);

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
                <div className='reviews-page_content'>
                    <div className='reviews-content'>
                        <div className="text-desc reviews-path">
                            <Link to={`/product/${id}`}>{selectedItem?.name}</Link>
                            <span> / Отзывы</span>
                        </div>
                        <div className="reviews-product">
                            <div className="reviews-product_img">
                                {selectedItem.media && selectedItem.media?.length > 0 && (
                                    <img src={selectedItem.media[0].source} alt="" />
                                )}
                            </div>
                            <div className="reviews-product_name text-h1">
                                {selectedItem?.name}
                            </div>
                            <div className="reviews-product_rating product-rating">
                                <div className="product-rating_value">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.15647 6.86347L9.32107 2.5033C9.59895 1.94356 10.4017 1.94356 10.6796 2.5033L12.8442 6.86347L17.6849 7.56697C18.306 7.65723 18.5535 8.41631 18.1039 8.85176L14.6018 12.2433L15.4283 17.0347C15.5344 17.65 14.8848 18.1192 14.3291 17.8286L10.0003 15.5651L5.67155 17.8286C5.11583 18.1192 4.46623 17.65 4.57237 17.0347L5.39887 12.2433L1.89678 8.85176C1.44714 8.41631 1.69468 7.65723 2.31576 7.56697L7.15647 6.86347Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.92902 2.72684C9.91272 2.73646 9.89561 2.75178 9.881 2.78121L7.7164 7.14139C7.62516 7.32517 7.44953 7.45247 7.24648 7.48198L2.40577 8.18547C2.29317 8.20184 2.25852 8.33192 2.3317 8.40279L5.83379 11.7943C5.98223 11.9381 6.05002 12.1459 6.01489 12.3495L5.18839 17.1409C5.18288 17.1729 5.18768 17.1943 5.19467 17.2104C5.20272 17.229 5.21764 17.2487 5.23984 17.2647C5.26203 17.2807 5.28628 17.2893 5.30825 17.2913C5.3277 17.2931 5.35165 17.2906 5.38207 17.2747L9.71084 15.0113C9.89226 14.9164 10.1086 14.9164 10.29 15.0113L14.6188 17.2747C14.6492 17.2906 14.6732 17.2931 14.6926 17.2913C14.7146 17.2893 14.7389 17.2807 14.7611 17.2647C14.7832 17.2487 14.7982 17.229 14.8062 17.2104C14.8132 17.1943 14.818 17.1729 14.8125 17.1409L13.986 12.3495C13.9509 12.1459 14.0187 11.9381 14.1671 11.7943L17.6692 8.40279C17.7424 8.33192 17.7077 8.20184 17.5951 8.18547L12.7544 7.48198C12.5514 7.45247 12.3757 7.32517 12.2845 7.14139L10.1199 2.78121C10.1053 2.75178 10.0882 2.73646 10.0719 2.72684C10.0533 2.7159 10.0286 2.7085 10.0004 2.7085C9.97234 2.7085 9.94759 2.7159 9.92902 2.72684ZM8.76138 2.22538C9.269 1.20287 10.7319 1.20287 11.2395 2.22538L13.2584 6.29209L17.7749 6.94847C18.9045 7.11263 19.3649 8.50069 18.5388 9.30073L15.2739 12.4625L16.0443 16.9284C16.2398 18.062 15.0468 18.9091 14.0396 18.3825L10.0004 16.2704L5.96127 18.3825C4.95413 18.9091 3.76105 18.062 3.95659 16.9284L4.72695 12.4625L1.4621 9.30073C0.635989 8.5007 1.09641 7.11263 2.22599 6.94847L6.74247 6.29209L8.76138 2.22538Z" fill="black"/>
                                    </svg>
                                    <span className='text-n16'>{selectedItem?.rate?.rate__avg}</span>
                                </div>
                                <div className="product-rating_count text-n14">
                                    {selectedItem?.rate?.rate__count} оценок
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
                                    reply={comment.reply}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='product_to-basket reviews-product_to-basket'>
                        <div className="product-basket_info">
                            <div className="product-basket_info-text">
                                <div className="product_price text-price2">
                                    {selectedItem && formatPrice(selectedItem?.price)} ₽
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
                </div>
                <Recommendations />
            </div>
        </div>
    );
};

export default ReviewsPage;
