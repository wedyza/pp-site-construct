import React, { useEffect, useState } from 'react';
import './profilePage.scss'
import ProfileInfo from '../../components/profileInfo/ProfileInfo';
import AdminNav from '../../components/adminNav/AdminNav';

const ProfilePage: React.FC = () => {
    return (
        <div className='page-content__seller'>
            <AdminNav />
            <div className='admin-cat admin-profile'>
                <div className='text-h3 seller-orders_title'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#02040F" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.3513 8.66291L15.4366 6.45408L16.666 5.00008L14.9993 3.33341L13.5533 4.56921L11.2975 3.64153L10.7788 1.66675H9.15017L8.62358 3.66769L6.41969 4.59672L4.99935 3.33341L3.33268 5.00008L4.54382 6.49079L3.6431 8.70536L1.66602 9.16675V10.8334L3.66694 11.3797L4.59581 13.5832L3.33268 15.0001L4.99935 16.6667L6.49198 15.4503L8.66353 16.3437L9.16602 18.3334H10.8327L11.3365 16.3444L13.5453 15.4297C13.9134 15.6928 14.9993 16.6667 14.9993 16.6667L16.666 15.0001L15.4293 13.5413L16.3442 11.3318L18.3326 10.8144L18.3327 9.16675L16.3513 8.66291Z" stroke="#02040F" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h1>Настройки пользователя</h1>
                </div>
                <div className='seller-profile'>
                    <ProfileInfo />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
