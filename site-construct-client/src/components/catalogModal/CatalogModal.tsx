import React, { useEffect, useState } from 'react';
import './catalogModal.scss';
import book from '../../img/book.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategories } from '../../store/categoriesSlice';

const CatalogModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { structured: categories, loading } = useAppSelector((state) => state.categories);

    console.log(categories);

    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchCategories());
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, dispatch]);

    useEffect(() => {
        if (!selectedCategory && Object.keys(categories).length > 0) {
            setSelectedCategory(Object.keys(categories)[0]);
        }
    }, [categories]);

    if (!isOpen) return null;
    const subcategories = categories[selectedCategory]?.subcategories || {};

    return (
        <div className="catalog-modal">
            <ul className='catalog-cat_list text-n16'>
                {Object.keys(categories).map((cat) => (
                    <li
                        key={cat}
                        className={`catalog-cat_item ${cat === selectedCategory ? 'catalog-cat_item__active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        <img src={book} alt="" className='catalog-cat_img' />
                        <span className='catalog-cat_name'>{cat}</span>
                    </li>
                ))}
            </ul>
            <div className="catalog-subcat_panel-container">
                <div className="catalog-subcat_panel">
                    {Object.entries(subcategories).map(([subcatKey, subcatValue]) => (
                        <div className="catalog-subcat_block" key={subcatKey}>
                            <Link
                                to={`/category/${subcatValue.data.id}`}
                                className="catalog-subcat_title text-h2 hover2"
                            >
                                {subcatValue.data.title}
                            </Link>
                            <div className="catalog-subcat_list">
                                {subcatValue.subcategories.map((item) => (
                                    <Link
                                        to={`/category/${item.id}`}
                                        className="catalog-subcat_item text-n16 hover2"
                                        key={item.id}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CatalogModal;
