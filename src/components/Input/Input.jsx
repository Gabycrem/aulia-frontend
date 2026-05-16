import './Input.css';

function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
}) {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
}

export default Input;