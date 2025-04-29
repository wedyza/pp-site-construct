import { useState } from 'react';
import PaymentCard from '../paymentCard/PaymentCard';
import './profilePaymentMethods.scss'
import Modal from '../modal/Modal';

const ProfilePaymentMethods: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='payment-methods'>
            <h1 className='text-h1 payment-methods_title'>Способы оплаты</h1>
            <ul className='payment-methods_list'>
                <li className='payment-method'>
                    <PaymentCard />
                </li>
                <li className='payment-method'>
                    <PaymentCard />
                </li>
                <li className='payment-method'>
                    <PaymentCard />
                </li>
                <li className='payment-method'>
                    <PaymentCard />
                </li>
            </ul>
            <button className='payment-method_add' onClick={() => setIsModalOpen(true)}>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 0.75C7.41421 0.75 7.75 1.08579 7.75 1.5V6.75H13C13.4142 6.75 13.75 7.08579 13.75 7.5C13.75 7.91421 13.4142 8.25 13 8.25H7.75V13.5C7.75 13.9142 7.41421 14.25 7 14.25C6.58579 14.25 6.25 13.9142 6.25 13.5V8.25H1C0.585786 8.25 0.25 7.91421 0.25 7.5C0.25 7.08579 0.585786 6.75 1 6.75H6.25V1.5C6.25 1.08579 6.58579 0.75 7 0.75Z" fill="#02040F" fillOpacity="0.6"/>
                </svg>
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="payment-modal"
            >
               <h2 className='text-h2'>Привязать карту</h2>
                <button className='notify-modal_exit modal_exit-btn' onClick={() => setIsModalOpen(false)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.227072 0.22703C0.519965 -0.0658633 0.994839 -0.0658636 1.28773 0.22703L6.00004 4.93934L10.7124 0.22703C11.0052 -0.0658633 11.4801 -0.0658637 11.773 0.22703C12.0659 0.519923 12.0659 0.994797 11.773 1.28769L7.0607 6L11.773 10.7123C12.0659 11.0052 12.0659 11.4801 11.773 11.773C11.4801 12.0659 11.0052 12.0659 10.7124 11.773L6.00004 7.06066L1.28773 11.773C0.994839 12.0659 0.519965 12.0659 0.227072 11.773C-0.0658213 11.4801 -0.0658213 11.0052 0.227072 10.7123L4.93938 6L0.227072 1.28769C-0.0658213 0.994797 -0.0658213 0.519923 0.227072 0.22703Z" fill="#02040F"/>
                    </svg>
                </button>
                <form className='payment-modal_form'>
                    <input type="text" className='payment-modal_input payment-modal_number text-n14' placeholder='Номер карты' />
                    <input type="text" className='payment-modal_input payment-modal_date text-n14' placeholder='ММ/ГГ' />
                    <input type="text" className='payment-modal_input payment-modal_cvv text-n14' placeholder='CVV' />
                    <button className='payment-modal_form-btn text-btn'>Привязать</button>
                </form>
            </Modal>
        </div>
    );
};

export default ProfilePaymentMethods;