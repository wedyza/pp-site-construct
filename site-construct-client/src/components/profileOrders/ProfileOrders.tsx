import { Link } from 'react-router-dom';
import './profileOrders.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchWishlist } from '../../store/wishlistSlice';
import { fetchBasketItems } from '../../store/basketSlice';

const ProfileOrders: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items: goods/*, loading, error*/ } = useAppSelector((state) => state.wishlist);
    const rawItems = useAppSelector((state) => state.basket.rawItems);
    const totalCount = rawItems.reduce((sum, item) => sum + item.count, 0);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchBasketItems());
    }, [dispatch]);
    return (
        <div className='profile-orders'>
            <div className='profile-rate profile-item'>
                <div className='profile-item_header text-n14'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.75 2.8125C3.23223 2.8125 2.8125 3.23223 2.8125 3.75V14.8964L4.3604 12.9616C4.7518 12.4723 5.34438 12.1875 5.97094 12.1875H14.25C14.7678 12.1875 15.1875 11.7678 15.1875 11.25V3.75C15.1875 3.23223 14.7678 2.8125 14.25 2.8125H3.75ZM1.6875 3.75C1.6875 2.61091 2.61091 1.6875 3.75 1.6875H14.25C15.3891 1.6875 16.3125 2.61091 16.3125 3.75V11.25C16.3125 12.3891 15.3891 13.3125 14.25 13.3125H5.97094C5.68614 13.3125 5.41678 13.442 5.23887 13.6643L3.49063 15.8497C2.89274 16.597 1.6875 16.1742 1.6875 15.2171V3.75Z" fill="black"/>
                    </svg>
                    <span>Ждут отзыва</span>
                </div>
                <div className='profile-item_body'>
                    <span className='profile-item_info text-h2'>
                        24 товара
                    </span>
                    <div className='profile-item_link text-n14'>
                        <span>Оценить</span>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L5.93934 7L0.46967 12.4697C0.176777 12.7626 0.176777 13.2374 0.46967 13.5303C0.762563 13.8232 1.23744 13.8232 1.53033 13.5303L7.53033 7.53033C7.82322 7.23744 7.82322 6.76256 7.53033 6.46967L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967Z" fill="black"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className='profile-fav profile-item'>
                <div className='profile-item_header text-n14'>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.229 1.8125C11.2452 1.8125 10.3001 2.21682 9.60349 2.93924L9.40465 3.14535C9.29864 3.25524 9.15251 3.31731 8.99983 3.31731C8.84714 3.31731 8.70101 3.25524 8.595 3.14535L8.39614 2.93922C6.94732 1.43741 4.59397 1.43741 3.14514 2.93922C1.70162 4.43554 1.70162 6.85778 3.14514 8.3541L8.61642 14.0255C8.81798 14.2344 9.15407 14.2424 9.36557 14.0429C10.6243 12.8307 11.8206 11.5602 13.026 10.2802C13.6302 9.63853 14.2367 8.99446 14.8545 8.3541C15.5469 7.6367 15.9375 6.66333 15.9375 5.64666C15.9375 4.63005 15.5471 3.65681 14.8546 2.9393C14.158 2.21694 13.2127 1.8125 12.229 1.8125ZM8.9999 1.95671C9.88179 1.14404 11.0302 0.6875 12.229 0.6875C13.5235 0.6875 14.7592 1.21983 15.6641 2.15806C16.5624 3.08885 17.0625 4.3436 17.0625 5.64666C17.0625 6.94977 16.5624 8.20458 15.6641 9.13528C15.0667 9.75447 14.4704 10.3877 13.8709 11.0242C12.6532 12.3171 11.4226 13.6238 10.1442 14.855L10.1412 14.8578C9.48198 15.4834 8.43786 15.4607 7.80677 14.8066L2.33549 9.13519C0.471503 7.20302 0.471503 4.0903 2.33549 2.15814C4.15953 0.267384 7.09679 0.200242 8.9999 1.95671Z" fill="black"/>
                    </svg>
                    <span>Избранное</span>
                </div>
                <div className='profile-item_body'>
                    <span className='profile-item_info text-h2'>
                        {goods.length} товара
                    </span>
                    <Link to='/favourites' className='profile-item_link text-n14'>
                        <span>Перейти</span>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L5.93934 7L0.46967 12.4697C0.176777 12.7626 0.176777 13.2374 0.46967 13.5303C0.762563 13.8232 1.23744 13.8232 1.53033 13.5303L7.53033 7.53033C7.82322 7.23744 7.82322 6.76256 7.53033 6.46967L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967Z" fill="black"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className='profile-basket profile-item'>
                <div className='profile-item_header text-n14'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_121_1303)">
                        <path d="M14.625 16.5C15.2463 16.5 15.75 15.9963 15.75 15.375C15.75 14.7537 15.2463 14.25 14.625 14.25C14.0037 14.25 13.5 14.7537 13.5 15.375C13.5 15.9963 14.0037 16.5 14.625 16.5Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.625 14.8125C14.3143 14.8125 14.0625 15.0643 14.0625 15.375C14.0625 15.6857 14.3143 15.9375 14.625 15.9375C14.9357 15.9375 15.1875 15.6857 15.1875 15.375C15.1875 15.0643 14.9357 14.8125 14.625 14.8125ZM12.9375 15.375C12.9375 14.443 13.693 13.6875 14.625 13.6875C15.557 13.6875 16.3125 14.443 16.3125 15.375C16.3125 16.307 15.557 17.0625 14.625 17.0625C13.693 17.0625 12.9375 16.307 12.9375 15.375Z" fill="black"/>
                        <path d="M7.125 16.5C7.74632 16.5 8.25 15.9963 8.25 15.375C8.25 14.7537 7.74632 14.25 7.125 14.25C6.50368 14.25 6 14.7537 6 15.375C6 15.9963 6.50368 16.5 7.125 16.5Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.125 14.8125C6.81434 14.8125 6.5625 15.0643 6.5625 15.375C6.5625 15.6857 6.81434 15.9375 7.125 15.9375C7.43566 15.9375 7.6875 15.6857 7.6875 15.375C7.6875 15.0643 7.43566 14.8125 7.125 14.8125ZM5.4375 15.375C5.4375 14.443 6.19302 13.6875 7.125 13.6875C8.05698 13.6875 8.8125 14.443 8.8125 15.375C8.8125 16.307 8.05698 17.0625 7.125 17.0625C6.19302 17.0625 5.4375 16.307 5.4375 15.375Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.9375 1.5C0.9375 1.18934 1.18934 0.9375 1.5 0.9375C2.97629 0.9375 3.7898 1.75616 4.13343 2.4375H16.5C16.6668 2.4375 16.825 2.51152 16.9319 2.63958C17.0387 2.76764 17.0833 2.93652 17.0534 3.10062L15.5534 11.3506C15.5048 11.6181 15.2718 11.8125 15 11.8125H5.25C4.97815 11.8125 4.7452 11.6181 4.69657 11.3506L3.20037 3.12149C3.11498 2.81158 2.67402 2.0625 1.5 2.0625C1.18934 2.0625 0.9375 1.81066 0.9375 1.5ZM4.42399 3.5625L5.71945 10.6875H14.5306L15.826 3.5625H4.42399Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.73652 12.1059C2.54339 12.2519 2.4375 12.4549 2.4375 12.75C2.4375 13.0451 2.54339 13.2481 2.73652 13.3941C2.94991 13.5555 3.32619 13.6875 3.92308 13.6875H14.625C14.9357 13.6875 15.1875 13.9393 15.1875 14.25C15.1875 14.5607 14.9357 14.8125 14.625 14.8125H3.92308C3.18174 14.8125 2.53398 14.6515 2.05788 14.2914C1.56154 13.916 1.3125 13.369 1.3125 12.75C1.3125 12.131 1.56154 11.584 2.05788 11.2086C2.53398 10.8485 3.18174 10.6875 3.92308 10.6875H15C15.3107 10.6875 15.5625 10.9393 15.5625 11.25C15.5625 11.5607 15.3107 11.8125 15 11.8125H3.92308C3.32619 11.8125 2.94991 11.9445 2.73652 12.1059Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_121_1303">
                        <rect width="18" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <span>В корзине</span>
                </div>
                <div className='profile-item_body'>
                    <span className='profile-item_info text-h2'>
                        {totalCount} товара
                    </span>
                    <Link to='/basket' className='profile-item_link text-n14'>
                        <span>Перейти</span>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L5.93934 7L0.46967 12.4697C0.176777 12.7626 0.176777 13.2374 0.46967 13.5303C0.762563 13.8232 1.23744 13.8232 1.53033 13.5303L7.53033 7.53033C7.82322 7.23744 7.82322 6.76256 7.53033 6.46967L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967Z" fill="black"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileOrders;