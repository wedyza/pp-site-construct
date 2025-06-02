import React, { useEffect, useState } from 'react';
import './ordersPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import PurchasedCard from '../../components/purchasedCard/PurchasedCard';
import Header from '../../components/header/Header';
import OrderCard from '../../components/orderCard/OrderCard';
import Recommendations from '../../components/recommendations/Recommendations';
import EmptyOrders from '../../components/emptyOrders/EmptyOrders';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCompletedOrders, fetchCurrentOrders, Order } from '../../store/orderSlice';
import { fetchBoughtGoods, Good } from '../../store/goodsSlice';
import { fetchRefunds } from '../../store/refundSlice';
import Modal from '../../components/modal/Modal';
import { addComment, fetchCommentById, updateComment } from '../../store/reviewsSlice';
import StarRating from '../../components/starRating/StarRating';
import FileUploader from '../../components/fileUploader/FileUploader';

const OrdersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'current' | 'completed' | 'purchased' | 'refunds'>('current');
    const dispatch = useAppDispatch();
    const { currentOrders, completedOrders/*, loading*/ } = useAppSelector(state => state.orders);
    const { boughtItems: purchasedGoods } = useAppSelector(state => state.goods);
    const { refunds } = useAppSelector(state => state.refund)

    useEffect(() => {
        dispatch(fetchCurrentOrders());
        dispatch(fetchCompletedOrders());
        dispatch(fetchRefunds());
        dispatch(fetchBoughtGoods());
    }, [dispatch]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGood, setSelectedGood] = useState<Good | null>(null);
    const [selectedGoodComment, setSelectedGoodComment] = useState<number | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (isModalOpen && selectedGood && !selectedGood.able_to_comment) {
            dispatch(fetchCommentById(selectedGood.id))
                .unwrap()
                .then((comment) => {
                    setReviewText(comment.body || '');
                    setRating(comment.rate || 0);
                    setSelectedGoodComment(comment.id);
                })
                .catch((err) => {
                    console.error('Ошибка при загрузке отзыва:', err);
                });
        }
    }, [isModalOpen, selectedGood, dispatch]);

    const handleSubmitReview = () => {
        if (!selectedGood || !reviewText || rating < 1) {
            alert("Пожалуйста, заполните отзыв и укажите рейтинг.");
            return;
        }

        const formData = new FormData();
        formData.append('item', selectedGood.id.toString());
        formData.append('body', reviewText);
        formData.append('rate', rating.toString());

        files.forEach((file) => {
            formData.append('media', file);
        });

        dispatch(addComment(formData))
            .unwrap()
            .then(() => {
                setIsModalOpen(false);
                setReviewText('');
                setRating(0);
                setFiles([]);
                setSelectedGoodComment(null);
                console.log(purchasedGoods);
            })
            .catch((err) => {
                console.error("Ошибка при добавлении отзыва:", err);
            });
    };

    const handleUpdateReview = () => {
        if (!selectedGood || !reviewText || rating < 1) {
            console.error("Пожалуйста, заполните отзыв и укажите рейтинг.");
            return;
        }

        if (!selectedGoodComment) {
            console.error("Комментарий не найден для обновления.");
            return;
        }

        dispatch(updateComment({
            commentId: selectedGoodComment,
            body: reviewText,
            rate: rating
        }))
            .unwrap()
            .then(() => {
                setIsModalOpen(false);
                setReviewText('');
                setRating(0);
                setFiles([]);
                setSelectedGoodComment(null);
            })
            .catch((err) => {
                console.error("Ошибка при обновлении отзыва:", err);
            });
    };

    useEffect(() => {
        if (!isModalOpen) {
            setRating(0);
            setReviewText('');
            setFiles([]);
            setSelectedGoodComment(null);
        }
    }, [isModalOpen]);
            
    useEffect(() => {
        document.title = `Заказы | Kaufen`;

        return () => {
            document.title = 'Kaufen';
        };
    }, []);

    return (
        <div className='page-content'>
            <Header />
            <HeaderCategories />
            <div className="orders-tabs">
                <button
                    className={`orders-tab text-h2 ${activeTab === 'current' ? 'orders-tab__active' : ''}`}
                    onClick={() => setActiveTab('current')}
                >
                    Текущие ({currentOrders.length})
                </button>
                <button
                    className={`orders-tab text-h2 ${activeTab === 'completed' ? 'orders-tab__active' : ''}`}
                    onClick={() => setActiveTab('completed')}
                >
                    Завершённые ({completedOrders.length})
                </button>
                <button
                    className={`orders-tab text-h2 ${activeTab === 'purchased' ? 'orders-tab__active' : ''}`}
                    onClick={() => setActiveTab('purchased')}
                >
                    Купленные товары ({purchasedGoods.length})
                </button>
                <button
                    className={`orders-tab text-h2 ${activeTab === 'refunds' ? 'orders-tab__active' : ''}`}
                    onClick={() => setActiveTab('refunds')}
                >
                    Возвраты ({refunds.length})
                </button>
            </div>
            <div className="orders-content">
                {activeTab === 'current' && (
                    currentOrders.length > 0 ? (
                        <ul className="orders-list">
                            {currentOrders.map((order, index) => (
                                <li className='order' key={index}>
                                    <OrderCard order={order} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyOrders />
                    )
                )}
                {activeTab === 'completed' && (
                    completedOrders.length > 0 ? (
                        <ul className="orders-list">
                        {completedOrders.map((order, index) => (
                            <li className='order' key={index}>
                                <OrderCard order={order} />
                            </li>
                        ))}
                    </ul>
                    ) : (
                        <EmptyOrders />
                    )
                )}
                {activeTab === 'purchased' && (
                    purchasedGoods.length > 0 ? (
                        <ul className="orders_goods-list">
                            {purchasedGoods.map((order, index) => (
                                <li className='order' key={index}>
                                    <PurchasedCard good={order} onOpen={(good) => {
                                        setIsModalOpen(true);
                                        setSelectedGood(good);
                                    }}/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyOrders />
                    )
                )}
                {activeTab === 'refunds' && (
                    refunds.length > 0 ? (
                        <ul className="orders_goods-list">
                            {refunds.map((refund, index) => (
                                <li className='order' key={index}>
                                    <PurchasedCard good={refund.item} order={refund.order} onOpen={(good) => {
                                        setIsModalOpen(true);
                                        setSelectedGood(good);
                                    }}/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyOrders />
                    )
                )}
            </div>
            <Recommendations />
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="profile-reviews_modal"
            >
                <button className='reviews-modal_exit modal_exit-btn' onClick={() => setIsModalOpen(false)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.227072 0.22703C0.519965 -0.0658633 0.994839 -0.0658636 1.28773 0.22703L6.00004 4.93934L10.7124 0.22703C11.0052 -0.0658633 11.4801 -0.0658637 11.773 0.22703C12.0659 0.519923 12.0659 0.994797 11.773 1.28769L7.0607 6L11.773 10.7123C12.0659 11.0052 12.0659 11.4801 11.773 11.773C11.4801 12.0659 11.0052 12.0659 10.7124 11.773L6.00004 7.06066L1.28773 11.773C0.994839 12.0659 0.519965 12.0659 0.227072 11.773C-0.0658213 11.4801 -0.0658213 11.0052 0.227072 10.7123L4.93938 6L0.227072 1.28769C-0.0658213 0.994797 -0.0658213 0.519923 0.227072 0.22703Z" fill="#02040F"/>
                    </svg>
                </button>
                <div className="reviews-modal_header">
                    <div className="reviews-modal_header-img">
                        {selectedGood?.media?.[0]?.source && (
                            <img src={selectedGood.media[0].source} alt={selectedGood.name} />
                        )}
                    </div>
                    <h2 className="text-h2 reviews-modal_header-name">{selectedGood?.name}</h2>
                </div>
                <div className="reviews-modal_form">
                    <label className="text-n14 reviews-form_label">Ваш отзыв</label>
                    <textarea
                        placeholder="Начните писать"
                        className="reviews-form_textarea text-n14"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <StarRating rating={rating} onRate={(value) => setRating(value)} />
                    <div className="reviews-modal_form-uploader">
                        <FileUploader onFilesChange={setFiles} />
                    </div>
                    
                    <button
                        className='btn-black reviews-modal_form-btn text-btn'
                        onClick={() => {
                            if (selectedGood && selectedGood.able_to_comment) {
                                handleSubmitReview()
                            } else {
                                handleUpdateReview()
                            }
                        }}
                    >
                        Оставить отзыв
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default OrdersPage;
