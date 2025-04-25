import React, { useState } from 'react';
import './profilePage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import ProfileInfo from '../../components/profileInfo/ProfileInfo';
import ProfileMessages from '../../components/profileMessages/ProfileMessages';
import ProfileOrders from '../../components/profileOrders/ProfileOrders';
import ProfilePaymentMethods from '../../components/profilePaymentMethods/ProfilePaymentMethods';
import ProfileReviews from '../../components/profileReviews/ProfileReviews';
import Modal from '../../components/modal/Modal';

const ProfilePage: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<'orders' | 'payment' | 'messages' | 'reviews' | 'profile'>('orders');
  
    const renderSection = () => {
        switch (selectedSection) {
            case 'payment':
                return <ProfilePaymentMethods />;
            case 'messages':
                return <ProfileMessages />;
            case 'reviews':
                return <ProfileReviews />;
            case 'profile':
                return <ProfileInfo />;
            default:
                return <ProfileOrders />;
        }
    };

    const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  
    return (
        <div className={`${selectedSection === 'messages' ? 'page-content__no-pad' : 'page-content'}`}>
            <Header />
            <HeaderCategories />
            <div className='profile-page'>
                <div className='profile-nav'>
                    <div className='profile-nav_header' onClick={() => setSelectedSection('profile')}>
                        <div className='profile-nav_avatar'>

                        </div>
                        <div className='profile-nav_name'>
                            <span>Алена</span>
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L5.93934 7L0.46967 12.4697C0.176777 12.7626 0.176777 13.2374 0.46967 13.5303C0.762563 13.8232 1.23744 13.8232 1.53033 13.5303L7.53033 7.53033C7.82322 7.23744 7.82322 6.76256 7.53033 6.46967L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967Z" fill="black"/>
                            </svg>
                        </div>
                        <button
                            className='profile-nav_notify'
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsNotifyModalOpen(true);
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.21026 3.36156C8.47184 2.01587 10.1937 1.25 12.0001 1.25C13.8065 1.25 15.5283 2.01587 16.7898 3.36156C18.0499 4.70561 18.7501 6.51876 18.7501 8.4C18.7501 12.0306 19.4787 14.3109 20.1678 15.6585C20.5131 16.3338 20.8518 16.7814 21.0921 17.052C21.2124 17.1875 21.3086 17.2792 21.3694 17.3332C21.3998 17.3602 21.4214 17.3779 21.4328 17.3869L21.4415 17.3937C21.7026 17.5837 21.8129 17.9199 21.7145 18.2281C21.6153 18.539 21.3264 18.75 21.0001 18.75H3.00005C2.67373 18.75 2.38485 18.539 2.28559 18.2281C2.18718 17.9199 2.29755 17.5837 2.55863 17.3937L2.56735 17.3869C2.57869 17.3779 2.60028 17.3602 2.63069 17.3332C2.69148 17.2792 2.7877 17.1875 2.90804 17.052C3.14835 16.7814 3.48701 16.3338 3.8323 15.6585C4.52142 14.3109 5.25005 12.0306 5.25005 8.4C5.25005 6.51876 5.95021 4.70561 7.21026 3.36156ZM19.3612 17.25C19.189 16.9905 19.01 16.689 18.8323 16.3415C18.0214 14.7558 17.2501 12.2361 17.2501 8.4C17.2501 6.88647 16.6859 5.44389 15.6955 4.38747C14.7067 3.33269 13.3762 2.75 12.0001 2.75C10.6239 2.75 9.29342 3.33269 8.30457 4.38747C7.31417 5.44389 6.75005 6.88647 6.75005 8.4C6.75005 12.2361 5.97869 14.7558 5.16781 16.3415C4.99009 16.689 4.81108 16.9905 4.63891 17.25H19.3612ZM2.56447 17.3895C2.56446 17.3895 2.56446 17.3895 2.56446 17.3895L2.56393 17.3898L2.56357 17.3901L2.56347 17.3902C2.56362 17.3901 2.56378 17.3899 2.56393 17.3898C2.56411 17.3897 2.56429 17.3896 2.56447 17.3895Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.89381 20.3513C10.2521 20.1434 10.7111 20.2654 10.9189 20.6237C11.0288 20.8131 11.1865 20.9703 11.3763 21.0796C11.566 21.1889 11.7812 21.2465 12.0001 21.2465C12.2191 21.2465 12.4343 21.1889 12.624 21.0796C12.8138 20.9703 12.9715 20.8131 13.0814 20.6237C13.2892 20.2654 13.7482 20.1434 14.1065 20.3513C14.4648 20.5591 14.5867 21.018 14.3789 21.3763C14.1372 21.7931 13.7902 22.139 13.3727 22.3794C12.9552 22.6199 12.4819 22.7465 12.0001 22.7465C11.5184 22.7465 11.0451 22.6199 10.6276 22.3794C10.2101 22.139 9.86313 21.7931 9.62139 21.3763C9.41355 21.018 9.53552 20.5591 9.89381 20.3513Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                    <ul className='profile-nav_list'>
                        <li className='profile-nav_item' onClick={() => setSelectedSection('payment')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.25 9C2.25 7.48122 3.48122 6.25 5 6.25H19C20.5188 6.25 21.75 7.48122 21.75 9V18C21.75 19.5188 20.5188 20.75 19 20.75H5C3.48122 20.75 2.25 19.5188 2.25 18V9ZM5 7.75C4.30964 7.75 3.75 8.30964 3.75 9V18C3.75 18.6904 4.30964 19.25 5 19.25H19C19.6904 19.25 20.25 18.6904 20.25 18V9C20.25 8.30964 19.6904 7.75 19 7.75H5Z" fill="black"/>
                                <path d="M16.5 14C16.2239 14 16 13.7761 16 13.5C16 13.2239 16.2239 13 16.5 13C16.7761 13 17 13.2239 17 13.5C17 13.7761 16.7761 14 16.5 14Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.5 13.75C16.3619 13.75 16.25 13.6381 16.25 13.5C16.25 13.3619 16.3619 13.25 16.5 13.25C16.6381 13.25 16.75 13.3619 16.75 13.5C16.75 13.6381 16.6381 13.75 16.5 13.75ZM17.75 13.5C17.75 12.8096 17.1904 12.25 16.5 12.25C15.8096 12.25 15.25 12.8096 15.25 13.5C15.25 14.1904 15.8096 14.75 16.5 14.75C17.1904 14.75 17.75 14.1904 17.75 13.5Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.25 5.60325C17.25 4.78196 16.4715 4.18384 15.6779 4.39545L4.67792 7.32879C4.13073 7.4747 3.75 7.97027 3.75 8.53658V9.00002H2.25V8.53658C2.25 7.29069 3.08761 6.20045 4.29143 5.87943L15.2914 2.9461C17.0373 2.48055 18.75 3.79641 18.75 5.60325V7.00002H17.25V5.60325Z" fill="black"/>
                            </svg>
                            <span>Способы оплаты</span>
                        </li>
                        <li className='profile-nav_item' onClick={() => setSelectedSection('messages')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M17 12.25C17.1381 12.25 17.25 12.1381 17.25 12C17.25 11.8619 17.1381 11.75 17 11.75C16.8619 11.75 16.75 11.8619 16.75 12C16.75 12.1381 16.8619 12.25 17 12.25ZM15.75 12C15.75 11.3096 16.3096 10.75 17 10.75C17.6904 10.75 18.25 11.3096 18.25 12C18.25 12.6904 17.6904 13.25 17 13.25C16.3096 13.25 15.75 12.6904 15.75 12Z" fill="black"/>
                                <path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 12.25C12.1381 12.25 12.25 12.1381 12.25 12C12.25 11.8619 12.1381 11.75 12 11.75C11.8619 11.75 11.75 11.8619 11.75 12C11.75 12.1381 11.8619 12.25 12 12.25ZM10.75 12C10.75 11.3096 11.3096 10.75 12 10.75C12.6904 10.75 13.25 11.3096 13.25 12C13.25 12.6904 12.6904 13.25 12 13.25C11.3096 13.25 10.75 12.6904 10.75 12Z" fill="black"/>
                                <path d="M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M7 12.25C7.13807 12.25 7.25 12.1381 7.25 12C7.25 11.8619 7.13807 11.75 7 11.75C6.86193 11.75 6.75 11.8619 6.75 12C6.75 12.1381 6.86193 12.25 7 12.25ZM5.75 12C5.75 11.3096 6.30964 10.75 7 10.75C7.69036 10.75 8.25 11.3096 8.25 12C8.25 12.6904 7.69036 13.25 7 13.25C6.30964 13.25 5.75 12.6904 5.75 12Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 13.6861 3.20043 15.2647 3.98703 16.6245C4.07666 16.7794 4.10792 16.9613 4.07515 17.1373L3.43742 20.5626L6.86272 19.9248C7.0387 19.8921 7.2206 19.9233 7.37554 20.013C8.73533 20.7996 10.3139 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C10.1437 22.75 8.39536 22.2789 6.87016 21.4492L2.63728 22.2373C2.39423 22.2826 2.14449 22.2051 1.96967 22.0303C1.79485 21.8555 1.71742 21.6058 1.76267 21.3627L2.55076 17.1298C1.72113 15.6046 1.25 13.8563 1.25 12Z" fill="black"/>
                            </svg>
                            <span>Сообщения</span>
                        </li>
                        <li className='profile-nav_item' onClick={() => setSelectedSection('reviews')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 3.75C4.30964 3.75 3.75 4.30964 3.75 5V19.8619L5.81386 17.2821C6.33573 16.6297 7.12584 16.25 7.96125 16.25H19C19.6904 16.25 20.25 15.6904 20.25 15V5C20.25 4.30964 19.6904 3.75 19 3.75H5ZM2.25 5C2.25 3.48122 3.48122 2.25 5 2.25H19C20.5188 2.25 21.75 3.48122 21.75 5V15C21.75 16.5188 20.5188 17.75 19 17.75H7.96125C7.58152 17.75 7.22238 17.9226 6.98516 18.2191L4.65417 21.1329C3.85698 22.1294 2.25 21.5657 2.25 20.2895V5Z" fill="black"/>
                            </svg>
                            <span>Отзывы</span>
                        </li>
                    </ul>
                </div>
                <div className='profile-content'>
                    {renderSection()}
                </div>
            </div>
            <Modal
                isOpen={isNotifyModalOpen}
                onClose={() => setIsNotifyModalOpen(false)}
                className="profile_notify-modal"
            >
                <h2 className='text-h2'>Уведомления</h2>
                <button className='notify-modal_exit' onClick={() => setIsNotifyModalOpen(false)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.227072 0.22703C0.519965 -0.0658633 0.994839 -0.0658636 1.28773 0.22703L6.00004 4.93934L10.7124 0.22703C11.0052 -0.0658633 11.4801 -0.0658637 11.773 0.22703C12.0659 0.519923 12.0659 0.994797 11.773 1.28769L7.0607 6L11.773 10.7123C12.0659 11.0052 12.0659 11.4801 11.773 11.773C11.4801 12.0659 11.0052 12.0659 10.7124 11.773L6.00004 7.06066L1.28773 11.773C0.994839 12.0659 0.519965 12.0659 0.227072 11.773C-0.0658213 11.4801 -0.0658213 11.0052 0.227072 10.7123L4.93938 6L0.227072 1.28769C-0.0658213 0.994797 -0.0658213 0.519923 0.227072 0.22703Z" fill="#02040F"/>
                    </svg>
                </button>
                <ul className='notify-modal_list'>
                    <li className='notify-modal_list-item'>
                        <div className="notify-item_img"></div>
                        <p className="notify-item_text text-n16">
                            Скидки на категорию <span className="notify-item_text__accent">Электроника для авто</span>. Успевайте купить!
                        </p>
                        <p className="notify-item_date text-n14">
                            2 часа назад
                        </p>
                    </li>
                    <li className='notify-modal_list-item'>
                        <div className="notify-item_img"></div>
                        <p className="notify-item_text text-n16">
                            Скидки на категорию <span className="notify-item_text__accent">Электроника для авто</span>. Успевайте купить!
                        </p>
                        <p className="notify-item_date text-n14">
                            2 часа назад
                        </p>
                    </li>
                    <li className='notify-modal_list-item'>
                        <div className="notify-item_img"></div>
                        <p className="notify-item_text text-n16">
                            Скидки на категорию <span className="notify-item_text__accent">Электроника для авто</span>. Успевайте купить!
                        </p>
                        <p className="notify-item_date text-n14">
                            2 часа назад
                        </p>
                    </li>
                    <li className='notify-modal_list-item'>
                        <div className="notify-item_img"></div>
                        <p className="notify-item_text text-n16">
                            Скидки на категорию <span className="notify-item_text__accent">Электроника для авто</span>. Успевайте купить!
                        </p>
                        <p className="notify-item_date text-n14">
                            2 часа назад
                        </p>
                    </li>
                    <li className='notify-modal_list-item'>
                        <div className="notify-item_img"></div>
                        <p className="notify-item_text text-n16">
                            Скидки на категорию <span className="notify-item_text__accent">Электроника для авто</span>. Успевайте купить!
                        </p>
                        <p className="notify-item_date text-n14">
                            2 часа назад
                        </p>
                    </li>
                    <li className='notify-modal_list-item'>
                        <div className="notify-item_img"></div>
                        <p className="notify-item_text text-n16">
                            Скидки на категорию <span className="notify-item_text__accent">Электроника для авто</span>. Успевайте купить!
                        </p>
                        <p className="notify-item_date text-n14">
                            2 часа назад
                        </p>
                    </li>
                </ul>
            </Modal>
        </div>
    );
};

export default ProfilePage;
