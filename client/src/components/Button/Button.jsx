const buttonsTypes = {
  ['success']: 'bg-success text-white',
  ['cancel']: 'bg-cancel hover:bg-gray-200',
  ['danger']: 'bg-danger text-white',
};

export function Button({
  children,
  color,
  type,
  className = '',
  onClick = () => {},
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`${buttonsTypes[color]} w-full md:w-auto px-8 py-3 rounded-md hover:opacity-80 active:border active:border-danger focus:outline-none focus:border focus:border-danger disabled:opacity-50 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
