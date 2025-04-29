import React, { useState } from 'react';
import './registerPage.scss';
import { Link } from 'react-router-dom';
import login1 from '../../img/login1.png';
import login2 from '../../img/login2.png';
import logo from '../../img/Kaufen.svg';
import LoginGallery from '../../components/loginGallery/LoginGallery';
import CodeInputForm from '../../components/codeInputForm/CodeInputForm';
import CustomRadio from '../../components/customRadio/CustomRadio';

const pages = [
    {
        text: 'Покупай с лёгкостью. Живи с удовольствием.',
        image: login1,
    },
    {
        text: 'Честные отзывы, честные цены, честные покупки',
        image: login2,
    },
];

const RegisterPage: React.FC = () => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(0);
    const [isCodeStep, setIsCodeStep] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const goToPage = (direction: 'prev' | 'next') => {
        setCurrentPage((prev) =>
            direction === 'prev' ? Math.max(0, prev - 1) : Math.min(pages.length - 1, prev + 1)
        );
    };

    const handleGetCode = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Запрашиваем код для:', email);
        setIsCodeStep(true);
    };

    const handleLogin = (code: string[]) => {
        console.log('Пытаемся войти с кодом:', { email, code: code.join('') });
    };

    return (
        <div className="login-page">
            <LoginGallery
                pages={pages}
                currentPage={currentPage}
                onPrev={() => goToPage('prev')}
                onNext={() => goToPage('next')}
            />

            <div className='login-content'>
                <h1 className='login-title'>Создайте аккаунт</h1>
                {!isCodeStep ? (
                    <form className='login-form' onSubmit={handleGetCode}>
                        <input
                            type='text'
                            className='login-form_input'
                            placeholder='Ваше имя'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type='email'
                            className='login-form_input'
                            placeholder='Почта'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="login-form__radio">
                            <CustomRadio
                                name=""
                                value="female"
                                checked={selected === 'female'}
                                onChange={setSelected}
                                label="Женщина"
                            />
                            <CustomRadio
                                name=""
                                value="male"
                                checked={selected === 'male'}
                                onChange={setSelected}
                                label="Мужчина"
                                />
                            </div>
                        <button type='submit' className='login-form_btn'>
                            Получить код
                        </button>
                    </form>
                ) : (
                    <CodeInputForm onSubmit={handleLogin} />
                )}

                <div className='to-reg'>
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
