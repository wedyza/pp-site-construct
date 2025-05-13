import SellerNav from '../../components/sellerNav/SellerNav';
import './sellerGoodPage.scss'

const SellerGoodPage: React.FC = () => {
    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-good'>
                <div className='text-h3 seller-orders_title'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7427 5.96311C14.4587 5.24715 14.4587 4.08635 13.7427 3.37039L12.7999 2.42758C12.0839 1.71162 10.9231 1.71162 10.2072 2.42758L2.81007 9.82468C2.50566 10.1291 2.31809 10.5309 2.28021 10.9597L2.11882 12.7867C2.05492 13.51 2.66027 14.1154 3.38362 14.0515L5.21056 13.8901C5.63938 13.8522 6.0412 13.6646 6.3456 13.3602L13.7427 5.96311ZM13.0356 4.07749C13.361 4.40293 13.361 4.93057 13.0356 5.256L12.4025 5.88911L10.2812 3.76779L10.9143 3.13468C11.2397 2.80925 11.7673 2.80925 12.0928 3.13468L13.0356 4.07749ZM9.57406 4.4749L11.6954 6.59622L5.63849 12.6531C5.50013 12.7915 5.31749 12.8767 5.12257 12.8939L3.29562 13.0553C3.19229 13.0645 3.10581 12.978 3.11494 12.8747L3.27633 11.0477C3.29355 10.8528 3.37881 10.6701 3.51717 10.5318L9.57406 4.4749Z" fill="black"/>
                    </svg>
                    <h1>Редактирование товара</h1>
                </div>
            </div>
        </div>
    );
};

export default SellerGoodPage;
