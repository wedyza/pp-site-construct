import React, { useEffect, useState } from 'react';
import './registerPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import LoginGallery from '../../components/loginGallery/LoginGallery';
import CodeInputForm from '../../components/codeInputForm/CodeInputForm';
import CustomRadio from '../../components/customRadio/CustomRadio';
import { useAppDispatch } from '../../store/hooks';
import { registerUser, setEmail, validateOtp } from '../../store/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { authPages } from '../../constants';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { email, step, loading, error, token } = useSelector((state: RootState) => state.auth);
    const [selected, setSelected] = useState<'MALE' | 'FEMALE' | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(0);
    const [emailInput, setEmailInput] = useState('');
    const [name, setName] = useState('');

    const goToPage = (direction: 'prev' | 'next') => {
        setCurrentPage((prev) =>
            direction === 'prev' ? Math.max(0, prev - 1) : Math.min(authPages.length - 1, prev + 1)
        );
    };

    const handleGetCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) return;
        try {
            await dispatch(registerUser({ email: emailInput, name, sex: selected })).unwrap();
            dispatch(setEmail(emailInput));
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };
    
    const handleLogin = (code: string[]) => {
        dispatch(validateOtp({ email, otp: code.join('') }));
    };
    
    useEffect(() => {
        if (token) navigate('/');
    }, [token]);

    return (
        <div className="login-page">
            <LoginGallery
                pages={authPages}
                currentPage={currentPage}
                onPrev={() => goToPage('prev')}
                onNext={() => goToPage('next')}
            />

            <div className='login-content'>
                <h1 className='login-title text-h1'>Создайте аккаунт</h1>
                {step === 'email' && (
                    <form className='login-form' onSubmit={handleGetCode}>
                        <input
                            type='text'
                            className='login-form_input text-n14'
                            placeholder='Ваше имя'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type='email'
                            className='login-form_input text-n14'
                            placeholder='Почта'
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            required
                        />
                        <div className="login-form__radio">
                            <CustomRadio
                                name=""
                                value="FEMALE"
                                checked={selected === 'FEMALE'}
                                onChange={setSelected}
                                label="Женщина"
                            />
                            <CustomRadio
                                name=""
                                value="MALE"
                                checked={selected === 'MALE'}
                                onChange={setSelected}
                                label="Мужчина"
                                />
                            </div>
                        <button type='submit' className='text-btn login-form_btn btn-black' disabled={loading}>
                            {loading ? 'Отправляем код...' : 'Получить код'}
                        </button>
                        {error && <div className="error">{error}</div>}
                    </form>
                )}

                {step === 'otp' && (
                    <>
                        <CodeInputForm onSubmit={handleLogin} />
                        {loading && <p className="loading-text">Проверяем код...</p>}
                        {error && <div className="error">{error}</div>}
                    </>
                )}

                <div className='to-reg text-n16'>
                    <p className='to-reg_text'>
                        Уже есть аккаунт?
                    </p>
                    <Link to='/login' className='to-reg_link'>
                        <p className='to-reg_link-text'>Войдите!</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
