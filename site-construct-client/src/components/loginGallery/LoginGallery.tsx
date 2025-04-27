import React from 'react';
import logo from '../../img/Kaufen.svg';
import './loginGallery.scss'

interface Page {
    text: string;
    image: string;
}

interface LoginGalleryProps {
    pages: Page[];
    currentPage: number;
    onPrev: () => void;
    onNext: () => void;
}

const LoginGallery: React.FC<LoginGalleryProps> = ({ pages, currentPage, onPrev, onNext }) => {
    const isFirst = currentPage === 0;
    const isLast = currentPage === pages.length - 1;

    return (
        <div className='login-gallery'>
            <div className="login-gallery_controls">
                <button
                    className={`login-gallery_arrow ${isFirst ? 'login-gallery_arrow__disabled' : ''}`}
                    onClick={onPrev}
                    disabled={isFirst}
                >
                    {/* стрелка влево */}
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.7657 11.2278C21.0781 11.5315 21.0781 12.024 20.7657 12.3277L14.9314 18L20.7657 23.6723C21.0781 23.976 21.0781 24.4685 20.7657 24.7722C20.4533 25.0759 19.9467 25.0759 19.6343 24.7722L13.2343 18.55C12.9219 18.2462 12.9219 17.7538 13.2343 17.45L19.6343 11.2278C19.9467 10.9241 20.4533 10.9241 20.7657 11.2278Z" fill="#02040F" fillOpacity="0.6"/>
                    </svg>
                </button>
                <span className="login-gallery_counter">
                    {currentPage + 1} / {pages.length}
                </span>
                <button
                    className={`login-gallery_arrow ${isLast ? 'login-gallery_arrow__disabled' : ''}`}
                    onClick={onNext}
                    disabled={isLast}
                >
                    {/* стрелка вправо */}
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.2343 11.2278C14.9219 11.5315 14.9219 12.024 15.2343 12.3277L21.0686 18L15.2343 23.6723C14.9219 23.976 14.9219 24.4685 15.2343 24.7722C15.5467 25.0759 16.0533 25.0759 16.3657 24.7722L22.7657 18.55C23.0781 18.2462 23.0781 17.7538 22.7657 17.45L16.3657 11.2278C16.0533 10.9241 15.5467 10.9241 15.2343 11.2278Z" fill="#02040F" fillOpacity="0.6"/>
                    </svg>
                </button>
            </div>

            <div className="login-gallery_content">
                <div className="login-gallery_text">
                    <img src={logo} className='header_logo' alt="KAUFEN" />
                    <p>{pages[currentPage].text}</p>
                </div>
                <img className='login-gallery_img' src={pages[currentPage].image} alt="" />
            </div>
        </div>
    );
};

export default LoginGallery;
