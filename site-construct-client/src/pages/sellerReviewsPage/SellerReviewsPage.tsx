import { useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import Search from '../../components/search/Search';
import SellerNav from '../../components/sellerNav/SellerNav';
import './sellerReviewsPage.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addReply, fetchComments } from '../../store/reviewsSlice';

const SellerReviewsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { comments/*, loading, error*/ } = useAppSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleReplyClick = (commentId: number) => {
        setSelectedCommentId(commentId);
        setReplyText('');
        setIsModalOpen(true);
    };

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCommentId && replyText.trim()) {
            await dispatch(addReply({ comment: selectedCommentId, body: replyText }));
            setIsModalOpen(false);
        }
    };

    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-finance'>
                <div className='text-h3 seller-finance_title'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.4164 2.78252L14.9863 3.6944C14.8976 3.8825 14.7211 4.01415 14.5155 4.0456L13.4961 4.20156L14.252 4.97216C14.3915 5.11431 14.4548 5.3144 14.4226 5.51091L14.2504 6.56202L15.115 6.08613C15.3026 5.98285 15.5301 5.98285 15.7177 6.08613L16.5824 6.56202L16.4101 5.51091C16.3779 5.3144 16.4413 5.11431 16.5807 4.97216L17.3366 4.20156L16.3172 4.0456C16.1116 4.01415 15.9351 3.8825 15.8464 3.6944L15.4164 2.78252ZM14.6133 1.55481C14.936 0.870728 15.8968 0.870728 16.2194 1.55481L16.8351 2.86029L18.2005 3.06916C18.9595 3.18527 19.1856 4.10168 18.6988 4.598L17.6949 5.62137L17.9329 7.074C18.0435 7.74882 17.3393 8.4055 16.6301 8.01512L15.4164 7.34709L14.2027 8.01512C13.4934 8.4055 12.7892 7.74882 12.8998 7.074L13.1379 5.62137L12.134 4.598C11.6471 4.10168 11.8733 3.18527 12.6323 3.06916L13.9976 2.86029L14.6133 1.55481Z" fill="#02040F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.99935 2.29175C5.74215 2.29175 2.29102 5.74289 2.29102 10.0001C2.29102 11.4051 2.66638 12.7206 3.32187 13.8538C3.39656 13.9829 3.42261 14.1345 3.39531 14.2811L2.86387 17.1356L5.71828 16.6041C5.86493 16.5768 6.01651 16.6029 6.14564 16.6776C7.27879 17.3331 8.59429 17.7084 9.99935 17.7084C14.2565 17.7084 17.7077 14.2573 17.7077 10.0001C17.7077 9.73949 17.6948 9.4821 17.6696 9.2285C17.6355 8.88501 17.8863 8.57891 18.2298 8.54481C18.5733 8.5107 18.8794 8.76151 18.9135 9.105C18.9427 9.39957 18.9577 9.69818 18.9577 10.0001C18.9577 14.9476 14.9469 18.9584 9.99935 18.9584C8.45242 18.9584 6.99548 18.5658 5.72448 17.8745L2.19708 18.5312C1.99454 18.5689 1.78642 18.5044 1.64074 18.3587C1.49506 18.213 1.43053 18.0049 1.46824 17.8024L2.12498 14.275C1.43362 13.0039 1.04102 11.547 1.04102 10.0001C1.04102 5.05253 5.0518 1.04175 9.99935 1.04175C10.3013 1.04175 10.5999 1.0567 10.8944 1.08595C11.2379 1.12006 11.4887 1.42616 11.4546 1.76964C11.4205 2.11313 11.1144 2.36394 10.7709 2.32984C10.5173 2.30466 10.2599 2.29175 9.99935 2.29175Z" fill="#02040F"/>
                    </svg>
                    <h1>Отзывы</h1>
                </div>
                <div className="seller-orders_search-container">
                    <div className="seller-orders_search">
                        <Search
                            value={''}
                            onChange={() => {}}
                            onSubmit={() => {}}
                        />
                    </div>
                </div>
                <div className='seller-reviews_table seller-table text-n11'>
                    <div className='seller-orders_table-head seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>Дата отзыва</div>
                        <div className='seller-orders_table-cell'>Товар</div>
                        <div className='seller-orders_table-cell'>Категория</div>
                        <div className='seller-orders_table-cell'>Оценка</div>
                        <div className='seller-orders_table-cell'>Отзыв</div>
                        <div className='seller-orders_table-cell'>Фото</div>
                        <div className='seller-orders_table-cell'>Ответ</div>
                    </div>
                    
                    {comments.map((comment) => (
                        <div className='seller-orders_table-body seller-orders_table-row'>
                            <div className='seller-orders_table-cell'>20.02.2025, 14:51</div>
                            <div className='seller-orders_table-cell'>
                                {comment.good?.name}
                            </div>
                            <div className='seller-orders_table-cell'>
                                {comment.good?.category}
                            </div>
                            <div className='seller-orders_table-cell'>
                                {comment.rate}
                            </div>
                            <div className='seller-orders_table-cell'>
                                {comment.body}
                            </div>
                            <div className='seller-orders_table-cell seller-order_table-imgs'>
                                {comment.media?.map((img) => (
                                    <div className='seller-order_table-img'>
                                        <img src={img.source} alt="" />
                                    </div>
                                ))}
                            </div>
                            <div className='seller-orders_table-cell'>
                                {comment.reply.body ? (
                                    <div className='seller_comment-reply'>
                                        <p className='seller_comment-reply-text'>{comment.reply.body}</p>
                                        <button className='seller-reviews_edit'>
                                            Редактировать
                                        </button>
                                    </div>
                                ) : (
                                    <button className='seller-reviews_add' onClick={() => handleReplyClick(comment.id)}>
                                        Ответить
                                    </button>
                                )}
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="seller-review_modal">
                <form className='seller-review_modal-form' onSubmit={handleReplySubmit}>
                    <h2 className='text-h2'>Ответьте на отзыв</h2>
                    <span className='text-n14 seller-review_modal-label'>Ваш ответ</span>
                    <textarea
                        className='seller-review_modal-input text-n16'
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        required
                    />
                    <div className="seller-review_modal-btns">
                        <button type="submit" className="seller-review_modal-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.46783 11.9697C6.76072 11.6768 7.2356 11.6768 7.52849 11.9697L9.99816 14.4393L16.4678 7.96967C16.7607 7.67678 17.2356 7.67678 17.5285 7.96967C17.8214 8.26256 17.8214 8.73744 17.5285 9.03033L10.5285 16.0303C10.2356 16.3232 9.76072 16.3232 9.46783 16.0303L6.46783 13.0303C6.17494 12.7374 6.17494 12.2626 6.46783 11.9697Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="black"/>
                            </svg>
                        </button>
                        <button className="seller-review_modal-btn" onClick={() => setIsModalOpen(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.64001 8.64124C8.9329 8.34835 9.40777 8.34835 9.70067 8.64124L11.9988 10.9393L14.2969 8.64124C14.5898 8.34835 15.0646 8.34835 15.3575 8.64124C15.6504 8.93414 15.6504 9.40901 15.3575 9.7019L13.0594 12L15.3575 14.2981C15.6504 14.591 15.6504 15.0659 15.3575 15.3588C15.0646 15.6517 14.5898 15.6517 14.2969 15.3588L11.9988 13.0607L9.70067 15.3588C9.40777 15.6517 8.9329 15.6517 8.64001 15.3588C8.34711 15.0659 8.34711 14.591 8.64001 14.2981L10.9381 12L8.64001 9.7019C8.34711 9.40901 8.34711 8.93414 8.64001 8.64124Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default SellerReviewsPage;
