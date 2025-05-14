import { useEffect, useState } from 'react';
import PaymentCard from '../paymentCard/PaymentCard';
import './profilePaymentMethods.scss';
import Modal from '../modal/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPaymentMethods, addPaymentMethod } from '../../store/paymentMethodsSlice';

const ProfilePaymentMethods: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items: methods/*, loading*/ } = useAppSelector((state) => state.paymentMethods);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [cardBody, setCardBody] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cardCvv, setCardCvv] = useState('');

    useEffect(() => {
        dispatch(fetchPaymentMethods());
    }, [dispatch]);

    function convertDate(ddmm: string): string {
        const [day, month] = ddmm.split('/');
        const year = new Date().getFullYear();
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(
            addPaymentMethod({
                card_body: cardBody.replace(/\s/g, ''),
                card_expire_date: convertDate(cardDate),
                card_cvv_code: cardCvv,
            })
        ).then(() => {
            setIsModalOpen(false);
            setCardBody('');
            setCardDate('');
            setCardCvv('');
        });
    };

    const handleCardBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.slice(0, 16);
        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardBody(formatted);
    };

    const handleCardDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.slice(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        setCardDate(value);
    };

    return (
        <div className='payment-methods'>
            <h1 className='text-h1 payment-methods_title'>Способы оплаты</h1>
            <ul className='payment-methods_list'>
                {methods.map((method) => (
                    <li key={method.id} className='payment-method'>
                        <PaymentCard method={method} />
                    </li>
                ))}
            </ul>
            <button className='payment-method_add' onClick={() => setIsModalOpen(true)}>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 0.75C7.41421 0.75 7.75 1.08579 7.75 1.5V6.75H13C13.4142 6.75 13.75 7.08579 13.75 7.5C13.75 7.91421 13.4142 8.25 13 8.25H7.75V13.5C7.75 13.9142 7.41421 14.25 7 14.25C6.58579 14.25 6.25 13.9142 6.25 13.5V8.25H1C0.585786 8.25 0.25 7.91421 0.25 7.5C0.25 7.08579 0.585786 6.75 1 6.75H6.25V1.5C6.25 1.08579 6.58579 0.75 7 0.75Z" fill="#02040F" fillOpacity="0.6"/>
                </svg>
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="payment-modal">
                <h2 className='text-h2'>Привязать карту</h2>
                <form className='payment-modal_form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className='payment-modal_input payment-modal_number text-n14'
                        placeholder='Номер карты'
                        value={cardBody}
                        onChange={handleCardBodyChange}
                        required
                    />
                    <input
                        type="text"
                        className='payment-modal_input payment-modal_date text-n14'
                        placeholder='ММ/ГГ'
                        value={cardDate}
                        onChange={handleCardDateChange}
                        required
                    />
                    <input
                        type="text"
                        className='payment-modal_input payment-modal_cvv text-n14'
                        placeholder='CVV'
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        required
                    />
                    <button className='payment-modal_form-btn text-btn btn-black'>Привязать</button>
                </form>
            </Modal>
        </div>
    );
};

export default ProfilePaymentMethods;
