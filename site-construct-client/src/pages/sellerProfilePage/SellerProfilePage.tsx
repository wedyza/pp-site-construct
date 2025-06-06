import React, { useEffect, useRef, useState } from 'react';
import './sellerProfilePage.scss'
import SellerNav from '../../components/sellerNav/SellerNav';
import ProfileInfo from '../../components/profileInfo/ProfileInfo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPaymentMethod, fetchPaymentMethods } from '../../store/paymentMethodsSlice';
import Modal from '../../components/modal/Modal';
import { deleteDocument, fetchDocuments, uploadDocument } from '../../store/documentsSlice';
import { formatDate } from '../../utils/formatDate';
import { Document } from '../../store/documentsSlice';

const SellerProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items: methods/*, loading*/ } = useAppSelector((state) => state.paymentMethods);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [cardBody, setCardBody] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cardCvv, setCardCvv] = useState('');

    useEffect(() => {
        dispatch(fetchPaymentMethods());
    }, [dispatch]);

    function convertDate(mmgg: string): string {
        if (!/^\d{1,2}\/\d{2}$/.test(mmgg)) {
            throw new Error('Неправильный формат даты. Ожидается мм/гг');
        }
        const [month, yearSuffix] = mmgg.split('/');
        const monthNum = parseInt(month, 10);
        if (monthNum < 1 || monthNum > 12) {
            throw new Error('Месяц должен быть между 01 и 12');
        }
        return `20${yearSuffix}-${month.padStart(2, '0')}-01`;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(
            addPaymentMethod({
                card_body: cardBody.replace(/\s/g, ''),
                card_expire_date: convertDate(cardDate),
                card_cvv_code: cardCvv,
            })
        ).then(() => {
            setIsModalOpen(false);
            setCardBody('');
            setCardDate('');
            setCardCvv('');
        });
    };

    const handleCardBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.slice(0, 16);
        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardBody(formatted);
    };

    const handleCardDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.slice(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        setCardDate(value);
    };

    
    const { items, loading, uploadLoading, error } = useAppSelector(state => state.documents);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            dispatch(uploadDocument({ file, type: 'OTHER' }));
            e.target.value = '';
        }
    };

    const getDocumentTitle = (source: string) => {
        const withoutParams = source.split('?')[0];
        const filename = withoutParams.split('/').pop();
        return filename || 'Документ';
    };

    const handleDownload = (docItem: Document) => {
        const link = document.createElement('a');
        link.href = docItem.source;
        const fileName = getDocumentTitle(docItem.source);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='page-content__seller'>
            <SellerNav />
            <div className='seller-orders'>
                <div className='text-h3 seller-orders_title'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#02040F" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.3513 8.66291L15.4366 6.45408L16.666 5.00008L14.9993 3.33341L13.5533 4.56921L11.2975 3.64153L10.7788 1.66675H9.15017L8.62358 3.66769L6.41969 4.59672L4.99935 3.33341L3.33268 5.00008L4.54382 6.49079L3.6431 8.70536L1.66602 9.16675V10.8334L3.66694 11.3797L4.59581 13.5832L3.33268 15.0001L4.99935 16.6667L6.49198 15.4503L8.66353 16.3437L9.16602 18.3334H10.8327L11.3365 16.3444L13.5453 15.4297C13.9134 15.6928 14.9993 16.6667 14.9993 16.6667L16.666 15.0001L15.4293 13.5413L16.3442 11.3318L18.3326 10.8144L18.3327 9.16675L16.3513 8.66291Z" stroke="#02040F" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h1>Настройки пользователя</h1>
                </div>
                <div className='seller-profile'>
                    <ProfileInfo />
                    <div className="seller-profile_column">
                        <div className='seller-payment profile-info_stg'>
                            <div className='seller-payment_header'>
                                <h2 className='text-h1'>Счет</h2>
                                <button className='seller-payment_add text-btn' onClick={() => setIsModalOpen(true)}>
                                    Привязать счет
                                </button>
                            </div>
                            <ul className='seller-payment_list'>
                                {methods.map((method) => (
                                    <li className='seller-payment_item'>
                                        <button className='seller-payment_delete'>
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.151382 0.151353C0.346643 -0.0439091 0.663226 -0.0439093 0.858488 0.151353L4.00003 3.29289L7.14157 0.151353C7.33683 -0.0439091 7.65341 -0.0439095 7.84868 0.151353C8.04394 0.346615 8.04394 0.663198 7.84868 0.85846L4.70714 4L7.84868 7.14154C8.04394 7.3368 8.04394 7.65339 7.84868 7.84865C7.65341 8.04391 7.33683 8.04391 7.14157 7.84865L4.00003 4.70711L0.858488 7.84865C0.663226 8.04391 0.346643 8.04391 0.151382 7.84865C-0.0438808 7.65338 -0.0438806 7.3368 0.151382 7.14154L3.29292 4L0.151382 0.85846C-0.0438806 0.663197 -0.0438808 0.346615 0.151382 0.151353Z" fill="#FEFEFE"/>
                                            </svg>
                                        </button>
                                        <p className='seller-payment_bank text-h1'>
                                            SberPay
                                        </p>
                                        <p className='seller-payment_num text-h1'>
                                            {`...${method.card_body.slice(-4)}`}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='profile-info_stg seller-profile_docs'>
                            <div className='seller-payment_header'>
                                <h2 className='text-h1'>Документы</h2>
                                <button 
                                    className='seller-payment_add text-btn'
                                    onClick={handleUploadClick}
                                    disabled={uploadLoading}
                                >
                                    Загрузить
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                                    </svg>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                                />
                            </div>
                            <ul className='seller-profile_docs-list'>
                                {items.map((doc) => (
                                    <li key={doc.id} className="seller-profile_docs-item">
                                        <div className="seller-profile_doc-img">
                                            
                                        </div>
                                        <div className="seller-profile_doc-text">
                                            <button 
                                                className="seller-profile_doc-name text-n16"
                                                onClick={() => handleDownload(doc)}
                                            >
                                                {getDocumentTitle(doc.source)}
                                            </button>
                                            <p className="seller-profile_doc-date text-n11">
                                                Дата загрузки: {formatDate(doc.created_at)}
                                            </p>
                                        </div>
                                        <button 
                                            className="seller-profile_doc-delete"
                                            onClick={() => dispatch(deleteDocument(doc.id))}
                                            disabled={uploadLoading}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.226095 0.22703C0.518988 -0.0658633 0.993862 -0.0658636 1.28676 0.22703L5.99907 4.93934L10.7114 0.22703C11.0043 -0.0658633 11.4791 -0.0658637 11.772 0.22703C12.0649 0.519923 12.0649 0.994797 11.772 1.28769L7.05973 6L11.772 10.7123C12.0649 11.0052 12.0649 11.4801 11.772 11.773C11.4791 12.0659 11.0043 12.0659 10.7114 11.773L5.99907 7.06066L1.28676 11.773C0.993862 12.0659 0.518988 12.0659 0.226095 11.773C-0.0667979 11.4801 -0.0667978 11.0052 0.226095 10.7123L4.93841 6L0.226095 1.28769C-0.0667978 0.994797 -0.0667979 0.519923 0.226095 0.22703Z" fill="#02040F"/>
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="payment-modal">
                <h2 className='text-h2'>Привязать карту</h2>
                <form className='payment-modal_form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className='payment-modal_input payment-modal_number text-n14'
                        placeholder='Номер карты'
                        value={cardBody}
                        onChange={handleCardBodyChange}
                        required
                    />
                    <input
                        type="text"
                        className='payment-modal_input payment-modal_date text-n14'
                        placeholder='ММ/ГГ'
                        value={cardDate}
                        onChange={handleCardDateChange}
                        required
                    />
                    <input
                        type="text"
                        className='payment-modal_input payment-modal_cvv text-n14'
                        placeholder='CVV'
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        required
                    />
                    <button className='payment-modal_form-btn text-btn btn-black'>Привязать</button>
                </form>
            </Modal>
        </div>
    );
};

export default SellerProfilePage;
