import './charPage.scss'
import AdminNav from '../../components/adminNav/AdminNav';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../store/categoriesSlice';
import { CharacteristicGroup, deleteCharacteristic, fetchCharacteristics, upsertCharacteristic, upsertCharacteristicGroup } from '../../store/characteristicsSlice';
import Modal from '../../components/modal/Modal';

interface SelectedCategory {
    id: number;
    title: string;
}

const CharPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.characteristics);
    const { structured: categories } = useAppSelector((state) => state.categories);

    const [selectedTop, setSelectedTop] = useState<SelectedCategory | null>(null);
    const [selectedSub, setSelectedSub] = useState<SelectedCategory | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<SelectedCategory | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<'top' | 'sub' | 'group' | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChar, setSelectedChar] = useState<CharacteristicGroup | null>(null);
    
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (selectedTop){
            console.log(selectedGroup?.id || selectedSub?.id || selectedTop?.id);
            const catGroup = selectedGroup?.id || selectedSub?.id || selectedTop?.id;
            dispatch(fetchCharacteristics(catGroup));
        }
    }, [selectedTop, selectedSub, selectedGroup, dispatch]);

    
    const handleSaveCharGroup = (id: number | undefined, title: string) => {
        const categoryId = selectedGroup?.id || selectedSub?.id || selectedTop?.id;
        if (!categoryId) return;

        dispatch(
            upsertCharacteristicGroup({
                id: id && id !== 0 ? id : undefined,
                title,
                category: categoryId,
            })
        )
    };
    const handleSaveSub = (id: number, title: string) => {
        if (selectedChar) 
            dispatch(upsertCharacteristic({id, title, category: selectedChar?.id}));
    };
    
    const handleDeleteCharacteristic = (id: number) => {
        if (selectedTop)
            dispatch(deleteCharacteristic({id, categoryId: selectedGroup?.id || selectedSub?.id || selectedTop?.id}));
    };

    const openCreateModal = () => {
        setSelectedChar({ id: 0, title: '', characteristics: [] });
        setIsModalOpen(true);
    };

    const openEditModal = (charGroup: CharacteristicGroup) => {
        setSelectedChar(charGroup);
        setIsModalOpen(true);
    };

    return (
        <div className='page-content__seller'>
            <AdminNav />
            <div className='admin-cat admin-char'>
                <div className='seller-orders_title'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.35547 2.52075V19.4791H10.0846C10.4643 19.4791 10.7721 19.7869 10.7721 20.1666C10.7721 20.5463 10.4643 20.8541 10.0846 20.8541H4.21797C3.53452 20.8541 2.98047 20.3 2.98047 19.6166V2.38325C2.98047 1.6998 3.53452 1.14575 4.21797 1.14575H14.8985C15.2267 1.14575 15.5415 1.27613 15.7735 1.50821L18.6597 4.39436C18.8918 4.62643 19.0221 4.9412 19.0221 5.2694V10.9999C19.0221 11.3796 18.7143 11.6874 18.3346 11.6874C17.9549 11.6874 17.6471 11.3796 17.6471 10.9999V5.32636L14.8415 2.52075H4.35547Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.64453 5.5C6.64453 5.1203 6.95234 4.8125 7.33203 4.8125H10.9987C11.3784 4.8125 11.6862 5.1203 11.6862 5.5C11.6862 5.8797 11.3784 6.1875 10.9987 6.1875H7.33203C6.95234 6.1875 6.64453 5.8797 6.64453 5.5ZM6.64453 9.16667C6.64453 8.78697 6.95234 8.47917 7.33203 8.47917H14.6654C15.0451 8.47917 15.3529 8.78697 15.3529 9.16667C15.3529 9.54636 15.0451 9.85417 14.6654 9.85417H7.33203C6.95234 9.85417 6.64453 9.54636 6.64453 9.16667ZM6.64453 12.8333C6.64453 12.4536 6.95234 12.1458 7.33203 12.1458H10.082C10.4617 12.1458 10.7695 12.4536 10.7695 12.8333C10.7695 13.213 10.4617 13.5208 10.082 13.5208H7.33203C6.95234 13.5208 6.64453 13.213 6.64453 12.8333Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.3144 16.5508C19.9843 15.881 19.9843 14.7948 19.3144 14.1249C18.6445 13.455 17.5584 13.455 16.8885 14.1249L13.23 17.7834C12.9895 18.0239 12.8317 18.3346 12.7793 18.6706L12.5568 20.0973C12.523 20.3141 12.5948 20.5341 12.75 20.6893C12.9052 20.8445 13.1252 20.9163 13.342 20.8825L14.7686 20.6601C15.1047 20.6077 15.4154 20.4499 15.6559 20.2094L19.3144 16.5508ZM18.3421 15.0972C18.475 15.2301 18.475 15.4456 18.3421 15.5786L17.9116 16.0091L17.4302 15.5277L17.8608 15.0972C17.9937 14.9643 18.2092 14.9643 18.3421 15.0972ZM16.4579 16.5L16.9393 16.9814L14.6836 19.2371C14.6492 19.2715 14.6048 19.294 14.5568 19.3015L14.0605 19.3789L14.1379 18.8824C14.1454 18.8344 14.1679 18.79 14.2023 18.7557L16.4579 16.5Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.668 1.14575C15.0477 1.14575 15.3555 1.45356 15.3555 1.83325V4.81242H18.3346C18.7143 4.81242 19.0221 5.12022 19.0221 5.49992C19.0221 5.87961 18.7143 6.18742 18.3346 6.18742H15.218C14.5345 6.18742 13.9805 5.63337 13.9805 4.94992V1.83325C13.9805 1.45356 14.2883 1.14575 14.668 1.14575Z" fill="black"/>
                    </svg>
                    <h1 className='text-n16'>Характеристики</h1>
                    <button 
                        className='text-n14 seller-orders_create-btn'
                        onClick={openCreateModal}
                    >
                        Таблица характеристик
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                        </svg>
                    </button>
                </div>
                <div className="seller-good_info-cat">
                    <div className="seller-good_info-group">
                        <span className='seller-good_info-label text-n14'>Категория</span>
                        <div
                            className='seller-good_cat text-n16'
                            onClick={() => setDropdownOpen(dropdownOpen === 'top' ? null : 'top')}
                        >
                            <span>{selectedTop?.title || 'Выберите категорию'}</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="#02040F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967Z" fill="#02040F"/>
                            </svg>
                        </div>
                        {dropdownOpen === 'top' && (
                            <div className='dropdown-list seller-good_cat-list text-n14'>
                                {Object.entries(categories).map(([title, categoryData]) => (
                                    <div
                                        key={categoryData.data.id}
                                        className='dropdown-item'
                                        onClick={() => {
                                            setSelectedTop({
                                                id: categoryData.data.id,
                                                title: categoryData.data.title
                                            });
                                            setSelectedSub(null);
                                            setSelectedGroup(null);
                                            setDropdownOpen(null);
                                        }}
                                    >
                                        {title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedTop && (
                        <div className="seller-good_info-group">
                            <span className='seller-good_info-label text-n14'>Подкатегория</span>
                            <div
                                className='seller-good_cat text-n16'
                                onClick={() => setDropdownOpen(dropdownOpen === 'sub' ? null : 'sub')}
                            >
                                <span>{selectedSub?.title || 'Выберите подкатегорию'}</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="#02040F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967Z" fill="#02040F"/>
                                </svg>
                            </div>
                            {dropdownOpen === 'sub' && selectedTop && (
                                <div className='dropdown-list seller-good_cat-list text-n14'>
                                    {Object.entries(categories[selectedTop.title].subcategories).map(([title, subCategoryData]) => (
                                        <div
                                            key={subCategoryData.data.id}
                                            className='dropdown-item'
                                            onClick={() => {
                                                setSelectedSub({
                                                    id: subCategoryData.data.id,
                                                    title: subCategoryData.data.title
                                                });
                                                setSelectedGroup(null);
                                                setDropdownOpen(null);
                                            }}
                                        >
                                            {title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {selectedTop && selectedSub && (
                        <div className="seller-good_info-group">
                            <span className='seller-good_info-label text-n14'>Группа товаров</span>
                            <div
                                className='seller-good_cat text-n16'
                                onClick={() => setDropdownOpen(dropdownOpen === 'group' ? null : 'group')}
                            >
                                <span>{selectedGroup?.title || 'Выберите группу'}</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="#02040F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.46967 8.46967C5.76256 8.17678 6.23744 8.17678 6.53033 8.46967L12 13.9393L17.4697 8.46967C17.7626 8.17678 18.2374 8.17678 18.5303 8.46967C18.8232 8.76256 18.8232 9.23744 18.5303 9.53033L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46967 9.53033C5.17678 9.23744 5.17678 8.76256 5.46967 8.46967Z" fill="#02040F"/>
                                </svg>
                            </div>
                            {dropdownOpen === 'group' && selectedTop && selectedSub && (
                                <div className='dropdown-list seller-good_cat-list text-n14'>
                                    {categories[selectedTop.title].subcategories[selectedSub.title].subcategories.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className='dropdown-item'
                                            onClick={() => {
                                                setSelectedGroup({
                                                    id: cat.id,
                                                    title: cat.title
                                                });
                                                setDropdownOpen(null);
                                            }}
                                        >
                                            {cat.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='admin-char_table admin-table text-n11'>
                    <div className='seller-orders_table-head seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>Название таблицы характеристик</div>
                        <div className='seller-orders_table-cell'>Характеристики</div>
                    </div>
                    {data?.map((char) => (
                        <div key={char.id} className='seller-orders_table-body seller-orders_table-row'>
                            <div className='seller-orders_table-cell admin-cat_name'>
                                {char.title}
                                <button 
                                    onClick={() => openEditModal(char)}
                                    className="admin-cat_btn"
                                >
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0552 4.83188C12.7712 4.11592 12.7712 2.95512 12.0552 2.23916L11.1124 1.29635C10.3964 0.58039 9.23563 0.58039 8.51967 1.29635L1.12257 8.69345C0.818163 8.99785 0.630588 9.39967 0.592707 9.82849L0.431317 11.6554C0.367416 12.3788 0.97277 12.9841 1.69612 12.9202L3.52306 12.7588C3.95188 12.721 4.3537 12.5334 4.6581 12.229L12.0552 4.83188ZM11.3481 2.94627C11.6735 3.2717 11.6735 3.79934 11.3481 4.12478L10.715 4.75789L8.59367 2.63656L9.22677 2.00346C9.55221 1.67802 10.0798 1.67802 10.4053 2.00346L11.3481 2.94627ZM7.88656 3.34367L10.0079 5.46499L3.95099 11.5219C3.81263 11.6602 3.62999 11.7455 3.43507 11.7627L1.60812 11.9241C1.50479 11.9332 1.41831 11.8468 1.42744 11.7434L1.58883 9.91648C1.60605 9.72156 1.69131 9.53892 1.82967 9.40056L7.88656 3.34367Z" fill="#FEFEFE"/>
                                    </svg>
                                </button>
                            </div>
                            <div className='seller-orders_table-cell admin-table_char'>
                                {char.characteristics.map((subChar) => (
                                    <div>{subChar.title}</div>
                                ))}
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
                    <h2 className='text-h2 admin-cat_modal-title'>Изменение характеристики</h2>
                    <button className="admin-cat_modal-close" onClick={() => setIsModalOpen(false)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.226095 0.22703C0.518988 -0.0658633 0.993862 -0.0658636 1.28676 0.22703L5.99907 4.93934L10.7114 0.22703C11.0043 -0.0658633 11.4791 -0.0658637 11.772 0.22703C12.0649 0.519923 12.0649 0.994797 11.772 1.28769L7.05973 6L11.772 10.7123C12.0649 11.0052 12.0649 11.4801 11.772 11.773C11.4791 12.0659 11.0043 12.0659 10.7114 11.773L5.99907 7.06066L1.28676 11.773C0.993862 12.0659 0.518988 12.0659 0.226095 11.773C-0.0667979 11.4801 -0.0667978 11.0052 0.226095 10.7123L4.93841 6L0.226095 1.28769C-0.0667978 0.994797 -0.0667979 0.519923 0.226095 0.22703Z" fill="#02040F"/>
                        </svg>
                    </button>
                </div>
                <div className="admin-cat_modal-body">
                    <label className="text-n14">Название таблицы</label>
                    <div className="admin-cat_modal-input-row">
                        <input 
                            className="admin-cat_modal-input text-n16"
                            type="text"
                            value={selectedChar?.title || ''}
                            onChange={(e) =>
                                setSelectedChar((prev) =>
                                    prev ? { ...prev, title: e.target.value } : { id: 0, title: e.target.value, characteristics: [] }
                                )
                            }
                        />
                        <button 
                            className='btn-black text-btn admin-cat_save-btn' 
                            onClick={() => {
                                if (selectedChar)
                                    handleSaveCharGroup(
                                        selectedChar.id !== 0 ? selectedChar.id : undefined,
                                        selectedChar.title
                                    );
                            }}
                        >
                            Сохранить
                        </button>
                    </div>
                    <h3 className="text-n14 admin-cat_modal-subtitle">Характеристики</h3>
                    <ul className="admin-cat_subcategory-list">
                        <button
                            className="admin-cat_modal-btn admin-cat_modal-btn__mt text-n14"
                            onClick={() =>
                                setSelectedChar((prev: any) => ({
                                    ...prev,
                                    characteristics: [...(prev?.characteristics || []), { title: '' }]
                                }))
                            }
                        >
                            Добавить подподкатегорию
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                            </svg>
                        </button>
                        {selectedChar && selectedChar?.characteristics?.length > 0 && (
                            <>
                                <ul className="admin-cat_subcategory-list">
                                    {(selectedChar?.characteristics).map((subSub: any, index: number) => (
                                        <div key={subSub.id || index} className="admin-cat_subcategory-item">
                                            <input
                                                className='admin-cat_subcategory-main text-n16'
                                                type="text"
                                                value={subSub.title}
                                                onChange={(e) =>
                                                    setSelectedChar((prev: any) => {
                                                        const updated = [...(prev.characteristics || [])];
                                                        updated[index] = { ...updated[index], title: e.target.value };
                                                        return { ...prev, characteristics: updated };
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
                                                onClick={() => {
                                                    handleDeleteCharacteristic(subSub.id);
                                                    if (selectedChar) {
                                                        const updatedCharacteristics = selectedChar.characteristics.filter(c => c.id !== subSub.id);
                                                        setSelectedChar({
                                                            ...selectedChar,
                                                            characteristics: updatedCharacteristics
                                                        });
                                                    }
                                                }}
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
                    </ul>
                </div>
            </Modal>
        </div>
    );
};

export default CharPage;