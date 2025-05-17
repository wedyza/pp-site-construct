import React from 'react';
import { useAppSelector } from '../store/hooks';
import MainPage from '../pages/mainPage/MainPage';
import SellerMainPage from '../pages/sellerMainPage/SellerMainPage';

const MainRouter: React.FC = () => {
    const { user_type, loaded } = useAppSelector((state) => state.user);

    if (!loaded) {
        return <>Загрузка</>
    }

    if (user_type === 'Продавец') {
        return <SellerMainPage />;
    }

    return <MainPage />;
};

export default MainRouter;
