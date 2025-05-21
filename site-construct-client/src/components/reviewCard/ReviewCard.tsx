import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './reviewCard.scss'
import { fetchUserById } from '../../store/usersSlice';

export interface ReviewCardProps {
  commentId: number;
  userId: number;
  body: string;
  rate: number;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ userId, body, rate, date }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.users.users[userId]);

    useEffect(() => {
        if (!user) {
        dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId, user]);

    return (
        <div className='review-card'>
            <div className="review-card_header">
                <div className="review-prev_author">
                    <div className="review-prev_author-avatar">
                        {user && user.avatar && (
                            <img src={user.avatar} alt="" />
                        )}
                    </div>
                    <span className='review-prev_author-name text-h2'>
                        {user ? user.first_name + ' ' + (user.last_name ? user.last_name[0]+ '.' : '')  : 'Пользователь'}
                    </span>
                </div>
                <div className="review-prev_info">
                    <div className="review-prev_date text-n14">
                        {date}
                    </div>
                    <div className="review-prev_rating">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.44053 6.17698L8.38867 2.25282C8.63876 1.74906 9.36124 1.74906 9.61133 2.25282L11.5595 6.17698L15.9161 6.81013C16.4751 6.89136 16.6979 7.57453 16.2932 7.96644L13.1413 11.0188L13.8852 15.3311C13.9807 15.8848 13.3961 16.3071 12.8959 16.0456L9 14.0085L5.1041 16.0456C4.60395 16.3071 4.01932 15.8848 4.11484 15.3311L4.85869 11.0188L1.70681 7.96644C1.30213 7.57453 1.52491 6.89136 2.08389 6.81013L6.44053 6.17698Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.93573 2.45401C8.92105 2.46267 8.90566 2.47645 8.89251 2.50294L6.94437 6.4271C6.86225 6.59251 6.70418 6.70707 6.52144 6.73363L2.1648 7.36678C2.06347 7.38151 2.03228 7.49858 2.09814 7.56237L5.25002 10.6147C5.38361 10.7441 5.44463 10.9312 5.41301 11.1144L4.66916 15.4267C4.66421 15.4554 4.66852 15.4747 4.67481 15.4892C4.68206 15.5059 4.69549 15.5236 4.71546 15.5381C4.73543 15.5525 4.75726 15.5602 4.77704 15.562C4.79453 15.5637 4.8161 15.5614 4.84347 15.5471L8.73937 13.51C8.90264 13.4246 9.09738 13.4246 9.26065 13.51L13.1566 15.5471C13.1839 15.5614 13.2055 15.5637 13.223 15.562C13.2428 15.5602 13.2646 15.5525 13.2846 15.5381C13.3045 15.5236 13.318 15.5059 13.3252 15.4892C13.3315 15.4747 13.3358 15.4554 13.3309 15.4267L12.587 11.1144C12.5554 10.9312 12.6164 10.7441 12.75 10.6147L15.9019 7.56237C15.9677 7.49858 15.9366 7.38151 15.8352 7.36678L11.4786 6.73363C11.2958 6.70707 11.1378 6.59251 11.0557 6.4271L9.10751 2.50294C9.09436 2.47645 9.07896 2.46267 9.06429 2.45401C9.04758 2.44416 9.02531 2.4375 9.00001 2.4375C8.97471 2.4375 8.95244 2.44416 8.93573 2.45401ZM7.88485 2.00269C8.34171 1.08244 9.65831 1.08244 10.1152 2.00269L11.9322 5.66273L15.997 6.25347C17.0136 6.40122 17.428 7.65048 16.6845 8.37051L13.7462 11.2161L14.4395 15.2354C14.6155 16.2556 13.5417 17.018 12.6353 16.5441L9.00001 14.6432L5.36475 16.5441C4.45832 17.018 3.38456 16.2556 3.56054 15.2354L4.25386 11.2161L1.3155 8.37051C0.571999 7.65048 0.986382 6.40122 2.003 6.25347L6.06783 5.66273L7.88485 2.00269Z" fill="black"/>
                        </svg>
                        <span className='text-h2'>{rate}</span>
                    </div>
                </div>
            </div>
            <div className="review-card_body">
                <p className='review-card_text text-n14'>
                    {body}
                </p>
                <div className='review-card_imgs'>
                    <div className='review-card_img'></div>
                    <div className='review-card_img'></div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;