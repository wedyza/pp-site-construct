import PaymentCard from '../paymentCard/PaymentCard';
import './profilePaymentMethods.scss'

const ProfilePaymentMethods: React.FC = () => {
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
            <button className='payment-method_add'>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 0.75C7.41421 0.75 7.75 1.08579 7.75 1.5V6.75H13C13.4142 6.75 13.75 7.08579 13.75 7.5C13.75 7.91421 13.4142 8.25 13 8.25H7.75V13.5C7.75 13.9142 7.41421 14.25 7 14.25C6.58579 14.25 6.25 13.9142 6.25 13.5V8.25H1C0.585786 8.25 0.25 7.91421 0.25 7.5C0.25 7.08579 0.585786 6.75 1 6.75H6.25V1.5C6.25 1.08579 6.58579 0.75 7 0.75Z" fill="#02040F" fill-opacity="0.6"/>
                </svg>
            </button>
        </div>
    );
};

export default ProfilePaymentMethods;