import { useEffect, useState } from 'react';
import './profileInfo.scss';
import CustomRadio from '../customRadio/CustomRadio';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserInfo, updateUserInfo } from '../../store/userSlice';

const ProfileInfo: React.FC = () => {
    const dispatch = useAppDispatch();
    const { firstName, lastName, email, gender, loading } = useAppSelector((state) => state.user);

    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [selected, setSelected] = useState<'MALE' | 'FEMALE' | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    useEffect(() => {
        setFirstNameInput(firstName);
        setLastNameInput(lastName);
        setEmailInput(email);
        setSelected(gender);
    }, [firstName, lastName, email, gender]);

    const isChanged =
        firstNameInput !== firstName ||
        lastNameInput !== lastName ||
        emailInput !== email ||
        selected !== gender;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isChanged || !selected) return;

        dispatch(
            updateUserInfo({
                first_name: firstNameInput,
                last_name: lastNameInput,
                email: emailInput,
                gender: selected,
            })
        );
    };

    const [settings, setSettings] = useState([true, false, true, false]);

    // const toggleSetting = (index: number) => {
    //     const updated = [...settings];
    //     updated[index] = !updated[index];
    //     setSettings(updated);
    // };

    // const settingLabels = [
    //     'Получать уведомления о заказах',
    //     'Новинки и акции',
    //     'Новости и обновления',
    //     'Оповещения от службы поддержки',
    // ];

    return (
        <div className='profile-info'>
            <form className='profile-info_form' onSubmit={handleSubmit}>
                <h2 className='text-h1 profile-info_form-title'>Личные данные</h2>
                <div className='profile_form-group'>
                    <label htmlFor='firstName' className='profile-info_label text-n14'>Имя</label>
                    <input
                        type='text'
                        id='firstName'
                        value={firstNameInput}
                        onChange={(e) => setFirstNameInput(e.target.value)}
                        className='profile-info_input text-n16'
                    />
                </div>
                <div className='profile_form-group'>
                    <label htmlFor='lastName' className='profile-info_label text-n14'>Фамилия</label>
                    <input
                        type='text'
                        id='lastName'
                        value={lastNameInput}
                        onChange={(e) => setLastNameInput(e.target.value)}
                        className='profile-info_input text-n16'
                    />
                </div>
                <div className='profile_form-group'>
                    <label htmlFor='email' className='profile-info_label text-n14'>Почта</label>
                    <input
                        type='email'
                        id='email'
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className='profile-info_input text-n16'
                    />
                </div>
                <div className='login-form__radio'>
                    <CustomRadio
                        name='gender'
                        value='FEMALE'
                        checked={selected === 'FEMALE'}
                        onChange={setSelected}
                        label='Женщина'
                    />
                    <CustomRadio
                        name='gender'
                        value='MALE'
                        checked={selected === 'MALE'}
                        onChange={setSelected}
                        label='Мужчина'
                    />
                </div>
                <button
                    type='submit'
                    className={`text-btn profile-info_form-btn ${!isChanged ? 'profile-info_form-btn__inactive' : 'btn-black'}`}
                    disabled={!isChanged || loading}
                >
                    {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
            </form>
            {/* <div className='profile-info_stg'>
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
                                <svg width='22' height='12' viewBox='0 0 22 12' fill='none' xmlns='http://www.w3.org/2000/svg' className='profile-info_toggle-track'>
                                    <path fillRule='evenodd' clipRule='evenodd' d='M6 1.75C3.65279 1.75 1.75 3.65279 1.75 6C1.75 8.34721 3.65279 10.25 6 10.25H16C18.3472 10.25 20.25 8.34721 20.25 6C20.25 3.65279 18.3472 1.75 16 1.75H6ZM0.25 6C0.25 2.82436 2.82436 0.25 6 0.25H16C19.1756 0.25 21.75 2.82436 21.75 6C21.75 9.17564 19.1756 11.75 16 11.75H6C2.82436 11.75 0.25 9.17564 0.25 6Z' fill='black' />
                                </svg>
                            </div>
                            <span className='profile-info_stg-label text-n16'>{label}</span>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default ProfileInfo;
