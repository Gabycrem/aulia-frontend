import { useState } from 'react';
import './CustomSelect.css';

function CustomSelect({
    options = [],
    placeholder = 'Seleccionar opción',
    onChange,
    className = '',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };
    return (
        <div className={`custom-select ${className}`}>
            <button
                type="button"
                className="custom-select-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="custom-select-value">
                    {selectedOption
                        ? selectedOption.label
                        : placeholder}
                </span>
                <span className="custom-select-arrow">
                    ▼
                </span>
            </button>
            {isOpen && (
                <ul className="custom-select-options">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="custom-select-item"
                        >
                            <button
                                type="button"
                                className="custom-select-option"
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomSelect;