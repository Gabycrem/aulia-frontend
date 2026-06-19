import './Input.css';

function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  name,
  id,
  required = false,
  disabled = false,
  readOnly = false,
  className = '',
}) {
  return (
    <input
      className={`input ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      name={name}
      id={id}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}

export default Input;