const buttonsTypes = {
  ['success']: 'bg-success text-white',
  ['cancel']: 'bg-cancel hover:bg-gray-200',
};

export function Button({
  children,
  color,
  type,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`${buttonsTypes[color]} w-full md:w-auto px-8 py-3 rounded-full hover:opacity-80 active:border-2 active:border-danger focus:outline-none focus:border-2 focus:border-danger disabled:opacity-50`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
