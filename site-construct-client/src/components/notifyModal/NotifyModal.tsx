import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './notifyModal.scss';
import Modal from '../modal/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchNotifications } from '../../store/notificationsSlice';
import { formatDate } from '../../utils/formatDate';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const NotifyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();    
    
    const { items, loading, error } = useAppSelector(state => state.notifications);
    
    useEffect(() => {
        if (isOpen) {
            dispatch(fetchNotifications());
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, dispatch]);

    return (        
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="profile_notify-modal"
        >
            <h2 className='text-h2'>Уведомления</h2>
            <button className='notify-modal_exit modal_exit-btn' onClick={onClose}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.227072 0.22703C0.519965 -0.0658633 0.994839 -0.0658636 1.28773 0.22703L6.00004 4.93934L10.7124 0.22703C11.0052 -0.0658633 11.4801 -0.0658637 11.773 0.22703C12.0659 0.519923 12.0659 0.994797 11.773 1.28769L7.0607 6L11.773 10.7123C12.0659 11.0052 12.0659 11.4801 11.773 11.773C11.4801 12.0659 11.0052 12.0659 10.7124 11.773L6.00004 7.06066L1.28773 11.773C0.994839 12.0659 0.519965 12.0659 0.227072 11.773C-0.0658213 11.4801 -0.0658213 11.0052 0.227072 10.7123L4.93938 6L0.227072 1.28769C-0.0658213 0.994797 -0.0658213 0.519923 0.227072 0.22703Z" fill="#02040F"/>
                </svg>
            </button>
            <ul className='notify-modal_list'>
                {items.map((item) => (
                    <li className='notify-modal_list-item'>
                        <div className="notify-item_img"></div>
                        <p className="notify-item_text text-n16">
                            {item.body}
                        </p>
                        <p className="notify-item_date text-n14">
                            {formatDate(item.created_at)}
                        </p>
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default NotifyModal;
