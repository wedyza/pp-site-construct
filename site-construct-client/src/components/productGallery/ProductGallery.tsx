import React, { useEffect, useState } from 'react';
import './productGallery.scss';
import { MediaItem } from '../../store/goodsSlice';

interface ProductGalleryProps {
    images: MediaItem[] | undefined;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({images}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (images && images.length > 0) {
            setSelectedImage(images[0].source);
        } else {
            setSelectedImage(null);
        }
    }, [images]);

    if (!images || images.length === 0 || !selectedImage) return null;

    return (
        <div className='product-gallery'>
            <div className='product-gallery_list'>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className='product-gallery_img'
                        onClick={() => setSelectedImage(img.source)}
                    >
                        <img className='product-gallery_img-src' src={img.source} alt={`Gallery ${index + 1}`} />
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
