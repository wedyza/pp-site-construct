import { Link, useLocation } from 'react-router-dom';
import './adminNav.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import { useEffect } from 'react';
import { fetchUserInfo } from '../../store/userSlice';

const AdminNav: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    const location = useLocation();

    const isUsersRoute =
        location.pathname === '/users' ||
        location.pathname === '/user' ||
        location.pathname.startsWith('/user/');
    
    const { firstName } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    return (
        <div className='seller-nav'>
            <div className='seller-nav_head'>
                <div className='seller-nav_head-text'>
                    <span className='seller-nav_head-role text-desc'>
                        admin
                    </span>
                    <span className='seller-nav_head-greet text-n16'>
                        Добрый день, {firstName}!
                    </span>
                </div>
                <div className='seller-nav_head-links'>
                    <Link to='/profile' className='seller-nav_not'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#02040F" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.3513 8.66291L15.4366 6.45408L16.666 5.00008L14.9993 3.33341L13.5533 4.56921L11.2975 3.64153L10.7788 1.66675H9.15017L8.62358 3.66769L6.41969 4.59672L4.99935 3.33341L3.33268 5.00008L4.54382 6.49079L3.6431 8.70536L1.66602 9.16675V10.8334L3.66694 11.3797L4.59581 13.5832L3.33268 15.0001L4.99935 16.6667L6.49198 15.4503L8.66353 16.3437L9.16602 18.3334H10.8327L11.3365 16.3444L13.5453 15.4297C13.9134 15.6928 14.9993 16.6667 14.9993 16.6667L16.666 15.0001L15.4293 13.5413L16.3442 11.3318L18.3326 10.8144L18.3327 9.16675L16.3513 8.66291Z" stroke="#02040F" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className='seller-nav_body'>
                <div className={`seller-nav_item-container ${location.pathname === '/' ? 'seller-nav_item__active' : ''}`}>
                    <Link to='/' className='seller-nav_item' >
                        <div className="seller-nav_item-img">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.00098 12.75C6.80715 12.75 7.40392 12.7939 7.85254 12.8936C8.29271 12.9913 8.54292 13.1328 8.70508 13.2949C8.86724 13.4571 9.00865 13.7073 9.10645 14.1475C9.20611 14.5961 9.24998 15.1929 9.25 15.999C9.25 16.8053 9.20612 17.4027 9.10645 17.8516C9.00864 18.2919 8.86732 18.5428 8.70508 18.7051C8.54288 18.8673 8.29248 19.0086 7.85254 19.1064C7.40397 19.2062 6.8071 19.25 6.00098 19.25C5.19462 19.25 4.59722 19.2062 4.14844 19.1064C3.70817 19.0086 3.45729 18.8674 3.29492 18.7051C3.13255 18.5427 2.99143 18.2918 2.89355 17.8516C2.79379 17.4028 2.75 16.8054 2.75 15.999C2.75002 15.1929 2.79381 14.596 2.89355 14.1475C2.9914 13.7075 3.13269 13.4571 3.29492 13.2949C3.45724 13.1327 3.7081 12.9914 4.14844 12.8936C4.59726 12.7939 5.19465 12.75 6.00098 12.75ZM15.999 12.75C16.8053 12.75 17.4027 12.7939 17.8516 12.8936C18.2919 12.9914 18.5428 13.1327 18.7051 13.2949C18.8673 13.4571 19.0086 13.7075 19.1064 14.1475C19.2062 14.596 19.25 15.1929 19.25 15.999C19.25 16.8054 19.2062 17.4028 19.1064 17.8516C19.0086 18.2918 18.8674 18.5427 18.7051 18.7051C18.5427 18.8674 18.2918 19.0086 17.8516 19.1064C17.4028 19.2062 16.8054 19.25 15.999 19.25C15.1929 19.25 14.596 19.2062 14.1475 19.1064C13.7075 19.0086 13.4571 18.8673 13.2949 18.7051C13.1327 18.5428 12.9914 18.2919 12.8936 17.8516C12.7939 17.4027 12.75 16.8053 12.75 15.999C12.75 15.1929 12.7939 14.5961 12.8936 14.1475C12.9913 13.7073 13.1328 13.4571 13.2949 13.2949C13.4571 13.1328 13.7073 12.9913 14.1475 12.8936C14.5961 12.7939 15.1929 12.75 15.999 12.75ZM6.00098 2.75C6.8071 2.75002 7.40397 2.79381 7.85254 2.89355C8.29248 2.9914 8.54288 3.13269 8.70508 3.29492C8.86732 3.45724 9.00864 3.7081 9.10645 4.14844C9.20612 4.59726 9.25 5.19465 9.25 6.00098C9.24998 6.80715 9.20611 7.40392 9.10645 7.85254C9.00865 8.29271 8.86724 8.54292 8.70508 8.70508C8.54292 8.86724 8.29271 9.00865 7.85254 9.10645C7.40392 9.20611 6.80715 9.24998 6.00098 9.25C5.19465 9.25 4.59726 9.20612 4.14844 9.10645C3.7081 9.00864 3.45724 8.86732 3.29492 8.70508C3.13269 8.54288 2.9914 8.29248 2.89355 7.85254C2.79381 7.40397 2.75002 6.8071 2.75 6.00098C2.75 5.19462 2.79379 4.59722 2.89355 4.14844C2.99143 3.70817 3.13255 3.45729 3.29492 3.29492C3.45729 3.13255 3.70817 2.99143 4.14844 2.89355C4.59722 2.79379 5.19462 2.75 6.00098 2.75ZM15.999 2.75C16.8054 2.75 17.4028 2.79379 17.8516 2.89355C18.2918 2.99143 18.5427 3.13255 18.7051 3.29492C18.8674 3.45729 19.0086 3.70817 19.1064 4.14844C19.2062 4.59722 19.25 5.19462 19.25 6.00098C19.25 6.8071 19.2062 7.40397 19.1064 7.85254C19.0086 8.29248 18.8673 8.54288 18.7051 8.70508C18.5428 8.86732 18.2919 9.00864 17.8516 9.10645C17.4027 9.20612 16.8053 9.25 15.999 9.25C15.1929 9.24998 14.5961 9.20611 14.1475 9.10645C13.7073 9.00865 13.4571 8.86724 13.2949 8.70508C13.1328 8.54292 12.9913 8.29271 12.8936 7.85254C12.7939 7.40392 12.75 6.80715 12.75 6.00098C12.75 5.19465 12.7939 4.59726 12.8936 4.14844C12.9914 3.7081 13.1327 3.45724 13.2949 3.29492C13.4571 3.13269 13.7075 2.9914 14.1475 2.89355C14.596 2.79381 15.1929 2.75002 15.999 2.75Z" stroke="#02040F" stroke-width="1.5"/>
                            </svg>
                        </div>
                        <span className='seller-nav_item-text text-n16'>Категории товаров</span>
                    </Link>
                </div>
                <div className={`seller-nav_item-container ${location.pathname === '/characteristics' ? 'seller-nav_item__active' : ''}`}>
                    <Link to='/characteristics' className='seller-nav_item' >
                        <div className="seller-nav_item-img">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.35547 2.52075V19.4791H10.0846C10.4643 19.4791 10.7721 19.7869 10.7721 20.1666C10.7721 20.5463 10.4643 20.8541 10.0846 20.8541H4.21797C3.53452 20.8541 2.98047 20.3 2.98047 19.6166V2.38325C2.98047 1.6998 3.53452 1.14575 4.21797 1.14575H14.8985C15.2267 1.14575 15.5415 1.27613 15.7735 1.50821L18.6597 4.39436C18.8918 4.62643 19.0221 4.9412 19.0221 5.2694V10.9999C19.0221 11.3796 18.7143 11.6874 18.3346 11.6874C17.9549 11.6874 17.6471 11.3796 17.6471 10.9999V5.32636L14.8415 2.52075H4.35547Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.64453 5.5C6.64453 5.1203 6.95234 4.8125 7.33203 4.8125H10.9987C11.3784 4.8125 11.6862 5.1203 11.6862 5.5C11.6862 5.8797 11.3784 6.1875 10.9987 6.1875H7.33203C6.95234 6.1875 6.64453 5.8797 6.64453 5.5ZM6.64453 9.16667C6.64453 8.78697 6.95234 8.47917 7.33203 8.47917H14.6654C15.0451 8.47917 15.3529 8.78697 15.3529 9.16667C15.3529 9.54636 15.0451 9.85417 14.6654 9.85417H7.33203C6.95234 9.85417 6.64453 9.54636 6.64453 9.16667ZM6.64453 12.8333C6.64453 12.4536 6.95234 12.1458 7.33203 12.1458H10.082C10.4617 12.1458 10.7695 12.4536 10.7695 12.8333C10.7695 13.213 10.4617 13.5208 10.082 13.5208H7.33203C6.95234 13.5208 6.64453 13.213 6.64453 12.8333Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.3144 16.5508C19.9843 15.881 19.9843 14.7948 19.3144 14.1249C18.6445 13.455 17.5584 13.455 16.8885 14.1249L13.23 17.7834C12.9895 18.0239 12.8317 18.3346 12.7793 18.6706L12.5568 20.0973C12.523 20.3141 12.5948 20.5341 12.75 20.6893C12.9052 20.8445 13.1252 20.9163 13.342 20.8825L14.7686 20.6601C15.1047 20.6077 15.4154 20.4499 15.6559 20.2094L19.3144 16.5508ZM18.3421 15.0972C18.475 15.2301 18.475 15.4456 18.3421 15.5786L17.9116 16.0091L17.4302 15.5277L17.8608 15.0972C17.9937 14.9643 18.2092 14.9643 18.3421 15.0972ZM16.4579 16.5L16.9393 16.9814L14.6836 19.2371C14.6492 19.2715 14.6048 19.294 14.5568 19.3015L14.0605 19.3789L14.1379 18.8824C14.1454 18.8344 14.1679 18.79 14.2023 18.7557L16.4579 16.5Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.668 1.14575C15.0477 1.14575 15.3555 1.45356 15.3555 1.83325V4.81242H18.3346C18.7143 4.81242 19.0221 5.12022 19.0221 5.49992C19.0221 5.87961 18.7143 6.18742 18.3346 6.18742H15.218C14.5345 6.18742 13.9805 5.63337 13.9805 4.94992V1.83325C13.9805 1.45356 14.2883 1.14575 14.668 1.14575Z" fill="black"/>
                            </svg>
                        </div>
                        <span className='seller-nav_item-text text-n16'>Характеристики</span>
                    </Link>
                </div>
                <div className={`seller-nav_item-container ${isUsersRoute ? 'seller-nav_item__active' : ''}`}>
                    <Link to='/users' className="seller-nav_item">
                        <div className="seller-nav_item-img">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.0013 11.6875C8.84969 11.6875 7.10547 13.4317 7.10547 15.5833V16.5C7.10547 16.8797 6.79766 17.1875 6.41797 17.1875C6.03827 17.1875 5.73047 16.8797 5.73047 16.5V15.5833C5.73047 12.6723 8.0903 10.3125 11.0013 10.3125C13.9123 10.3125 16.2721 12.6723 16.2721 15.5833V16.5C16.2721 16.8797 15.9643 17.1875 15.5846 17.1875C15.2049 17.1875 14.8971 16.8797 14.8971 16.5V15.5833C14.8971 13.4317 13.1529 11.6875 11.0013 11.6875Z" fill="#02040F"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M11 6.1875C9.86091 6.1875 8.9375 7.11091 8.9375 8.25C8.9375 9.38909 9.86091 10.3125 11 10.3125C12.1391 10.3125 13.0625 9.38909 13.0625 8.25C13.0625 7.11091 12.1391 6.1875 11 6.1875ZM7.5625 8.25C7.5625 6.35152 9.10152 4.8125 11 4.8125C12.8985 4.8125 14.4375 6.35152 14.4375 8.25C14.4375 10.1485 12.8985 11.6875 11 11.6875C9.10152 11.6875 7.5625 10.1485 7.5625 8.25Z" fill="#02040F"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.5625 18.5625V3.4375H3.4375V18.5625H18.5625ZM19.9375 18.7C19.9375 19.3835 19.3835 19.9375 18.7 19.9375H3.3C2.61655 19.9375 2.0625 19.3835 2.0625 18.7V3.3C2.0625 2.61655 2.61655 2.0625 3.3 2.0625H18.7C19.3835 2.0625 19.9375 2.61655 19.9375 3.3V18.7Z" fill="#02040F"/>
                            </svg>
                        </div>
                        <span className='seller-nav_item-text text-n16'>Пользователи</span>
                    </Link>
                </div>
                <div className={`seller-nav_item-container ${location.pathname === '/documents' ? 'seller-nav_item__active' : ''}`}>
                    <Link className="seller-nav_item" to='/documents'>
                        <div className="seller-nav_item-img">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 7C5.10457 7 6 6.10457 6 5C6 3.89543 5.10457 3 4 3C2.89543 3 2 3.89543 2 5C2 6.10457 2.89543 7 4 7Z" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 5L19 5" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 10.6665L10.3333 10.6665" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.9987 12.3333C15.9192 12.3333 16.6654 11.5871 16.6654 10.6667C16.6654 9.74619 15.9192 9 14.9987 9C14.0782 9 13.332 9.74619 13.332 10.6667C13.332 11.5871 14.0782 12.3333 14.9987 12.3333Z" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 18.3333C5.10457 18.3333 6 17.4378 6 16.3333C6 15.2287 5.10457 14.3333 4 14.3333C2.89543 14.3333 2 15.2287 2 16.3333C2 17.4378 2.89543 18.3333 4 18.3333Z" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 16.3333L19 16.3333" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <span className='seller-nav_item-text text-n16'>Настройки платформы</span>
                    </Link>
                </div>
                <button className="seller-nav_item seller-nav_item__logout" onClick={handleLogout}>
                    <div className="seller-nav_item-img">
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.5 0.75C9.5 1.16421 9.16421 1.5 8.75 1.5H2.75C2.05964 1.5 1.5 2.05964 1.5 2.75V14.75C1.5 15.4404 2.05964 16 2.75 16H8.75C9.16421 16 9.5 16.3358 9.5 16.75C9.5 17.1642 9.16421 17.5 8.75 17.5H2.75C1.23122 17.5 0 16.2688 0 14.75V2.75C0 1.23122 1.23122 0 2.75 0H8.75C9.16421 0 9.5 0.335786 9.5 0.75Z" fill="#02040F"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.2803 9.03033C16.5732 8.73744 16.5732 8.26256 16.2803 7.96967L12.7803 4.46967C12.4874 4.17678 12.0126 4.17678 11.7197 4.46967C11.4268 4.76256 11.4268 5.23744 11.7197 5.53033L13.9393 7.75H4.69876C4.28455 7.75 3.75 8.08579 3.75 8.5C3.75 8.91421 4.28455 9.25 4.69876 9.25H13.9393L11.7197 11.4697C11.4268 11.7626 11.4268 12.2374 11.7197 12.5303C12.0126 12.8232 12.4874 12.8232 12.7803 12.5303L16.2803 9.03033Z" fill="#02040F"/>
                        </svg>
                    </div>
                    <span className='seller-nav_item-text text-n16'>Выйти</span>
                </button>
            </div>
        </div>
    );
};

export default AdminNav;