import React, { useEffect, useState } from 'react';
import './catalogModal.scss';
import book from '../../img/book.svg'

interface CatalogModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CategoryData {
    [category: string]: {
        subcategories: {
            title: string;
            items: string[];
        }[];
    };
}
  
const categories: CategoryData = {
    "Электроника и гаджеты": {
        subcategories: [
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
        ],
    },

    "Одежда и обувь": { subcategories: [] },
    "Дом и сад": { subcategories: [] },
    "Здоровье": { subcategories: [] },
    "Спорт и активный отдых": { subcategories: [] },
    "Товары для животных": { subcategories: [] },
    "Детские товары": { subcategories: [] },
    "Канцтовары и книги": { subcategories: [] },
    "Товары для праздников и подарки": { subcategories: [] },
    "Игрушки и хобби": { subcategories: [] },
    "Ювелирные изделия и аксессуары": { subcategories: [] },
    "Мебель": { subcategories: [] },
    "Товары для гейминга": { subcategories: [] },
    "Канцелярия": { subcategories: [] },
};

const CatalogModal: React.FC<CatalogModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const [selectedCategory, setSelectedCategory] = useState<string>('Электроника и гаджеты');
    if (!isOpen) return null;
    const subcategories = categories[selectedCategory]?.subcategories || [];

    return (
        <div className="catalog-modal">
            <ul className='catalog-cat_list text-n16'>
                {Object.keys(categories).map((cat, index) => (
                    <li
                        key={cat}
                        className={`catalog-cat_item ${cat === selectedCategory ? 'catalog-cat_item__active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        <img src={book} alt="" className='catalog-cat_img' />
                        <span className='catalog-cat_name'>{cat}</span>
                    </li>
                ))}
            </ul>
            <div className="catalog-subcat_panel-container">
                <div className="catalog-subcat_panel">
                    {subcategories.map((subcat, index) => (
                        <div className="catalog-subcat_block" key={index}>
                            <h4 className="catalog-subcat_title text-h2">{subcat.title}</h4>
                            <ul className="catalog-subcat_list">
                                {subcat.items.map((item, i) => (
                                    <li className="catalog-subcat_item text-n16" key={i}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CatalogModal;
