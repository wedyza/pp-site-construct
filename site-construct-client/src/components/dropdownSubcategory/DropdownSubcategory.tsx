import React, { useState, useRef, useEffect } from 'react';
import './dropdownSubcategory.scss';
import { useNavigate } from 'react-router-dom';

interface DropdownSubcategoryProps {
    title: string;
    items: { id: number; title: string }[];
    id: number;
}

const DropdownSubcategory: React.FC<DropdownSubcategoryProps> = ({ title, items, id }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleClick = (id: number) => {
        navigate(`/category/${id}`);
    };

    const handleMouseEnter = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(false);
        }, 100);
    };

    useEffect(() => {
        return () => {
            if (hoverTimeout.current) {
                clearTimeout(hoverTimeout.current);
            }
        };
    }, []);

    return (
        <div
            className="dropdown-subcategory"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="dropdown-title">
                <span className="dropdown-title_text hover2" onClick={() => handleClick(id)}>{title}</span>
                <svg className='dropdown-title_arrow' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.646447 0.146446C0.841709 -0.0488157 1.15829 -0.0488157 1.35355 0.146446L5 3.79289L8.64645 0.146446C8.84171 -0.0488157 9.15829 -0.0488157 9.35355 0.146446C9.54882 0.341709 9.54882 0.658291 9.35355 0.853553L5.35355 4.85355C5.15829 5.04882 4.84171 5.04882 4.64645 4.85355L0.646447 0.853553C0.451184 0.658291 0.451184 0.341709 0.646447 0.146446Z" fill="#02040F"/>
                </svg>
            </button>
            {isHovered && (
                <ul className="dropdown-list">
                    {items.map((item, idx) => (
                        <li key={idx} className="dropdown-item" onClick={() => handleClick(item.id)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownSubcategory;
