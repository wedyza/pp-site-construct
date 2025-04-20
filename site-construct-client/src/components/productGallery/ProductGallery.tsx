import React, { useState } from 'react';
import './productGallery.scss';
import img1 from '../../img/Frame 7615.jpg';
import img2 from '../../img/Frame 7616.jpg';
import img3 from '../../img/Frame 7617.jpg';
import img4 from '../../img/Frame 7618.jpg';

const images = [img1, img2, img3, img4];

const ProductGallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string>(images[0]);

    return (
        <div className='product-gallery'>
            <div className='product-gallery_list'>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className='product-gallery_img'
                        onClick={() => setSelectedImage(img)}
                    >
                        <img className='product-gallery_img-src' src={img} alt={`Gallery ${index + 1}`} />
                    </div>
                ))}
            </div>

            <div className='product-gallery_main'>
                <img className='product-gallery_main-img' src={selectedImage} alt='Selected' />
            </div>
        </div>
    );
};

export default ProductGallery;
