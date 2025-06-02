import React from 'react';
import { useAppSelector } from '../store/hooks';
import MainPage from '../pages/mainPage/MainPage';
import SellerMainPage from '../pages/sellerMainPage/SellerMainPage';
import Loader from './loader/Loader';

const MainRouter: React.FC = () => {
    const { user_type, loaded, loading } = useAppSelector((state) => state.user);
    
    if (!loaded && loading) {
        return <></>
    }

    if (user_type === 'Продавец') {
        return <SellerMainPage />;
    }

    return <MainPage />;
};

export default MainRouter;
