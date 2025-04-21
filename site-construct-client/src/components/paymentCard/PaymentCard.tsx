import './paymentCard.scss'

const PaymentCard: React.FC = () => {
    return (
        <div className='payment-card'>
            <p className='payment-card_bank text-h1'>
                SberPay
            </p>
            <button className='payment-card_delete'>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#FEFEFE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.2271 10.227C10.52 9.93414 10.9948 9.93414 11.2877 10.227L16 14.9393L20.7124 10.227C21.0052 9.93414 21.4801 9.93414 21.773 10.227C22.0659 10.5199 22.0659 10.9948 21.773 11.2877L17.0607 16L21.773 20.7123C22.0659 21.0052 22.0659 21.4801 21.773 21.773C21.4801 22.0659 21.0052 22.0659 20.7124 21.773L16 17.0607L11.2877 21.773C10.9948 22.0659 10.52 22.0659 10.2271 21.773C9.93418 21.4801 9.93418 21.0052 10.2271 20.7123L14.9394 16L10.2271 11.2877C9.93418 10.9948 9.93418 10.5199 10.2271 10.227Z" fill="#02040F"/>
                </svg>
            </button>
            <button className='payment-card_main text-card'>
                Основной
            </button>
            <p className='payment-card_num text-h1'>
                ...5684
            </p>
        </div>
    );
};

export default PaymentCard;