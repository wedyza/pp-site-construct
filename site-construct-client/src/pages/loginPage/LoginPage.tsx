import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { createOtp, validateOtp, setEmail } from '../../store/authSlice';
import './loginPage.scss';
import LoginGallery from '../../components/loginGallery/LoginGallery';
import CodeInputForm from '../../components/codeInputForm/CodeInputForm';
import { authPages } from '../../constants';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { email, step, loading, error, token } = useSelector((state: RootState) => state.auth);

    const [currentPage, setCurrentPage] = useState(0);

    const handleGetCode = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createOtp(email));
    };

    const handleLogin = (code: string[]) => {
        dispatch(validateOtp({ email, otp: code.join('') }));
    };

    const goToPage = (direction: 'prev' | 'next') => {
        setCurrentPage((prev) =>
            direction === 'prev' ? Math.max(0, prev - 1) : Math.min(authPages.length - 1, prev + 1)
        );
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);
        
    useEffect(() => {
        document.title = `Вход | Kaufen`;

        return () => {
            document.title = 'Kaufen';
        };
    }, []);

    return (
        <div className="login-page">
            <LoginGallery
                pages={authPages}
                currentPage={currentPage}
                onPrev={() => goToPage('prev')}
                onNext={() => goToPage('next')}
            />

            <div className='login-content'>
                <h1 className='login-title text-h1'>Войдите</h1>

                {step === 'email' && (
                    <form className='login-form' onSubmit={handleGetCode}>
                        <input
                            type='email'
                            className='login-form_input text-n14'
                            placeholder='Введите почту'
                            value={email}
                            onChange={(e) => dispatch(setEmail(e.target.value))}
                            required
                            disabled={loading}
                        />
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
                    <p className='to-reg_text'>Нет аккаунта?</p>
                    <Link to='/register' className='to-reg_link'>
                        <p className='to-reg_link-text hover-def'>Создайте покупатель/продавец</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
