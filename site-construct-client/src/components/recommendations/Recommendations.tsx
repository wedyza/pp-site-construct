import React, { useEffect } from 'react';
import './recommendations.scss'
import GoodsCard from '../goodCard/GoodCard';
import { fetchGoods, Good } from '../../store/goodsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Recommendations: React.FC = () => {
    const dispatch = useAppDispatch();
    const goods = useAppSelector((state) => state.goods.items);

    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);

    return (
        <div className='order-page_rec'>
            <h2 className='order-page_rec-title text-h2'>Рекомендуем для вас</h2>
            <ul className='main_goods-list'>
                {goods.map((good, index) => (
                    <li key={index} className="main_good"><GoodsCard good={good} /></li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;