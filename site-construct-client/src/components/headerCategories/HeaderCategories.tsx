import React from 'react';
import './headerCategories.scss'

const categories: string[] = ['Одежда и обувь', 'Электроника и гаджеты', 'Дом и сад', 'Красота и здоровье', 'Детские товары', 'Автотовары', 'Товары для животных', 'Аксессуары'];

const HeaderCategories: React.FC = () => {
    return (
        <ul className="header-categories">
            {categories.map((category, index) => (
                <React.Fragment key={index}>
                    <li className="header-categories_item">{category}</li>
                    {index < categories.length - 1 && (
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