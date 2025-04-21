import { useState } from 'react';
import './profileInfo.scss'

const ProfileInfo: React.FC = () => {
    const [firstName, setFirstName] = useState('Алена');
    const [lastName, setLastName] = useState('Иванова');
    const [email, setEmail] = useState('kflskdnvkxv@mail.ru');

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.target.value);
    };
  
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
    };

  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };

    
    const [settings, setSettings] = useState([true, false, true, false]);

    const toggleSetting = (index: number) => {
        const updated = [...settings];
        updated[index] = !updated[index];
        setSettings(updated);
    };

    const settingLabels = [
        'Получать уведомления о заказах',
        'Новинки и акции',
        'Новости и обновления',
        'Оповещения от службы поддержки'
    ];
    return (
        <div className='profile-info'>
            <form className='profile-info_form'>
                <h2 className='text-h1 profile-info_form-title'>Личные данные</h2>
                <div className="profile_form-group">
                    <label htmlFor="firstName" className='profile-info_label text-n14'>Имя</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        className='profile-info_input text-n16'
                    />
                </div>
                <div className="profile_form-group">
                    <label htmlFor="lastName" className='profile-info_label text-n14'>Фамилия</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                        className='profile-info_input text-n16'
                    />
                </div>
                <div className="profile_form-group">
                    <label htmlFor="email" className='profile-info_label text-n14'>Почта</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className='profile-info_input text-n16'
                    />
                </div>
                <button type='submit' className='text-btn profile-info_form-btn'>Сохранить</button>
            </form>
            <div className='profile-info_stg'>
                <h2 className='text-h1'>Настройки</h2>
                <h3 className='text-n16 profile-info_stg-title'>Уведомления</h3>
                <ul className='profile-info_stg-list'>
                    {settingLabels.map((label, index) => (
                        <li
                            className='profile-info_stg-item'
                            key={index}
                            onClick={() => toggleSetting(index)}
                        >
                        <div className={`profile-info_toggle ${settings[index] ? 'profile-info_toggle__on' : 'profile-info_toggle__off'}`}>
                            <div className='profile-info_toggle-dot'></div>
                                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg" className='profile-info_toggle-track'>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6 1.75C3.65279 1.75 1.75 3.65279 1.75 6C1.75 8.34721 3.65279 10.25 6 10.25H16C18.3472 10.25 20.25 8.34721 20.25 6C20.25 3.65279 18.3472 1.75 16 1.75H6ZM0.25 6C0.25 2.82436 2.82436 0.25 6 0.25H16C19.1756 0.25 21.75 2.82436 21.75 6C21.75 9.17564 19.1756 11.75 16 11.75H6C2.82436 11.75 0.25 9.17564 0.25 6Z" fill="black"/>
                                </svg>
                            </div>
                            <span className='profile-info_stg-label text-n16'>{label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfileInfo;