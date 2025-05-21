import React, { useRef } from 'react';
import { updateUserAvatar } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './avatarUploader.scss'

const AvatarUploader: React.FC = () => {
    const dispatch = useAppDispatch();
    const avatar = useAppSelector((state) => state.user.avatar);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            dispatch(updateUserAvatar(file));
        }
    };

    return (
        <div className='profile-nav_avatar' onClick={handleClick} style={{ cursor: 'pointer' }}>
            {avatar ? (
                <img src={avatar} alt='Аватар' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
                <div />
            )}
            <input
                type='file'
                ref={inputRef}
                style={{ display: 'none' }}
                accept='image/*'
                onChange={handleFileChange}
            />
        </div>
    );
};

export default AvatarUploader;
