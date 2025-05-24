import React, { useState } from 'react';
import { Characteristic, CharacteristicGroup } from '../../store/characteristicsSlice';
import Modal from '../modal/Modal';
import './addAboutModal.scss'

interface AddAboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CharacteristicGroup) => void;
    availableChars: Characteristic[];
    usedChar: string[];
}

export const AddAboutModal: React.FC<AddAboutModalProps> = ({
    isOpen,
    onClose,
    onSave,
    availableChars,
    usedChar
}) => {
    const [selectedChar, setSelectedChar] = useState<Characteristic | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [addedChars, setAddedChars] = useState<Characteristic[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSave = () => {
        onSave({
            id: Date.now(),
            title: 'О товаре',
            characteristics: addedChars,
        });
        setSelectedChar(null);
        setInputValue('');
        setAddedChars([]);
        onClose();
    };

    const handleSelectChar = (char: Characteristic) => {
        setSelectedChar(char);
        setInputValue(
            addedChars.find((c) => c.id === char.id)?.value || ''
        );
        setDropdownOpen(false);
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);

        if (selectedChar) {
            const exists = addedChars.find((char) => char.id === selectedChar.id);
            if (exists) {
                setAddedChars((prev) =>
                    prev.map((char) =>
                        char.id === selectedChar.id ? { ...char, value } : char
                    )
                );
            } else {
                setAddedChars((prev) => [...prev, { ...selectedChar, value }]);
            }
        }
    };

    const filtered = availableChars.filter(
        (char) =>
            !usedChar.includes(char.title) &&
            !addedChars.find((a) => a.title === char.title)
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="about-modal">
            <div className="modal-char_header">
                <h2 className='text-h2 about-modal_header'>Добавление строки таблицы</h2>
                <button className='modal-char_btn modal-char_save' onClick={handleSave}>
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
            <span className='text-n14 about-modal_label'>Параметр</span>
            <div className="custom-dropdown">
                <div
                    className="custom-dropdown_header text-n16"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    {selectedChar?.title || 'Выберите характеристику'}
                </div>
                {dropdownOpen && (
                    <div className="custom-dropdown-list">
                        {filtered.map((char) => (
                            <div
                                key={char.id}
                                className="custom-dropdown-list_item text-n16"
                                onClick={() => handleSelectChar(char)}
                            >
                                {char.title}
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <div className="">Все характеристики добавлены</div>
                        )}
                    </div>
                )}
            </div>

            <span className='text-n14 about-modal_label'>Значение параметра</span>
            <input
                className="modal-charc_item-input text-n16"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder='Введите значение'
            />
        </Modal>
    );
};