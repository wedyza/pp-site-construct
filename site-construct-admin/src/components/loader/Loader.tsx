import React from 'react';
import './loader.scss';
import { useSelector } from 'react-redux';
import { selectIsAnyLoading } from '../../store/store';
import { useAppSelector } from '../../store/hooks';

const Loader = () => {
    const isAnyLoading = useAppSelector(selectIsAnyLoading);

    if (!isAnyLoading) return null;

    return (
        <div className="loader">
            <div className="loader-ring">
                <div className="loader-dot">
                    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.9999 12.3111C22.9999 18.6273 17.8797 23.7475 11.5638 23.7475C5.24785 23.7475 0.127441 18.6271 0.127441 12.3111C0.127441 5.99519 5.24785 0.875 11.5638 0.875C17.8797 0.875 22.9999 5.99498 22.9999 12.3111Z" fill="#FFA600"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Loader;