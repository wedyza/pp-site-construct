import React, { useEffect, useState } from 'react';
import './addCharacteristicModal.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Characteristic, CharacteristicGroup, fetchCharacteristics } from '../../store/characteristicsSlice';
import Modal from '../modal/Modal';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CharacteristicGroup) => void;
    usedGroupIds: number[];
    catGroup?: number;
};

const AddCharacteristicModal: React.FC<Props> = ({ isOpen, onClose, onSave, usedGroupIds, catGroup }) => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.characteristics);

    const [selectedGroup, setSelectedGroup] = useState<CharacteristicGroup | null>(null);
    const [selectedCharId, setSelectedCharId] = useState<number | ''>(''); 
    const [selectedChars, setSelectedChars] = useState<{ characteristic: Characteristic; value: string }[]>([]);

    const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
    const [isCharDropdownOpen, setIsCharDropdownOpen] = useState(false);

    useEffect(() => {
        if (isOpen && catGroup) {
            dispatch(fetchCharacteristics(catGroup));
        }
    }, [isOpen, dispatch]);

    const handleAddCharacteristic = () => {
        if (!selectedGroup || selectedCharId === '') return;

        const char = selectedGroup.characteristics.find((c) => c.id === selectedCharId);
        if (!char) return;

        if (selectedChars.find((c) => c.characteristic.id === char.id)) return;

        setSelectedChars((prev) => [...prev, { characteristic: char, value: '' }]);
        setSelectedCharId(''); 
    };

    const handleChangeValue = (id: number, value: string) => {
        setSelectedChars((prev) =>
            prev.map((c) =>
                c.characteristic.id === id ? { ...c, value } : c
            )
        );
    };

    const handleSave = () => {
        if (!selectedGroup) return;

        const result: CharacteristicGroup = {
            id: selectedGroup.id,
            title: selectedGroup.title,
            characteristics: selectedChars.map((c) => ({
                id: c.characteristic.id,
                title: c.characteristic.title + '',
                value: c.value,
            })),
        };

        onSave(result);
        onClose();
        setSelectedGroup(null);
        setSelectedCharId('');
        setSelectedChars([]);
    };

    const handleGroupSelect = (group: CharacteristicGroup) => {
        setSelectedGroup(group);
        setSelectedCharId('');
        setSelectedChars([]);
        setIsGroupDropdownOpen(false);
    };

    const handleCharSelect = (charId: number) => {
        setSelectedCharId(charId);
        setIsCharDropdownOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="modal-char">
            {catGroup ? (
                <>
                    <div className="modal-char_header">
                        <h2 className='text-h2'>Добавить характеристику</h2>
                        <button className='modal-char_btn modal-char_save' onClick={handleSave} disabled={!selectedGroup || selectedChars.length === 0}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.46783 11.9697C6.76072 11.6768 7.2356 11.6768 7.52849 11.9697L9.99816 14.4393L16.4678 7.96967C16.7607 7.67678 17.2356 7.67678 17.5285 7.96967C17.8214 8.26256 17.8214 8.73744 17.5285 9.03033L10.5285 16.0303C10.2356 16.3232 9.76072 16.3232 9.46783 16.0303L6.46783 13.0303C6.17494 12.7374 6.17494 12.2626 6.46783 11.9697Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="black"/>
                            </svg>
                        </button>
                        <button className='modal-char_btn' onClick={onClose}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.64001 8.64124C8.9329 8.34835 9.40777 8.34835 9.70067 8.64124L11.9988 10.9393L14.2969 8.64124C14.5898 8.34835 15.0646 8.34835 15.3575 8.64124C15.6504 8.93414 15.6504 9.40901 15.3575 9.7019L13.0594 12L15.3575 14.2981C15.6504 14.591 15.6504 15.0659 15.3575 15.3588C15.0646 15.6517 14.5898 15.6517 14.2969 15.3588L11.9988 13.0607L9.70067 15.3588C9.40777 15.6517 8.9329 15.6517 8.64001 15.3588C8.34711 15.0659 8.34711 14.591 8.64001 14.2981L10.9381 12L8.64001 9.7019C8.34711 9.40901 8.34711 8.93414 8.64001 8.64124Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="black"/>
                            </svg>
                        </button>
                    </div>

                    <div className="modal-char_body">
                        <p className='text-n14'>Заголовок</p>
                        <div className="modal-char_dropdowns">
                            <div className="custom-dropdown">
                                <div className="custom-dropdown_header text-n16" onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}>
                                    {selectedGroup ? selectedGroup.title : 'Выберите группу'}
                                </div>
                                {isGroupDropdownOpen && (
                                    <ul className="custom-dropdown-list">
                                        {data
                                            .filter((group) => !usedGroupIds.includes(group.id))
                                            .map((group) => (
                                                <li className='custom-dropdown-list_item text-n16' key={group.id} onClick={() => handleGroupSelect(group)}>
                                                    {group.title}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>

                            <div className="custom-dropdown">
                                {selectedGroup ? (
                                    <>
                                        <div className="custom-dropdown_header text-n16" onClick={() => setIsCharDropdownOpen(!isCharDropdownOpen)}>
                                            {selectedCharId
                                                ? selectedGroup.characteristics.find((c) => c.id === selectedCharId)?.title
                                                : 'Выберите характеристику'}
                                        </div>
                                        {isCharDropdownOpen && (
                                            <ul className="custom-dropdown-list">
                                                {selectedGroup.characteristics.map((char) => (
                                                    <li className='custom-dropdown-list_item text-n16' key={char.id} onClick={() => handleCharSelect(char.id)}>
                                                        {char.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <div className="custom-dropdown_header text-n16">
                                        
                                    </div>
                                )}
                            </div>

                            <button className='text-n14 modal-charc_add' onClick={handleAddCharacteristic}>Добавить</button>
                        </div>

                        {selectedChars.length > 0 && (
                            <div className="modal-charc_cont">
                                <div className="modal-charc_list-labels">
                                    <p className='text-n14'>Параметр</p>
                                    <p className='text-n14'>Значение параметра</p>
                                </div>
                                <div className="modal-charc_list">
                                    {selectedChars.map((item) => (
                                        <div key={item.characteristic.id} className="modal-charc_item text-n16">
                                            <label className='modal-charc_item-label'>{item.characteristic.title}</label>
                                            <input
                                                type="text"
                                                className='modal-charc_item-input'
                                                placeholder='Впишите'
                                                value={item.value}
                                                onChange={(e) =>
                                                    handleChangeValue(item.characteristic.id, e.target.value)
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div>Выберите группу товаров</div>
            )}
            
        </Modal>
    );
};

export default AddCharacteristicModal;
