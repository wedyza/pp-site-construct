import './mainPage.scss'
import AdminNav from '../../components/adminNav/AdminNav';
import { Link } from 'react-router-dom';
import Search from '../../components/search/Search';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchCategories } from '../../store/categoriesSlice';

const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { structured: categories } = useAppSelector((state) => state.categories);
    
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    console.log(categories);

    return (
        <div className='page-content__seller'>
            <AdminNav />
            <div className='admin-cat'>
                <div className='seller-orders_title'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00098 12.75C6.80715 12.75 7.40392 12.7939 7.85254 12.8936C8.29271 12.9913 8.54292 13.1328 8.70508 13.2949C8.86724 13.4571 9.00865 13.7073 9.10645 14.1475C9.20611 14.5961 9.24998 15.1929 9.25 15.999C9.25 16.8053 9.20612 17.4027 9.10645 17.8516C9.00864 18.2919 8.86732 18.5428 8.70508 18.7051C8.54288 18.8673 8.29248 19.0086 7.85254 19.1064C7.40397 19.2062 6.8071 19.25 6.00098 19.25C5.19462 19.25 4.59722 19.2062 4.14844 19.1064C3.70817 19.0086 3.45729 18.8674 3.29492 18.7051C3.13255 18.5427 2.99143 18.2918 2.89355 17.8516C2.79379 17.4028 2.75 16.8054 2.75 15.999C2.75002 15.1929 2.79381 14.596 2.89355 14.1475C2.9914 13.7075 3.13269 13.4571 3.29492 13.2949C3.45724 13.1327 3.7081 12.9914 4.14844 12.8936C4.59726 12.7939 5.19465 12.75 6.00098 12.75ZM15.999 12.75C16.8053 12.75 17.4027 12.7939 17.8516 12.8936C18.2919 12.9914 18.5428 13.1327 18.7051 13.2949C18.8673 13.4571 19.0086 13.7075 19.1064 14.1475C19.2062 14.596 19.25 15.1929 19.25 15.999C19.25 16.8054 19.2062 17.4028 19.1064 17.8516C19.0086 18.2918 18.8674 18.5427 18.7051 18.7051C18.5427 18.8674 18.2918 19.0086 17.8516 19.1064C17.4028 19.2062 16.8054 19.25 15.999 19.25C15.1929 19.25 14.596 19.2062 14.1475 19.1064C13.7075 19.0086 13.4571 18.8673 13.2949 18.7051C13.1327 18.5428 12.9914 18.2919 12.8936 17.8516C12.7939 17.4027 12.75 16.8053 12.75 15.999C12.75 15.1929 12.7939 14.5961 12.8936 14.1475C12.9913 13.7073 13.1328 13.4571 13.2949 13.2949C13.4571 13.1328 13.7073 12.9913 14.1475 12.8936C14.5961 12.7939 15.1929 12.75 15.999 12.75ZM6.00098 2.75C6.8071 2.75002 7.40397 2.79381 7.85254 2.89355C8.29248 2.9914 8.54288 3.13269 8.70508 3.29492C8.86732 3.45724 9.00864 3.7081 9.10645 4.14844C9.20612 4.59726 9.25 5.19465 9.25 6.00098C9.24998 6.80715 9.20611 7.40392 9.10645 7.85254C9.00865 8.29271 8.86724 8.54292 8.70508 8.70508C8.54292 8.86724 8.29271 9.00865 7.85254 9.10645C7.40392 9.20611 6.80715 9.24998 6.00098 9.25C5.19465 9.25 4.59726 9.20612 4.14844 9.10645C3.7081 9.00864 3.45724 8.86732 3.29492 8.70508C3.13269 8.54288 2.9914 8.29248 2.89355 7.85254C2.79381 7.40397 2.75002 6.8071 2.75 6.00098C2.75 5.19462 2.79379 4.59722 2.89355 4.14844C2.99143 3.70817 3.13255 3.45729 3.29492 3.29492C3.45729 3.13255 3.70817 2.99143 4.14844 2.89355C4.59722 2.79379 5.19462 2.75 6.00098 2.75ZM15.999 2.75C16.8054 2.75 17.4028 2.79379 17.8516 2.89355C18.2918 2.99143 18.5427 3.13255 18.7051 3.29492C18.8674 3.45729 19.0086 3.70817 19.1064 4.14844C19.2062 4.59722 19.25 5.19462 19.25 6.00098C19.25 6.8071 19.2062 7.40397 19.1064 7.85254C19.0086 8.29248 18.8673 8.54288 18.7051 8.70508C18.5428 8.86732 18.2919 9.00864 17.8516 9.10645C17.4027 9.20612 16.8053 9.25 15.999 9.25C15.1929 9.24998 14.5961 9.20611 14.1475 9.10645C13.7073 9.00865 13.4571 8.86724 13.2949 8.70508C13.1328 8.54292 12.9913 8.29271 12.8936 7.85254C12.7939 7.40392 12.75 6.80715 12.75 6.00098C12.75 5.19465 12.7939 4.59726 12.8936 4.14844C12.9914 3.7081 13.1327 3.45724 13.2949 3.29492C13.4571 3.13269 13.7075 2.9914 14.1475 2.89355C14.596 2.79381 15.1929 2.75002 15.999 2.75Z" stroke="#02040F" stroke-width="1.5"/>
                    </svg>
                    <h1 className='text-n16'>Категории товаров</h1>
                    <Link to='' className='text-n14 seller-orders_create-btn'>
                        Категория
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                        </svg>
                    </Link>
                </div>
                <div className="seller-orders_search">
                    <Search
                        value={''}
                        onChange={() => {}}
                        onSubmit={() => {}}
                    />
                </div>
                <div className='admin-cat_table admin-table text-n11'>
                    <div className='seller-orders_table-head seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>№</div>
                        <div className='seller-orders_table-cell'>Категория</div>
                        <div className='seller-orders_table-cell'>Подкатегория</div>
                        <div className='seller-orders_table-cell'>Подподкатегория</div>
                        <div className='seller-orders_table-cell'></div>
                    </div>
                     {Object.values(categories).map(({ data: topCat, subcategories }) => (
                        <div key={topCat.id} className="seller-orders_table-row admin-cat_row">
                            <div className="seller-orders_table-cell">{topCat.id}</div>
                            <div className="seller-orders_table-cell">{topCat.title}</div>
                            <div className="seller-orders_table-cell admin-cat_subwrapper" style={{ gridColumn: 'span 3' }}>
                                {Object.values(subcategories).map(({ data: subCat, subcategories: subSubCats }) => (
                                    <div key={subCat.id} className="admin-cat_subrow">
                                        <div className="admin-cat_cell">{subCat.title}</div>
                                        <div className="admin-cat_cell admin-cat_subsub-wrapper">
                                            {subSubCats.map((subSub) => (
                                                <div key={subSub.id} className="admin-cat_subsub">
                                                    {subSub.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {Object.values(subcategories).length < 1 && (
                                    <div className="admin-cat_subrow">
                                        <div className="admin-cat_cell"></div>
                                        <div className="admin-cat_cell"></div>
                                        <div className="admin-cat_cell"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
