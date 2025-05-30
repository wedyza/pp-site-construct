import './mainPage.scss'
import AdminNav from '../../components/adminNav/AdminNav';
import Search from '../../components/search/Search';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { Category, createCategory, deleteCategory, fetchCategories, updateCategory } from '../../store/categoriesSlice';
import Modal from '../../components/modal/Modal';

const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { structured: categories } = useAppSelector((state) => state.categories);
    
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCat, setSelectedCat] = useState<any | null>(null);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [currentSubEdit, setCurrentSubEdit] = useState<any | null>(null);
    const [tempSubcategories, setTempSubcategories] = useState<any[]>([]);

    useEffect(() => {
        if (selectedCat) {
            const subs = Object.values(categories[selectedCat.title]?.subcategories || {}).map(({ data, subcategories }) => ({
                data,
                subcategories: [...subcategories]
            }));
            setTempSubcategories(subs);
        }
    }, [selectedCat, categories]);

    const handleSelectCategory = (cat: Category) => {
        setSelectedCat({
            ...cat,
            originalTitle: cat.title
        });
    };

    const handleDeleteSubCategory = (id: number) => {
        dispatch(deleteCategory(id));
    };

    const handleUpdateTitle = (id: number, title: string) => {
        if (id && id !==0) {
            dispatch(updateCategory({id, title}));
        } else {
            dispatch(createCategory({title, description: 'test'}))
        }
    };

    const handleSaveTitle = (id: number, title: string) => {
        if (id) {
            dispatch(updateCategory({id, title}));
        } else {
            dispatch(createCategory({title, description: 'test', parent: selectedCat.id}))
        }
    };

    const handleSaveSub = (id: number, title: string) => {
        if (id) {
            dispatch(updateCategory({id, title}));
        } else {
            dispatch(createCategory({title, description: 'test', parent: currentSubEdit.id}))
        }
    };
    
    const openCreateModal = () => {
        handleSelectCategory({ id: 0, title: '', parent: null});
        setIsModalOpen(true);
    };

    const openEditModal = (topCat: Category) => {
        handleSelectCategory(topCat);
        setIsModalOpen(true);
    };

    return (
        <div className='page-content__seller'>
            <AdminNav />
            <div className='admin-cat'>
                <div className='seller-orders_title'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00098 12.75C6.80715 12.75 7.40392 12.7939 7.85254 12.8936C8.29271 12.9913 8.54292 13.1328 8.70508 13.2949C8.86724 13.4571 9.00865 13.7073 9.10645 14.1475C9.20611 14.5961 9.24998 15.1929 9.25 15.999C9.25 16.8053 9.20612 17.4027 9.10645 17.8516C9.00864 18.2919 8.86732 18.5428 8.70508 18.7051C8.54288 18.8673 8.29248 19.0086 7.85254 19.1064C7.40397 19.2062 6.8071 19.25 6.00098 19.25C5.19462 19.25 4.59722 19.2062 4.14844 19.1064C3.70817 19.0086 3.45729 18.8674 3.29492 18.7051C3.13255 18.5427 2.99143 18.2918 2.89355 17.8516C2.79379 17.4028 2.75 16.8054 2.75 15.999C2.75002 15.1929 2.79381 14.596 2.89355 14.1475C2.9914 13.7075 3.13269 13.4571 3.29492 13.2949C3.45724 13.1327 3.7081 12.9914 4.14844 12.8936C4.59726 12.7939 5.19465 12.75 6.00098 12.75ZM15.999 12.75C16.8053 12.75 17.4027 12.7939 17.8516 12.8936C18.2919 12.9914 18.5428 13.1327 18.7051 13.2949C18.8673 13.4571 19.0086 13.7075 19.1064 14.1475C19.2062 14.596 19.25 15.1929 19.25 15.999C19.25 16.8054 19.2062 17.4028 19.1064 17.8516C19.0086 18.2918 18.8674 18.5427 18.7051 18.7051C18.5427 18.8674 18.2918 19.0086 17.8516 19.1064C17.4028 19.2062 16.8054 19.25 15.999 19.25C15.1929 19.25 14.596 19.2062 14.1475 19.1064C13.7075 19.0086 13.4571 18.8673 13.2949 18.7051C13.1327 18.5428 12.9914 18.2919 12.8936 17.8516C12.7939 17.4027 12.75 16.8053 12.75 15.999C12.75 15.1929 12.7939 14.5961 12.8936 14.1475C12.9913 13.7073 13.1328 13.4571 13.2949 13.2949C13.4571 13.1328 13.7073 12.9913 14.1475 12.8936C14.5961 12.7939 15.1929 12.75 15.999 12.75ZM6.00098 2.75C6.8071 2.75002 7.40397 2.79381 7.85254 2.89355C8.29248 2.9914 8.54288 3.13269 8.70508 3.29492C8.86732 3.45724 9.00864 3.7081 9.10645 4.14844C9.20612 4.59726 9.25 5.19465 9.25 6.00098C9.24998 6.80715 9.20611 7.40392 9.10645 7.85254C9.00865 8.29271 8.86724 8.54292 8.70508 8.70508C8.54292 8.86724 8.29271 9.00865 7.85254 9.10645C7.40392 9.20611 6.80715 9.24998 6.00098 9.25C5.19465 9.25 4.59726 9.20612 4.14844 9.10645C3.7081 9.00864 3.45724 8.86732 3.29492 8.70508C3.13269 8.54288 2.9914 8.29248 2.89355 7.85254C2.79381 7.40397 2.75002 6.8071 2.75 6.00098C2.75 5.19462 2.79379 4.59722 2.89355 4.14844C2.99143 3.70817 3.13255 3.45729 3.29492 3.29492C3.45729 3.13255 3.70817 2.99143 4.14844 2.89355C4.59722 2.79379 5.19462 2.75 6.00098 2.75ZM15.999 2.75C16.8054 2.75 17.4028 2.79379 17.8516 2.89355C18.2918 2.99143 18.5427 3.13255 18.7051 3.29492C18.8674 3.45729 19.0086 3.70817 19.1064 4.14844C19.2062 4.59722 19.25 5.19462 19.25 6.00098C19.25 6.8071 19.2062 7.40397 19.1064 7.85254C19.0086 8.29248 18.8673 8.54288 18.7051 8.70508C18.5428 8.86732 18.2919 9.00864 17.8516 9.10645C17.4027 9.20612 16.8053 9.25 15.999 9.25C15.1929 9.24998 14.5961 9.20611 14.1475 9.10645C13.7073 9.00865 13.4571 8.86724 13.2949 8.70508C13.1328 8.54292 12.9913 8.29271 12.8936 7.85254C12.7939 7.40392 12.75 6.80715 12.75 6.00098C12.75 5.19465 12.7939 4.59726 12.8936 4.14844C12.9914 3.7081 13.1327 3.45724 13.2949 3.29492C13.4571 3.13269 13.7075 2.9914 14.1475 2.89355C14.596 2.79381 15.1929 2.75002 15.999 2.75Z" stroke="#02040F" stroke-width="1.5"/>
                    </svg>
                    <h1 className='text-n16'>Категории товаров</h1>
                    <button className='text-n14 seller-orders_create-btn' onClick={openCreateModal}>
                        Категория
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                        </svg>
                    </button>
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
                            <div className="seller-orders_table-cell admin-cat_name">
                                {topCat.title}
                                <button 
                                    onClick={() => openEditModal(topCat)}
                                    className="admin-cat_btn"
                                >
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0552 4.83188C12.7712 4.11592 12.7712 2.95512 12.0552 2.23916L11.1124 1.29635C10.3964 0.58039 9.23563 0.58039 8.51967 1.29635L1.12257 8.69345C0.818163 8.99785 0.630588 9.39967 0.592707 9.82849L0.431317 11.6554C0.367416 12.3788 0.97277 12.9841 1.69612 12.9202L3.52306 12.7588C3.95188 12.721 4.3537 12.5334 4.6581 12.229L12.0552 4.83188ZM11.3481 2.94627C11.6735 3.2717 11.6735 3.79934 11.3481 4.12478L10.715 4.75789L8.59367 2.63656L9.22677 2.00346C9.55221 1.67802 10.0798 1.67802 10.4053 2.00346L11.3481 2.94627ZM7.88656 3.34367L10.0079 5.46499L3.95099 11.5219C3.81263 11.6602 3.62999 11.7455 3.43507 11.7627L1.60812 11.9241C1.50479 11.9332 1.41831 11.8468 1.42744 11.7434L1.58883 9.91648C1.60605 9.72156 1.69131 9.53892 1.82967 9.40056L7.88656 3.34367Z" fill="#FEFEFE"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="seller-orders_table-cell admin-cat_subwrapper" style={{ gridColumn: 'span 3' }}>
                                {Object.values(subcategories).map(({ data: subCat, subcategories: subSubCats }) => (
                                    <div key={subCat.id} className="admin-cat_subrow">
                                        <div className="admin-cat_cell">
                                            {subCat.title}
                                        </div>
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
                                        <div className="admin-cat_cell admin-cat_subsub-wrapper"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="admin-cat_modal"
            >
                <div className="admin-cat_modal-header">
                    <h2 className='text-h2 admin-cat_modal-title'>Изменение категории</h2>
                    <button className="admin-cat_modal-close" onClick={() => setIsModalOpen(false)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.226095 0.22703C0.518988 -0.0658633 0.993862 -0.0658636 1.28676 0.22703L5.99907 4.93934L10.7114 0.22703C11.0043 -0.0658633 11.4791 -0.0658637 11.772 0.22703C12.0649 0.519923 12.0649 0.994797 11.772 1.28769L7.05973 6L11.772 10.7123C12.0649 11.0052 12.0649 11.4801 11.772 11.773C11.4791 12.0659 11.0043 12.0659 10.7114 11.773L5.99907 7.06066L1.28676 11.773C0.993862 12.0659 0.518988 12.0659 0.226095 11.773C-0.0667979 11.4801 -0.0667978 11.0052 0.226095 10.7123L4.93841 6L0.226095 1.28769C-0.0667978 0.994797 -0.0667979 0.519923 0.226095 0.22703Z" fill="#02040F"/>
                        </svg>
                    </button>
                </div>
                <div className="admin-cat_modal-body">
                    <label className="text-n14">Название категории</label>
                    <div className="admin-cat_modal-input-row">
                        <input 
                            className="admin-cat_modal-input text-n16"
                            type="text"
                            value={selectedCat?.title || ''}
                            onChange={(e) => setSelectedCat((prev: any) => prev ? { ...prev, title: e.target.value } : null)}
                        />
                        <button 
                            className='btn-black text-btn admin-cat_save-btn' 
                            onClick={() => handleUpdateTitle(selectedCat.id, selectedCat.title)}
                        >
                            Сохранить
                        </button>
                    </div>
                    <h3 className="text-n14 admin-cat_modal-subtitle">Подкатегории</h3>
                    <ul className="admin-cat_subcategory-list">
                        <button
                            className="admin-cat_modal-btn admin-cat_modal-btn__mt text-n14"
                            onClick={() => {
                                setIsSubModalOpen(true);
                                setIsModalOpen(false);
                                setCurrentSubEdit(null);
                            }}
                        >
                            Добавить подкатегорию
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                            </svg>
                        </button>
                        {selectedCat && Object.values(categories[selectedCat.originalTitle]?.subcategories || {}).map(({ data: subCat }) => (
                                <li key={subCat.id} className="admin-cat_subcategory-item text-n16">
                                    <div className='admin-cat_subcategory-main'>
                                        <span>{subCat.title}</span>
                                        <button 
                                            onClick={() => {
                                                const fullSub = tempSubcategories.find(sub => sub.data.id === subCat.id);
                                                setCurrentSubEdit({ ...fullSub.data, subcategories: fullSub.subcategories || [] });
                                                setIsSubModalOpen(true);
                                                setIsModalOpen(false);
                                            }}
                                        >
                                            Редактировать
                                        </button>
                                    </div>
                                    
                                    <button 
                                        className='admin-cat_subcategory-del'
                                        onClick={() => handleDeleteSubCategory(subCat.id)}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7737 6.88442C17.1137 6.9442 17.3408 7.26825 17.281 7.60821L15.6185 17.0634C15.6185 17.0634 15.6185 17.0635 15.6185 17.0635C15.4259 18.1592 14.4741 18.9583 13.3616 18.9583H6.63609C5.52352 18.9583 4.5717 18.1592 4.37904 17.0635L2.71658 7.60821C2.6568 7.26825 2.88394 6.9442 3.22391 6.88442C3.56387 6.82465 3.88792 7.05179 3.94769 7.39175L5.61016 16.847C5.69774 17.3451 6.1304 17.7083 6.63609 17.7083H13.3616C13.8672 17.7083 14.2999 17.3451 14.3874 16.847L14.3874 16.847L16.0499 7.39175C16.1097 7.05179 16.4337 6.82465 16.7737 6.88442Z" fill="black"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.85417 2.29169C8.27887 2.29169 7.8125 2.75806 7.8125 3.33335V4.37502H12.1875V3.33335C12.1875 2.75805 11.7211 2.29169 11.1458 2.29169H8.85417ZM6.5625 4.37502V3.33335C6.5625 2.0677 7.58851 1.04169 8.85417 1.04169H11.1458C12.4115 1.04169 13.4375 2.06771 13.4375 3.33335V4.37502H17.5C17.8452 4.37502 18.125 4.65484 18.125 5.00002C18.125 5.3452 17.8452 5.62502 17.5 5.62502H2.5C2.15482 5.62502 1.875 5.3452 1.875 5.00002C1.875 4.65484 2.15482 4.37502 2.5 4.37502H6.5625Z" fill="black"/>
                                        </svg>
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Modal>
            <Modal
                isOpen={isSubModalOpen}
                onClose={() => setIsSubModalOpen(false)}
                className="admin-cat_modal"
            >
                <div className="admin-cat_modal-header">
                    <button className="admin-cat_modal-back" onClick={() => {
                        setIsSubModalOpen(false);
                        setIsModalOpen(true);
                    }}>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53033 0.46967C7.82322 0.762563 7.82322 1.23744 7.53033 1.53033L2.06066 7L7.53033 12.4697C7.82322 12.7626 7.82322 13.2374 7.53033 13.5303C7.23744 13.8232 6.76256 13.8232 6.46967 13.5303L0.46967 7.53033C0.176777 7.23744 0.176777 6.76256 0.46967 6.46967L6.46967 0.46967C6.76256 0.176777 7.23744 0.176777 7.53033 0.46967Z" fill="#02040F"/>
                        </svg>
                    </button>
                    <h2 className='text-h2 admin-cat_modal-title'>
                        {currentSubEdit ? 'Редактирование подкатегории' : 'Новая подкатегория'}
                    </h2>
                    <button className="admin-cat_modal-close" onClick={() => setIsSubModalOpen(false)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.226095 0.22703C0.518988 -0.0658633 0.993862 -0.0658636 1.28676 0.22703L5.99907 4.93934L10.7114 0.22703C11.0043 -0.0658633 11.4791 -0.0658637 11.772 0.22703C12.0649 0.519923 12.0649 0.994797 11.772 1.28769L7.05973 6L11.772 10.7123C12.0649 11.0052 12.0649 11.4801 11.772 11.773C11.4791 12.0659 11.0043 12.0659 10.7114 11.773L5.99907 7.06066L1.28676 11.773C0.993862 12.0659 0.518988 12.0659 0.226095 11.773C-0.0667979 11.4801 -0.0667978 11.0052 0.226095 10.7123L4.93841 6L0.226095 1.28769C-0.0667978 0.994797 -0.0667979 0.519923 0.226095 0.22703Z" fill="#02040F"/>
                        </svg>
                    </button>
                </div>
                <div className="admin-cat_modal-body">
                    <div className="admin-cat_sub-block">
                        <label className="text-n14">Подкатегория</label>
                        <div className="admin-cat_modal-input-row">
                            <input
                                className="admin-cat_modal-input text-n16"
                                type="text"
                                value={currentSubEdit?.title || ''}
                                onChange={(e) =>
                                    setCurrentSubEdit((prev: any) =>
                                        prev ? { ...prev, title: e.target.value } : { title: e.target.value, subcategories: [] }
                                    )
                                }
                            />
                            <button 
                                className='btn-black text-btn admin-cat_save-btn'
                                onClick={() => handleSaveTitle(currentSubEdit.id, currentSubEdit.title)}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                    <h3 className="text-n14 admin-cat_modal-subtitle">Подподкатегории</h3>
                    <button
                        className="admin-cat_modal-btn admin-cat_modal-btn__mt text-n14"
                        onClick={() =>
                            setCurrentSubEdit((prev: any) => ({
                                ...prev,
                                subcategories: [...(prev?.subcategories || []), { title: '' }]
                            }))
                        }
                    >
                        Добавить подподкатегорию
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                        </svg>
                    </button>
                    {currentSubEdit?.subcategories?.length > 0 && (
                        <>
                            <ul className="admin-cat_subcategory-list">
                                {(currentSubEdit.subcategories).map((subSub: any, index: number) => (
                                    <div key={subSub.id || index} className="admin-cat_subcategory-item">
                                        <input
                                            className='admin-cat_subcategory-main text-n16'
                                            type="text"
                                            value={subSub.title}
                                            onChange={(e) =>
                                                setCurrentSubEdit((prev: any) => {
                                                    const updated = [...(prev.subcategories || [])];
                                                    updated[index] = { ...updated[index], title: e.target.value };
                                                    return { ...prev, subcategories: updated };
                                                })
                                            }
                                        />
                                        <button 
                                            className='admin-cat_modal-btn admin-subcat_modal-btn text-n14'
                                            onClick={() => handleSaveSub(subSub.id, subSub.title)}
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSubCategory(subSub.id)}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7737 6.88442C17.1137 6.9442 17.3408 7.26825 17.281 7.60821L15.6185 17.0634C15.6185 17.0634 15.6185 17.0635 15.6185 17.0635C15.4259 18.1592 14.4741 18.9583 13.3616 18.9583H6.63609C5.52352 18.9583 4.5717 18.1592 4.37904 17.0635L2.71658 7.60821C2.6568 7.26825 2.88394 6.9442 3.22391 6.88442C3.56387 6.82465 3.88792 7.05179 3.94769 7.39175L5.61016 16.847C5.69774 17.3451 6.1304 17.7083 6.63609 17.7083H13.3616C13.8672 17.7083 14.2999 17.3451 14.3874 16.847L14.3874 16.847L16.0499 7.39175C16.1097 7.05179 16.4337 6.82465 16.7737 6.88442Z" fill="black"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.85417 2.29169C8.27887 2.29169 7.8125 2.75806 7.8125 3.33335V4.37502H12.1875V3.33335C12.1875 2.75805 11.7211 2.29169 11.1458 2.29169H8.85417ZM6.5625 4.37502V3.33335C6.5625 2.0677 7.58851 1.04169 8.85417 1.04169H11.1458C12.4115 1.04169 13.4375 2.06771 13.4375 3.33335V4.37502H17.5C17.8452 4.37502 18.125 4.65484 18.125 5.00002C18.125 5.3452 17.8452 5.62502 17.5 5.62502H2.5C2.15482 5.62502 1.875 5.3452 1.875 5.00002C1.875 4.65484 2.15482 4.37502 2.5 4.37502H6.5625Z" fill="black"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default MainPage;
