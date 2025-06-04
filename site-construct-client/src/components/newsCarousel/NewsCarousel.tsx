import React, { useState, useEffect, useRef } from 'react';
import './newsCarousel.scss';
import banner from '../../img/banner.png';

const NewsCarousel = () => {
    const banners = [banner, banner, banner, banner];
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % banners.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [banners.length]);
    useEffect(() => {
        if (carouselRef.current) {
            setOffset((carouselRef.current.offsetWidth - carouselRef.current.offsetWidth * 0.76) / 2);
            console.log(offset);
            carouselRef.current.style.paddingLeft = `${offset}px`;
            carouselRef.current.style.paddingRight = `${offset}px`;
        }
    }, [carouselRef, offset])

    useEffect(() => {
        if (carouselRef.current) {
            const bannerWidth = carouselRef.current.offsetWidth / 1.5 - 24;
            if (currentIndex === 0) {
                carouselRef.current.scrollTo({
                    left: currentIndex * bannerWidth,
                    behavior: 'smooth'
                });
            } else {
                carouselRef.current.scrollTo({
                    left: currentIndex * (bannerWidth + offset + 20),
                    behavior: 'smooth'
                });
            }
        }
    }, [currentIndex]);

    return (
        <div className="news-container">
            <div 
                className="news"
                ref={carouselRef}
            >
                {banners.map((banner, index) => (
                    <div 
                        key={index}
                        className={`news-banner ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img src={banner} alt={`Новость ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsCarousel;