import SellerNav from '../../components/sellerNav/SellerNav';
import './sellerMainPage.scss'
import { Link } from 'react-router-dom';

const SellerMainPage: React.FC = () => {
    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-main'>
                <div className='seller-main_item'></div>
                <div className='seller-main_item'></div>
                <div className='seller-main_item'></div>
                <div className='seller-main_item'></div>
            </div>
        </div>
    );
};

export default SellerMainPage;
