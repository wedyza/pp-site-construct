import React, { useEffect } from 'react';
import './headerCategories.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategories } from '../../store/categoriesSlice';
import { Link } from 'react-router-dom';

const HeaderCategories: React.FC = () => {
    const dispatch = useAppDispatch();
    const structuredCategories = useAppSelector((state) => state.categories.structured);
    
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const topLevelCategories = React.useMemo(() => {
        if (!structuredCategories) return [];
        return Object.values(structuredCategories)
            .map(item => item.data)
            .slice(0, 8);
    }, [structuredCategories]);

    return (
        <ul className="header-categories">
            {topLevelCategories.map((category, index) => (
                <React.Fragment key={index}>
                    <Link to={`/category/${category.id}`} className="header-categories_item text-n16 hover1">{category.title}</Link>
                    {index < topLevelCategories.length - 1 && (
                        <li className="header-categories_dot">
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="6" cy="6.5" r="6" fill="#D9D9D9"/>
                            </svg>
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default HeaderCategories;