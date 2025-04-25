import React, { useRef, useState } from 'react';
import './fileUploader.scss'

interface FileUploaderProps {
    onFilesChange: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesChange }) => {
    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;
        const filesArray = Array.from(newFiles);
        const updated = [...files, ...filesArray];
        setFiles(updated);
        onFilesChange(updated);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDelete = (index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onFilesChange(updated);
    };

    return (
        <>
            <div
                className="refund-form_dropzone"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 25.333C5 26.9899 6.34315 28.333 8 28.333H24C25.6569 28.333 27 26.9899 27 25.333V22.6663C27 21.0095 25.6569 19.6663 24 19.6663H8C6.34315 19.6663 5 21.0095 5 22.6663V25.333ZM8 30.333C5.23858 30.333 3 28.0944 3 25.333V22.6663C3 19.9049 5.23858 17.6663 8 17.6663H24C26.7614 17.6663 29 19.9049 29 22.6663V25.333C29 28.0944 26.7614 30.333 24 30.333H8Z" fill="#02040F"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 11.667C3.44772 11.667 3 11.2193 3 10.667L3 8.00033C3 4.50252 5.83553 1.66699 9.33333 1.66699L22.6667 1.66699C26.1645 1.66699 29 4.50252 29 8.00033V10.667C29 11.2193 28.5523 11.667 28 11.667C27.4477 11.667 27 11.2193 27 10.667V8.00033C27 5.60709 25.0599 3.66699 22.6667 3.66699L9.33333 3.66699C6.9401 3.66699 5 5.60709 5 8.00033V10.667C5 11.2193 4.55228 11.667 4 11.667Z" fill="#02040F"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.7071 7.29289C16.3166 6.90237 15.6834 6.90237 15.2929 7.29289L11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L15 10.4142L15 18.6667C15 19.219 15.4477 19.6667 16 19.6667C16.5523 19.6667 17 19.219 17 18.6667V10.4142L19.2929 12.7071C19.6834 13.0976 20.3166 13.0976 20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L16.7071 7.29289Z" fill="#02040F"/>
                </svg>
                <p className='text-desc refund-form_dropzone-desc'>
                    Перетащите файлы сюда или нажмите кнопку, чтобы выбрать их на компьютере.
                </p>
                <button type="button" className="refund-form_upload-btn text-n14">
                    Выбрать файлы
                </button>
                <input
                    type="file"
                    multiple
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={e => handleFiles(e.target.files)}
                />
            </div>

            <div className="refund-form_file-list">
                {files.map((file, index) => (
                    <div key={index} className="text-desc refund-form_file-chip">
                        <span>{file.name}</span>
                        <button type="button" onClick={() => handleDelete(index)}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.670548 0.670272C0.890218 0.450602 1.24637 0.450602 1.46604 0.670272L5.00028 4.2045L8.53451 0.670272C8.75418 0.450602 9.11033 0.450602 9.33 0.670272C9.54967 0.889942 9.54967 1.2461 9.33 1.46577L5.79577 5L9.33 8.53423C9.54967 8.7539 9.54967 9.11006 9.33 9.32973C9.11033 9.5494 8.75418 9.5494 8.53451 9.32973L5.00028 5.7955L1.46604 9.32973C1.24637 9.5494 0.890218 9.5494 0.670548 9.32973C0.450878 9.11006 0.450879 8.7539 0.670548 8.53423L4.20478 5L0.670548 1.46577C0.450879 1.2461 0.450878 0.889942 0.670548 0.670272Z" fill="#02040F" fill-opacity="0.6"/>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FileUploader;
