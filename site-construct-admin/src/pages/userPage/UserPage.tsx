import './userPage.scss'
import AdminNav from '../../components/adminNav/AdminNav';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { deleteUser, fetchUserById, toggleUserActiveStatus } from '../../store/usersSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { selectedUser } = useAppSelector(state => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUserById(Number(id)));
    }, []);

    const onDelete = async (id: number) => {
        const resultAction = await dispatch(deleteUser(id));
        if (deleteUser.fulfilled.match(resultAction)) {
            navigate('/users');
        }
    };

    const onToggleActive = (id: number) => {
        dispatch(toggleUserActiveStatus(id));
    };

    return (
        <div className='page-content__seller'>
            <AdminNav />
            <div className='admin-cat admin-user'>
                <div className='seller-orders_title'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0013 11.6875C8.84969 11.6875 7.10547 13.4317 7.10547 15.5833V16.5C7.10547 16.8797 6.79766 17.1875 6.41797 17.1875C6.03827 17.1875 5.73047 16.8797 5.73047 16.5V15.5833C5.73047 12.6723 8.0903 10.3125 11.0013 10.3125C13.9123 10.3125 16.2721 12.6723 16.2721 15.5833V16.5C16.2721 16.8797 15.9643 17.1875 15.5846 17.1875C15.2049 17.1875 14.8971 16.8797 14.8971 16.5V15.5833C14.8971 13.4317 13.1529 11.6875 11.0013 11.6875Z" fill="#02040F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M11 6.1875C9.86091 6.1875 8.9375 7.11091 8.9375 8.25C8.9375 9.38909 9.86091 10.3125 11 10.3125C12.1391 10.3125 13.0625 9.38909 13.0625 8.25C13.0625 7.11091 12.1391 6.1875 11 6.1875ZM7.5625 8.25C7.5625 6.35152 9.10152 4.8125 11 4.8125C12.8985 4.8125 14.4375 6.35152 14.4375 8.25C14.4375 10.1485 12.8985 11.6875 11 11.6875C9.10152 11.6875 7.5625 10.1485 7.5625 8.25Z" fill="#02040F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.5625 18.5625V3.4375H3.4375V18.5625H18.5625ZM19.9375 18.7C19.9375 19.3835 19.3835 19.9375 18.7 19.9375H3.3C2.61655 19.9375 2.0625 19.3835 2.0625 18.7V3.3C2.0625 2.61655 2.61655 2.0625 3.3 2.0625H18.7C19.3835 2.0625 19.9375 2.61655 19.9375 3.3V18.7Z" fill="#02040F"/>
                    </svg>
                    <h1 className='text-n16'>Сотрудники</h1>
                </div>
                <Link to='/users' className='text-n11'>
                    <span className='admin-user_link'>Назад</span>
                </Link>
                <h2 className='text-h'>{`${selectedUser?.first_name} ${selectedUser?.last_name}`}</h2>
                <div className='admin-user_info'>
                    <p className='text-body'>Данные сотрудника</p>
                    <div className='admin-user_info-actions'>
                        <button 
                            className='admin-user_btn admin-user_deact text-n14'
                            onClick={() => {
                                if (selectedUser) onToggleActive(selectedUser.id)
                            }}
                        >
                            {selectedUser?.is_active ? 'Деактивировать' : 'Активировать'}
                        </button>
                        <button 
                            className='admin-user_btn admin-user_del text-n14'
                            onClick={() => {
                                if (selectedUser) onDelete(selectedUser.id)
                            }}
                        >
                            Удалить сотрудника
                        </button>
                    </div>
                    <div className='admin-user_info-img'>
                        {selectedUser?.avatar && (
                            <img src={selectedUser.avatar} alt="" />
                        )}
                    </div>
                    <p className='text-big admin-user_info-name'>{`${selectedUser?.first_name} ${selectedUser?.last_name}`}</p>
                    <div className='admin-user_info-list text-n16'>
                        <p className='admin-user_info-item'>
                            Почта: {selectedUser?.email}
                        </p>
                        <p className='admin-user_info-item'>
                            Статус: {selectedUser?.is_active ? 'Активен' : 'Неактивен'}
                        </p>
                        <p className='admin-user_info-item'>
                            Должность: {selectedUser?.user_type}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
