import './usersPage.scss'
import AdminNav from '../../components/adminNav/AdminNav';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchAllUsers } from '../../store/usersSlice';
import { Link } from 'react-router-dom';

const UsersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.users);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <div className='page-content__seller'>
            <AdminNav />
            <div className='admin-cat admin-users'>
                <div className='seller-orders_title'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0013 11.6875C8.84969 11.6875 7.10547 13.4317 7.10547 15.5833V16.5C7.10547 16.8797 6.79766 17.1875 6.41797 17.1875C6.03827 17.1875 5.73047 16.8797 5.73047 16.5V15.5833C5.73047 12.6723 8.0903 10.3125 11.0013 10.3125C13.9123 10.3125 16.2721 12.6723 16.2721 15.5833V16.5C16.2721 16.8797 15.9643 17.1875 15.5846 17.1875C15.2049 17.1875 14.8971 16.8797 14.8971 16.5V15.5833C14.8971 13.4317 13.1529 11.6875 11.0013 11.6875Z" fill="#02040F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M11 6.1875C9.86091 6.1875 8.9375 7.11091 8.9375 8.25C8.9375 9.38909 9.86091 10.3125 11 10.3125C12.1391 10.3125 13.0625 9.38909 13.0625 8.25C13.0625 7.11091 12.1391 6.1875 11 6.1875ZM7.5625 8.25C7.5625 6.35152 9.10152 4.8125 11 4.8125C12.8985 4.8125 14.4375 6.35152 14.4375 8.25C14.4375 10.1485 12.8985 11.6875 11 11.6875C9.10152 11.6875 7.5625 10.1485 7.5625 8.25Z" fill="#02040F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.5625 18.5625V3.4375H3.4375V18.5625H18.5625ZM19.9375 18.7C19.9375 19.3835 19.3835 19.9375 18.7 19.9375H3.3C2.61655 19.9375 2.0625 19.3835 2.0625 18.7V3.3C2.0625 2.61655 2.61655 2.0625 3.3 2.0625H18.7C19.3835 2.0625 19.9375 2.61655 19.9375 3.3V18.7Z" fill="#02040F"/>
                    </svg>
                    <h1 className='text-n16'>Сотрудники</h1>
                </div>
                <div className='admin-users_table admin-table text-n11'>
                    <div className='seller-orders_table-head seller-orders_table-row'>
                        <div className='seller-orders_table-cell'>Имя сотрудника</div>
                        <div className='seller-orders_table-cell'>Должность</div>
                        <div className='seller-orders_table-cell'>Статус</div>
                        <div className='seller-orders_table-cell'>Управление</div>
                    </div>
                    {Object.values(users).map((user) => (
                        <div key={user.id} className="seller-orders_table-row admin-orders_table-row">
                            <div className='admin-orders_table-cell'>{`${user.first_name} ${user.last_name}`}</div>
                            <div className='admin-orders_table-cell'>{user.user_type}</div>
                            <div className='admin-orders_table-cell'>{user.is_active ? 'Активен' : 'Неактивен'}</div>
                            <Link to={`/user/${user.id}`} className='admin-orders_table-cell'>
                                <span className='admin-users_link'>Редактировать</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
