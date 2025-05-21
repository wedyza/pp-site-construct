import { useEffect, useState } from 'react';
import './profileReviews.scss'
import Modal from '../modal/Modal';
import StarRating from '../starRating/StarRating';
import FileUploader from '../fileUploader/FileUploader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addComment, fetchComments, fetchUncommentedGoods } from '../../store/reviewsSlice';

const ProfileReviews: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGood, setSelectedGood] = useState<any | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    
    const dispatch = useAppDispatch();
    const { uncommentedGoods, comments, loading, error } = useAppSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(fetchUncommentedGoods());
        dispatch(fetchComments());
    }, [dispatch]);

    const handleSubmitReview = () => {
        if (!selectedGood || !reviewText || rating < 1) {
            alert("Пожалуйста, заполните отзыв и укажите рейтинг.");
            return;
        }

        dispatch(addComment({
            item: selectedGood.id,
            body: reviewText,
            rate: rating,
        }))
        .unwrap()
        .then(() => {
            setIsModalOpen(false);
            setReviewText('');
            setRating(0);
            setFiles([]);
        })
        .catch((err) => {
            console.error("Ошибка при добавлении отзыва:", err);
            alert("Ошибка при отправке отзыва.");
        });
    };
    
    return (
        <div className='profile-reviews'>
            <h1 className='text-h1'>Отзывы</h1>
            <h2 className='profile-reviews_title text-n16'>Оставьте отзыв</h2>
            <ul className='profile-reviews_make'>
                {uncommentedGoods.map((good) => (
                    <li className='profile-reviews_make-card'>
                        <div className='reviews-make_card-img'>
                            {good.media && good.media?.length > 0 && (
                                <img src={good.media[0].source} alt="" />
                            )}
                        </div>
                        <div className='reviews-make_card-content'>
                            <p className='reviews-make_card-name text-h2'>
                                {good.name}
                            </p>
                            <div className='reviews-make_card-stars'>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <svg key={index} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" fill="#02040F" fillOpacity="0.15"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.9141 3.27202C11.8946 3.28355 11.874 3.30194 11.8565 3.33726L9.259 8.56947C9.14951 8.79001 8.93875 8.94276 8.69509 8.97817L2.88624 9.82237C2.75113 9.84201 2.70954 9.99811 2.79736 10.0832L6.99986 14.153C7.17799 14.3255 7.25934 14.5749 7.21719 14.8193L6.22539 20.5689C6.21878 20.6072 6.22453 20.6329 6.23292 20.6523C6.24258 20.6746 6.26049 20.6982 6.28712 20.7174C6.31375 20.7367 6.34285 20.747 6.36922 20.7494C6.39255 20.7516 6.4213 20.7486 6.4578 20.7295L11.6523 18.0134C11.87 17.8995 12.1297 17.8995 12.3474 18.0134L17.5419 20.7295C17.5784 20.7486 17.6072 20.7516 17.6305 20.7494C17.6569 20.747 17.686 20.7367 17.7126 20.7174C17.7392 20.6982 17.7571 20.6746 17.7668 20.6523C17.7752 20.6329 17.7809 20.6072 17.7743 20.5689L16.7825 14.8193C16.7404 14.5749 16.8217 14.3255 16.9998 14.153L21.2023 10.0832C21.2902 9.99811 21.2486 9.84201 21.1135 9.82237L15.3046 8.97817C15.061 8.94276 14.8502 8.79001 14.7407 8.56947L12.1432 3.33726C12.1256 3.30194 12.1051 3.28355 12.0856 3.27202C12.0633 3.25889 12.0336 3.25 11.9998 3.25C11.9661 3.25 11.9364 3.25889 11.9141 3.27202ZM10.513 2.67026C11.1221 1.44325 12.8776 1.44325 13.4867 2.67026L15.9094 7.55031L21.3292 8.33797C22.6847 8.53496 23.2372 10.2006 22.2459 11.1607L18.328 14.9548L19.2525 20.3139C19.4871 21.6742 18.0554 22.6907 16.8469 22.0587L11.9998 19.5243L7.15284 22.0587C5.94427 22.6907 4.51258 21.6742 4.74722 20.3139L5.67165 14.9548L1.75384 11.1607C0.762503 10.2006 1.31501 8.53496 2.67051 8.33797L8.09028 7.55031L10.513 2.67026Z" fill="#02040F" fillOpacity="0.15"/>
                                    </svg>
                                ))}
                            </div>
                            <button 
                                onClick={() => {
                                    setSelectedGood(good);
                                    setIsModalOpen(true);
                                }}
                                className='text-n14 reviews-make_card-btn reviews-make_card-btn__mt24'
                            >
                                Оставить отзыв
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <h2 className='profile-reviews_title text-n16'>Ваши отзывы</h2>
            <ul className='profile-reviews_list'>
                {comments.map((comment) => (
                    <li className='profile-reviews_list-card'>
                        <div className='reviews-make_card-img'>
                            {comment.good?.media && comment.good?.media?.length > 0 && (
                                <img src={comment.good?.media[0].source} alt="" />
                            )}
                        </div>
                        <div className='reviews-make_card-content'>
                            <p className='reviews-make_card-name text-h2'>
                                {comment.good?.name}
                            </p>
                            <div className='reviews-make_card-stars'>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    index < comment.rate ? (
                                        <svg key={index} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" fill="#FFA600"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.9141 3.27202C11.8946 3.28355 11.874 3.30194 11.8565 3.33726L9.259 8.56947C9.14951 8.79001 8.93875 8.94276 8.69509 8.97817L2.88624 9.82237C2.75113 9.84201 2.70954 9.99811 2.79736 10.0832L6.99986 14.153C7.17799 14.3255 7.25934 14.5749 7.21719 14.8193L6.22539 20.5689C6.21878 20.6072 6.22453 20.6329 6.23292 20.6523C6.24258 20.6746 6.26049 20.6982 6.28712 20.7174C6.31375 20.7367 6.34285 20.747 6.36922 20.7494C6.39255 20.7516 6.4213 20.7486 6.4578 20.7295L11.6523 18.0134C11.87 17.8995 12.1297 17.8995 12.3474 18.0134L17.5419 20.7295C17.5784 20.7486 17.6072 20.7516 17.6305 20.7494C17.6569 20.747 17.686 20.7367 17.7126 20.7174C17.7392 20.6982 17.7571 20.6746 17.7668 20.6523C17.7752 20.6329 17.7809 20.6072 17.7743 20.5689L16.7825 14.8193C16.7404 14.5749 16.8217 14.3255 16.9998 14.153L21.2023 10.0832C21.2902 9.99811 21.2486 9.84201 21.1135 9.82237L15.3046 8.97817C15.061 8.94276 14.8502 8.79001 14.7407 8.56947L12.1432 3.33726C12.1256 3.30194 12.1051 3.28355 12.0856 3.27202C12.0633 3.25889 12.0336 3.25 11.9998 3.25C11.9661 3.25 11.9364 3.25889 11.9141 3.27202ZM10.513 2.67026C11.1221 1.44325 12.8776 1.44325 13.4867 2.67026L15.9094 7.55031L21.3292 8.33797C22.6847 8.53496 23.2372 10.2006 22.2459 11.1607L18.328 14.9548L19.2525 20.3139C19.4871 21.6742 18.0554 22.6907 16.8469 22.0587L11.9998 19.5243L7.15284 22.0587C5.94427 22.6907 4.51258 21.6742 4.74722 20.3139L5.67165 14.9548L1.75384 11.1607C0.762503 10.2006 1.31501 8.53496 2.67051 8.33797L8.09028 7.55031L10.513 2.67026Z" fill="#FFA600"/>
                                        </svg>      
                                    ) : (
                                        <svg key={index} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" fill="#02040F" fillOpacity="0.15"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.9141 3.27202C11.8946 3.28355 11.874 3.30194 11.8565 3.33726L9.259 8.56947C9.14951 8.79001 8.93875 8.94276 8.69509 8.97817L2.88624 9.82237C2.75113 9.84201 2.70954 9.99811 2.79736 10.0832L6.99986 14.153C7.17799 14.3255 7.25934 14.5749 7.21719 14.8193L6.22539 20.5689C6.21878 20.6072 6.22453 20.6329 6.23292 20.6523C6.24258 20.6746 6.26049 20.6982 6.28712 20.7174C6.31375 20.7367 6.34285 20.747 6.36922 20.7494C6.39255 20.7516 6.4213 20.7486 6.4578 20.7295L11.6523 18.0134C11.87 17.8995 12.1297 17.8995 12.3474 18.0134L17.5419 20.7295C17.5784 20.7486 17.6072 20.7516 17.6305 20.7494C17.6569 20.747 17.686 20.7367 17.7126 20.7174C17.7392 20.6982 17.7571 20.6746 17.7668 20.6523C17.7752 20.6329 17.7809 20.6072 17.7743 20.5689L16.7825 14.8193C16.7404 14.5749 16.8217 14.3255 16.9998 14.153L21.2023 10.0832C21.2902 9.99811 21.2486 9.84201 21.1135 9.82237L15.3046 8.97817C15.061 8.94276 14.8502 8.79001 14.7407 8.56947L12.1432 3.33726C12.1256 3.30194 12.1051 3.28355 12.0856 3.27202C12.0633 3.25889 12.0336 3.25 11.9998 3.25C11.9661 3.25 11.9364 3.25889 11.9141 3.27202ZM10.513 2.67026C11.1221 1.44325 12.8776 1.44325 13.4867 2.67026L15.9094 7.55031L21.3292 8.33797C22.6847 8.53496 23.2372 10.2006 22.2459 11.1607L18.328 14.9548L19.2525 20.3139C19.4871 21.6742 18.0554 22.6907 16.8469 22.0587L11.9998 19.5243L7.15284 22.0587C5.94427 22.6907 4.51258 21.6742 4.74722 20.3139L5.67165 14.9548L1.75384 11.1607C0.762503 10.2006 1.31501 8.53496 2.67051 8.33797L8.09028 7.55031L10.513 2.67026Z" fill="#02040F" fillOpacity="0.15"/>
                                        </svg>
                                    )
                                ))}
                            </div>
                            <div className='text-n14 reviews-make_card-date'>7 мая 2025</div>
                        </div>
                        <div className="reviews-make_card-actions">
                            <div className='text-n14 reviews-make_card-btn'>Редактировать отзыв</div>
                            <button className='reviews-make_card-btn-svg'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.13 8.26146C20.538 8.33319 20.8105 8.72205 20.7388 9.13L18.7438 20.4763C18.7438 20.4763 18.7438 20.4763 18.7438 20.4763C18.5126 21.7912 17.3704 22.7501 16.0354 22.7501H7.96486C6.62979 22.7501 5.4876 21.7912 5.25642 20.4763L3.26146 9.13C3.18973 8.72205 3.46229 8.33318 3.87025 8.26146C4.2782 8.18973 4.66707 8.46229 4.73879 8.87025L6.73375 20.2165C6.83885 20.8143 7.35804 21.2501 7.96486 21.2501H16.0354C16.6422 21.2501 17.1614 20.8143 17.2664 20.2166L17.2665 20.2165L19.2615 8.87025C19.3332 8.46229 19.722 8.18973 20.13 8.26146Z" fill="#02040F"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.625 2.75C9.93464 2.75 9.375 3.30964 9.375 4V5.25H14.625V4C14.625 3.30964 14.0654 2.75 13.375 2.75H10.625ZM7.875 5.25V4C7.875 2.48122 9.10622 1.25 10.625 1.25H13.375C14.8938 1.25 16.125 2.48122 16.125 4V5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H7.875Z" fill="#02040F"/>
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
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
                    <StarRating onRate={(value) => setRating(value)} />
                    <div className="reviews-modal_form-uploader">
                        <FileUploader onFilesChange={setFiles} />
                    </div>
                    
                    <button
                        className='btn-black reviews-modal_form-btn text-btn'
                        onClick={handleSubmitReview}
                    >
                        Оставить отзыв
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ProfileReviews;