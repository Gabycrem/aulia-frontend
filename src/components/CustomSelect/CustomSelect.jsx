import { useEffect, useMemo, useState } from "react";
import "./CustomSelect.css";

function CustomSelect({
  options = [],
  placeholder = "Seleccionar opción",
  value = "",
  onChange,
  className = "",
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentOption = useMemo(() => {
    return options.find((option) => String(option.value) === String(value));
  }, [options, value]);

  useEffect(() => {
    setSelectedOption(currentOption || null);
  }, [currentOption]);

  function handleSelect(option) {
    setSelectedOption(option);
    setIsOpen(false);

    if (onChange) {
      onChange(option);
    }
  }

  function handleToggle() {
    if (disabled) {
      return;
    }

    setIsOpen((currentIsOpen) => !currentIsOpen);
  }

  return (
    <div className={`custom-select ${className}`}>
      <button
        type="button"
        className="custom-select-button"
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className="custom-select-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className="custom-select-arrow">▼</span>
      </button>

      {isOpen && (
        <ul className="custom-select-options">
          {options.map((option) => (
            <li key={option.value} className="custom-select-item">
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