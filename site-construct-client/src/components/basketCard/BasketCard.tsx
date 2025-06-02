import { useState } from 'react';
import CustomCheckbox from '../customCheckbox/CustomCheckbox';
import './basketCard.scss'
import { Good, toggleWishlist } from '../../store/goodsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { removeAndRefetchBasket, updateBasketAndRefetch } from '../../store/basketSlice';
import { formatPrice } from '../../utils/formatPrice';
import { getDateTwoWeeksLater } from '../../utils/getDate';
import { Link } from 'react-router-dom';

interface Props {
    good: Good;
    id: number;
    count: number;
    isChecked: boolean;
    onToggle: () => void;
}

const BasketCard: React.FC<Props> = ({ good, id, count: initialCount, isChecked, onToggle }) => {
    const [count, setCount] = useState(initialCount);
    const dispatch = useDispatch<AppDispatch>();

    const handleCountChange = async (newCount: number) => {
        if (newCount < 1) return;
        setCount(newCount);
        await dispatch(updateBasketAndRefetch({ id, count: newCount }));
    };
    
    const handleToggleWishlist = (e: React.MouseEvent ) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(toggleWishlist(good.id));
    };

    const handleRemove = () => {
        dispatch(removeAndRefetchBasket(id));
    };

    return (
        <div className='basket-card'>
            <div className="basket-card_checkbox-container">
                <CustomCheckbox
                    checked={isChecked}
                    onChange={() => onToggle()}
                    checkboxClass='basket-card_checkbox'
                />
            </div>
            <Link to={`/product/${good.id}`} className='basket-card_img'>
                {good.media && good.media?.length > 0 && (
                    <img src={good.media[0].source} alt="" />
                )}
            </Link>
            <div className='basket-card_info'>
                <p className="basket-card_price text-price2">
                    {formatPrice(good.price)} ₽
                </p>
                <p className="basket-card_name text-n16">
                    {good.name}
                </p>
                <div className="basket-card_actions">
                    <button className='basket-card_btn' onClick={handleToggleWishlist}>
                        {good.in_wishlist ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z" fill="black"/>
                            </svg>
                        ) : (
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.3053 1.75C13.9937 1.75 12.7335 2.28909 11.8047 3.25232L11.5395 3.52714C11.3982 3.67365 11.2034 3.75641 10.9998 3.75642C10.7962 3.75642 10.6013 3.67365 10.46 3.52714L10.1949 3.25229C8.26309 1.24988 5.12529 1.24988 3.19352 3.2523C1.26883 5.24739 1.26883 8.47705 3.19352 10.4721L10.4886 18.034C10.7573 18.3126 11.2054 18.3232 11.4874 18.0573C13.1657 16.4409 14.7608 14.747 16.368 13.0402C17.1737 12.1847 17.9823 11.3259 18.806 10.4721C19.7292 9.5156 20.25 8.21777 20.25 6.86222C20.25 5.50674 19.7294 4.20909 18.8061 3.2524C17.8773 2.28925 16.617 1.75 15.3053 1.75ZM10.9999 1.94228C12.1757 0.85872 13.7069 0.25 15.3053 0.25C17.0313 0.25 18.679 0.959767 19.8854 2.21074C21.0832 3.45181 21.75 5.1248 21.75 6.86222C21.75 8.5997 21.0831 10.2728 19.8854 11.5137C19.089 12.3393 18.2938 13.1836 17.4945 14.0323C15.871 15.7562 14.2301 17.4985 12.5256 19.14L12.5216 19.1438C11.6426 19.9779 10.2505 19.9476 9.40903 19.0754L2.11399 11.5136C-0.37133 8.93736 -0.37133 4.78707 2.11399 2.21085C4.54605 -0.310155 8.46239 -0.399677 10.9999 1.94228Z" fill="black"/>
                            </svg>
                        )}
                    </button>
                    <button className='basket-card_btn' onClick={handleRemove}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.13 8.26133C20.538 8.33306 20.8105 8.72193 20.7388 9.12988L18.7438 20.4761C18.7438 20.4762 18.7438 20.4762 18.7438 20.4762C18.5126 21.7911 17.3704 22.75 16.0354 22.75H7.96486C6.62979 22.75 5.4876 21.7911 5.25642 20.4762L3.26146 9.12988C3.18973 8.72192 3.46229 8.33306 3.87025 8.26133C4.2782 8.18961 4.66707 8.46217 4.73879 8.87013L6.73375 20.2164C6.83885 20.8141 7.35804 21.25 7.96486 21.25H16.0354C16.6422 21.25 17.1614 20.8141 17.2664 20.2165L17.2665 20.2164L19.2615 8.87012C19.3332 8.46217 19.722 8.1896 20.13 8.26133Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.625 2.75C9.93464 2.75 9.375 3.30964 9.375 4V5.25H14.625V4C14.625 3.30964 14.0654 2.75 13.375 2.75H10.625ZM7.875 5.25V4C7.875 2.48122 9.10622 1.25 10.625 1.25H13.375C14.8938 1.25 16.125 2.48122 16.125 4V5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H7.875Z" fill="black"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="basket-card_set">
                <div className='basket-card_count text-h2'>
                    <button className='basket-card_count-btn' onClick={() => handleCountChange(count - 1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="black"/>
                        </svg>
                    </button>
                    <span className='basket-card_count-value'>{count}</span>
                    <button className='basket-card_count-btn' onClick={() => handleCountChange(count + 1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H12.75V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V12.75H8C7.58579 12.75 7.25 12.4142 7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H11.25V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="black"/>
                        </svg>
                    </button>
                </div>
                <div className='basket-card_delivery text-desc'>
                    Доставка {getDateTwoWeeksLater()}
                </div>
            </div>
        </div>
    );
};

export default BasketCard;