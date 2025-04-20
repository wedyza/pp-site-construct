import React from 'react';
import './customCheckbox.scss';

interface CustomCheckboxProps {
    checked: boolean;
    onChange: () => void;
    checkboxClass: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, checkboxClass }) => {
    return (
        <div className={`custom-checkbox ${checkboxClass}`} onClick={onChange}>
            {checked ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.125 3.125V16.875H16.875V3.125H3.125ZM1.875 3C1.875 2.37868 2.37868 1.875 3 1.875H17C17.6213 1.875 18.125 2.37868 18.125 3V17C18.125 17.6213 17.6213 18.125 17 18.125H3C2.37868 18.125 1.875 17.6213 1.875 17V3Z" fill="#02040F" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6086 6.64107C14.8527 6.88514 14.8527 7.28087 14.6086 7.52495L8.77532 13.3583C8.53124 13.6024 8.13551 13.6024 7.89143 13.3583L5.39143 10.8583C5.14735 10.6142 5.14735 10.2185 5.39143 9.9744C5.63551 9.73032 6.03124 9.73032 6.27532 9.9744L8.33337 12.0325L13.7248 6.64107C13.9688 6.39699 14.3646 6.39699 14.6086 6.64107Z" fill="#02040F" />
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.125 3.125V16.875H16.875V3.125H3.125ZM1.875 3C1.875 2.37868 2.37868 1.875 3 1.875H17C17.6213 1.875 18.125 2.37868 18.125 3V17C18.125 17.6213 17.6213 18.125 17 18.125H3C2.37868 18.125 1.875 17.6213 1.875 17V3Z" fill="#02040F" />
                </svg>
            )}
        </div>
    );
};

export default CustomCheckbox;
