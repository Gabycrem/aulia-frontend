import './Input.css';

function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  id,
  required= false,
}) {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      required={required}
    />
  );
}

export default Input;