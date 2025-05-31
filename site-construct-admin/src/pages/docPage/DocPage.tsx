import './docPage.scss'
import AdminNav from '../../components/adminNav/AdminNav';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useRef } from 'react';
import { deleteDocument, fetchDocuments, uploadDocument } from '../../store/documentsSlice';
import { Document } from '../../store/documentsSlice';
import { formatDate } from '../../utils/formatDate';

const filterDocumentsByType = (documents: Document[]) => {
    return {
        platformRules: documents.filter(doc => doc.type === 'PLATFORM_RULES'),
        userReglament: documents.filter(doc => doc.type === 'USER_REGLAMENT'),
        platformPolicy: documents.filter(doc => doc.type === 'PLATFORM_POLICY')
    };
};

const DocPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, uploadLoading, error } = useAppSelector(state => state.documents);
    const fileInputRefRules = useRef<HTMLInputElement>(null);
    const fileInputRefReglament = useRef<HTMLInputElement>(null);
    const fileInputRefPolicy = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);

    const handleUploadClickRules = () => {
        fileInputRefRules.current?.click();
    };

    const handleUploadClickReglament = () => {
        fileInputRefReglament.current?.click();
    };

    const handleUploadClickPolicy = () => {
        fileInputRefPolicy.current?.click();
    };

    const handleFileChangeRules = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            dispatch(uploadDocument({ file, type: 'PLATFORM_RULES' }));
            e.target.value = '';
        }
    };

    const handleFileChangeReglament = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            dispatch(uploadDocument({ file, type: 'USER_REGLAMENT' }));
            e.target.value = '';
        }
    };

    const handleFileChangePolicy = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            dispatch(uploadDocument({ file, type: 'PLATFORM_POLICY'}));
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

    const { 
        platformRules, 
        userReglament, 
        platformPolicy 
    } = filterDocumentsByType(items);

    return (
        <div className='page-content__seller'>
            <AdminNav />
            <div className='admin-cat admin-users'>
                <div className='seller-orders_title'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 7C5.10457 7 6 6.10457 6 5C6 3.89543 5.10457 3 4 3C2.89543 3 2 3.89543 2 5C2 6.10457 2.89543 7 4 7Z" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 5L19 5" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 10.6665L10.3333 10.6665" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.9987 12.3333C15.9192 12.3333 16.6654 11.5871 16.6654 10.6667C16.6654 9.74619 15.9192 9 14.9987 9C14.0782 9 13.332 9.74619 13.332 10.6667C13.332 11.5871 14.0782 12.3333 14.9987 12.3333Z" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4 18.3333C5.10457 18.3333 6 17.4378 6 16.3333C6 15.2287 5.10457 14.3333 4 14.3333C2.89543 14.3333 2 15.2287 2 16.3333C2 17.4378 2.89543 18.3333 4 18.3333Z" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 16.3333L19 16.3333" stroke="#02040F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h1 className='text-n16'>Настройки платформы</h1>
                </div>
                <div className='doc-types'>
                    <div className='doc-container'>
                        <div className='doc-container_header'>
                            <h2 className='text-h1'>Правила платформы</h2>
                            <button 
                                className='seller-payment_add text-btn'
                                onClick={handleUploadClickRules}
                                disabled={uploadLoading}
                            >
                                Загрузить
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                                </svg>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRefRules}
                                onChange={handleFileChangeRules}
                                style={{ display: 'none' }}
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                            />
                        </div>
                        <ul className='doc-list'>
                            {platformRules.map((doc) => (
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
                    <div className='doc-container'>
                        <div className='doc-container_header'>
                            <h2 className='text-h1'>Пользовательское соглашение</h2>
                            <button 
                                className='seller-payment_add text-btn'
                                onClick={handleUploadClickReglament}
                                disabled={uploadLoading}
                            >
                                Загрузить
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                                </svg>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRefReglament}
                                onChange={handleFileChangeReglament}
                                style={{ display: 'none' }}
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                            />
                        </div>
                        <ul className='doc-list'>
                            {userReglament.map((doc) => (
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
                    <div className='doc-container'>
                        <div className='doc-container_header'>
                            <h2 className='text-h1'>Политика платформы</h2>
                            <button 
                                className='seller-payment_add text-btn'
                                onClick={handleUploadClickPolicy}
                                disabled={uploadLoading}
                            >
                                Загрузить
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58579 13.75 6.25 13.4142 6.25 13V7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H6.25V1C6.25 0.585786 6.58579 0.25 7 0.25Z" fill="#02040F"/>
                                </svg>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRefPolicy}
                                onChange={handleFileChangePolicy}
                                style={{ display: 'none' }}
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                            />
                        </div>
                        <ul className='doc-list'>
                            {platformPolicy.map((doc) => (
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
    );
};

export default DocPage;
