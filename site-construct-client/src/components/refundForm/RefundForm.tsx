import React, { useState } from 'react';
import './refundForm.scss';
import FileUploader from '../fileUploader/FileUploader';

interface RefundModalProps {
    setIsOpenFirst: (value: boolean) => void;
    setIsOpenSecond: (value: boolean) => void;
}

const RefundForm: React.FC<RefundModalProps> = ({ setIsOpenFirst, setIsOpenSecond }) => {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <form className="refund-form">
            <textarea
                placeholder="Опишите причину возврата"
                className="refund-form_textarea text-n14"
            />

            <FileUploader onFilesChange={setFiles} />

            <button
                type="submit"
                className="text-btn refund-form_submit-btn btn-black"
                onClick={() => {
                    setIsOpenFirst(false);
                    setIsOpenSecond(true);
                    console.log('Отправляем файлы:', files);
                }}
            >
                Оформить возврат
            </button>
        </form>
    );
};

export default RefundForm;
