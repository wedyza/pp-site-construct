import React, { useEffect, useRef, useState } from 'react';
import './categoryPage.scss'
import HeaderCategories from '../../components/headerCategories/HeaderCategories';
import Header from '../../components/header/Header';
import DropdownSubcategory from '../../components/dropdownSubcategory/DropdownSubcategory';
import GoodsCard from '../../components/goodCard/GoodCard';
import { Good } from '../../api/api';

const goods: Good[] = [
    {
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999
    },
    {
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999
    },
    {
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999
    },
    {
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999
    },
    {
        name: 'Платье летнее для прогулок',
        description: '',
        price: 4999
    },
    {
        name: 'Пальто осеннее загадочное',
        description: '',
        price: 14999
    },
];

const subcategories = [
    {
        title: "Смартфоны и аксессуары",
        items: [
            "Смартфоны (iPhone, Samsung, Xiaomi)",
            "Чехлы и плёнки",
            "Зарядные устройства",
            "Power Bank",
            "Наушники (проводные и Bluetooth)",
        ],
        },
    {
        title: "Электроника для авто",
        items: [
            "Видеорегистраторы",
            "Автомагнитолы",
            "Парктроники",
            "Зарядки в прикуриватель",
            "Держатели для телефона",
            "GPS-навигаторы",
            "Камеры заднего вида",
            "Bluetooth-адаптеры",
            "Устройства слежения",
        ],
    },
    {
        title: "Аудио и видео техника",
        items: [
            "Колонки Bluetooth",
            "Саундбары",
            "Домашние кинотеатры",
            "Портативные плееры",
        ],
    },
    {
        title: "Носимая электроника",
        items: [
            "Умные часы (Apple Watch, Galaxy Watch)",
            "Фитнес-браслеты",
            "Часы с GPS для детей",
            "Браслеты здоровья",
            "Аксессуары для часов",
            "Зарядки для смарт-часов",
            "Часы для пожилых",
            "Спортивные часы",
            "Умные кольца",
        ],
    },
    {
        title: "Умный дом и безопасность",
        items: [
            "Умные розетки",
            "Лампочки",
            "Системы видеонаблюдения",
            "Датчики движения",
            "Умные выключатели",
            "Голосовые помощники",
            "Видеозвонки",
            "Термостаты",
            "Сигнализация",
        ],
    },
    {
        title: "Компьютеры и ноутбуки",
        items: ["Ноутбуки", "Моноблоки", "Периферия", "Аксессуары"],
    },
    {
        title: "Игровая электроника",
        items: [
            "Игровые приставки (PlayStation, Xbox, Nintendo)",
            "Геймпады и контроллеры",
            "Игровые наушники",
            "VR-очки",
            "Игровые кресла",
        ],
    },
    {
        title: "Фото и видеотехника",
        items: [
            "Цифровые фотоаппараты",
            "Экшн-камеры (GoPro и аналоги)",
            "Штативы и стабилизаторы",
            "Объективы",
            "Освещение для съёмки",
        ],
    },
    {
        title: "Портативная техника",
        items: [
            "Электронные книги",
            "Мини-проекторы",
            "Карманные принтеры",
            "Мини-кондиционеры",
            "Пылесосы",
            "Лазерные указки",
            "Увлажнители USB",
        ],
    },
];

const CategoryPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

    // const toggleSubcategory = (index: number) => {
    //     setOpenIndex(prev => (prev === index ? null : index));
    // };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                openIndex !== null &&
                containerRefs.current[openIndex] &&
                !containerRefs.current[openIndex]?.contains(event.target as Node)
            ) {
                setOpenIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openIndex]);

    return (
        <div className='page-content__no-pad'>
            <Header />
            <HeaderCategories />
            <div className="main-content">
                <div className="category-page_header">
                    <h1 className="category-header_title text-h1">Электроника и гаджеты / Смартфоны и аксессуары</h1>
                    <div className="category-header_subcats text-n14">
                        {subcategories.map((subcat, index) => (
                            <DropdownSubcategory
                                key={index}
                                title={subcat.title}
                                items={subcat.items}
                            />
                        ))}
                    </div>
                </div>
                <div className="main-content category-page_content">
                    <div className="category-page_filters">
                        {/* <div className='category-page_filter'>
                            <p className='text-h3'>
                                Сроки доставки
                            </p>
                            <ul className='category-page_filter-list'>
                                <li className='category-page_filter-item'>
                                    <label htmlFor=""></label>
                                    <input type="text" />
                                </li>
                            </ul>
                        </div> */}
                        <div className='category-page_filter'>
                            <p className='text-h3'>
                                Цена
                            </p>
                            <div className='category-page_filter-price'>
                                <input className='category-page_price-input text-n14' type="text" placeholder='от 100' />
                                <input className='category-page_price-input text-n14' type="text" placeholder='до 1000' />
                            </div>
                        </div>
                    </div>
                    <div className="category-page_products">
                        <ul className='main_goods-list category-page_products-list'>
                            {goods.map((good, index) => (
                                <li key={index} className="main_good"><GoodsCard good={good} /></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
