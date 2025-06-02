import React, { useEffect, useRef, useState } from 'react';
import './categoryPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import DropdownSubcategory from '../../components/dropdownSubcategory/DropdownSubcategory';
import GoodsCard from '../../components/goodCard/GoodCard';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Category, fetchCategories, fetchCategoryById, fetchGoodsByCategory, getCategoryPath } from '../../store/categoriesSlice';

const CategoryPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [priceGt, setPriceGt] = useState('');
    const [priceLt, setPriceLt] = useState('');
    const lastRequestParams = useRef<{ search?: string; price__gt?: number; price__lt?: number }>({});

    const { selected } = useAppSelector((state) => state.categories);

    useEffect(() => {
        if (id) {
            dispatch(fetchCategoryById(Number(id)));
        }
    }, [id, dispatch]);
    
    const sendSearchRequest = () => {
        const filters: { categoryId: number, price__gt?: number; price__lt?: number } = {categoryId: Number(id)};
        if (priceGt.trim() !== '') filters.price__gt = Number(priceGt);
        if (priceLt.trim() !== '') filters.price__lt = Number(priceLt);
        const hasChanged = JSON.stringify(filters) !== JSON.stringify(lastRequestParams.current);
        if (!hasChanged) return;
        lastRequestParams.current = filters;
        dispatch(fetchGoodsByCategory(filters));
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendSearchRequest();
        }
    };

    const handleBlur = () => {
        sendSearchRequest();
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);const allCategories = useAppSelector((state) => state.categories.raw);

    const getTopLevelCategory = (category: Category | null, all: Category[]): Category | null => {
        if (!category) return null;
        const map = new Map<number, Category>();
        all.forEach(c => map.set(c.id, c));
        let current = category;
        while (current.parent !== null) {
            const parent = map.get(current.parent);
            if (!parent) break;
            current = parent;
        }
        return current;
    };

    const topLevelCategory = getTopLevelCategory(selected, allCategories);
    const secondLevelCategories = allCategories.filter(cat => cat.parent === topLevelCategory?.id);

    const thirdLevelCategoriesMap = new Map<number, Category[]>();
    secondLevelCategories.forEach(sec => {
        const children = allCategories.filter(c => c.parent === sec.id);
        if (children.length > 0) {
            thirdLevelCategoriesMap.set(sec.id, children);
        }
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                openIndex !== null &&
                containerRefs.current[openIndex] &&
                !containerRefs.current[openIndex]?.contains(event.target as Node)
            ) {
                setOpenIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openIndex]);
    
    const categoryPath = getCategoryPath(selected, useAppSelector((state) => state.categories.raw));
    const goodsData = useAppSelector((state) => state.categories.categoryGoods[Number(id)]);
    
    useEffect(() => {
        dispatch(fetchGoodsByCategory({categoryId: Number(id)}));
    }, [dispatch, id]);

    useEffect(() => {
        if (!selected) return;
        document.title = `${selected.title} – Каталог | Kaufen`;
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            `Купить товары из категории "${selected.title}" в интернет-магазине Kaufen. Выгодные цены и быстрая доставка.`
        );
        return () => {
            document.title = 'Kaufen';
            if (metaDescription) {
                metaDescription.setAttribute('content', 'Kaufen – интернет-магазин качественных товаров.');
            }
        };
    }, [selected]);

    return (
        <div className='page-content__no-pad'>
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <div className="category-page_header">
                    <h1 className="category-header_title text-h1 hover1">{categoryPath.join(' / ')}</h1>
                    <div className="category-header_subcats text-n14">
                        {secondLevelCategories.map((subcat) => (
                            <DropdownSubcategory
                                key={subcat.id}
                                id={subcat.id}
                                title={subcat.title}
                                items={(thirdLevelCategoriesMap.get(subcat.id) || []).map(child => ({
                                    id: child.id,
                                    title: child.title,
                                }))}
                            />
                        ))}
                    </div>
                </div>
                <div className="main-content category-page_content">
                    <div className="category-page_filters">
                        {/* <div className='category-page_filter'>
                            <p className='text-h3'>
                                Сроки доставки
                            </p>
                            <ul className='category-page_filter-list'>
                                <li className='category-page_filter-item'>
                                    <label htmlFor=""></label>
                                    <input type="text" />
                                </li>
                            </ul>
                        </div> */}
                        <div className='category-page_filter'>
                            <p className='text-h3'>
                                Цена
                            </p>
                            <div className='category-page_filter-price'>
                                <input
                                    className='category-page_price-input text-n14'
                                    type="text"
                                    placeholder='от 100'
                                    value={priceGt}
                                    onChange={(e) => setPriceGt(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                />
                                <input
                                    className='category-page_price-input text-n14'
                                    type="text"
                                    placeholder='до 1000'
                                    value={priceLt}
                                    onChange={(e) => setPriceLt(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="category-page_products">
                        <ul className='main_goods-list category-page_products-list'>
                            {goodsData && goodsData.items.map((good, index) => (
                                <li key={index} className="main_good">
                                    <Link to={`/product/${good.id}`}>
                                        <GoodsCard good={good} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
