import React, { useRef, useState } from 'react';
import './codeInputForm.scss'

interface CodeInputFormProps {
    onSubmit: (code: string[]) => void;
}

const CodeInputForm: React.FC<CodeInputFormProps> = ({ onSubmit }) => {
    const [code, setCode] = useState(Array(6).fill(''));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(code);
    };

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <div className="login-form_code-inputs">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="login-form_code-input"
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => { inputRefs.current[index] = el }}
                    />
                ))}
            </div>
            <button type='submit' className='login-form_btn login-form_code-btn'>
                Войти
            </button>
        </form>
    );
};

export default CodeInputForm;
