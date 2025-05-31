import React, { useState } from 'react';
import './refundForm.scss';
import FileUploader from '../fileUploader/FileUploader';
import { useAppDispatch } from '../../store/hooks';
import { createRefund } from '../../store/refundSlice';

interface RefundFormProps {
    setIsOpenFirst: (value: boolean) => void;
    setIsOpenSecond: (value: boolean) => void;
    itemId: number;
    orderId: number;
}

const RefundForm: React.FC<RefundFormProps> = ({
    setIsOpenFirst,
    setIsOpenSecond,
    itemId,
    orderId,
}) => {
    const dispatch = useAppDispatch();
    const [files, setFiles] = useState<File[]>([]);
    const [reason, setReason] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason.trim()) {
            alert('Укажите причину возврата');
            return;
        }

        try {
            await dispatch(
                createRefund({
                    item: itemId,
                    order: orderId,
                    body: reason,
                })
            ).unwrap();

            setIsOpenFirst(false);
            setIsOpenSecond(true);
        } catch (error: any) {
            //alert('Ошибка при отправке возврата: ' + error);
        }
    };

    return (
        <form className="refund-form" onSubmit={handleSubmit}>
            <textarea
                placeholder="Опишите причину возврата"
                className="refund-form_textarea text-n14"
                maxLength={250}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            />

            <FileUploader onFilesChange={setFiles} />

            <button type="submit" className="text-btn refund-form_submit-btn btn-black">
                Оформить возврат
            </button>
        </form>
    );
};

export default RefundForm;
