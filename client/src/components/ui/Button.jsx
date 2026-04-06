const baseClasses =
  'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-romantic-primary/40 disabled:cursor-not-allowed disabled:opacity-70';

const variantClasses = {
  primary:
    'bg-gradient-to-r from-romantic-primary to-romantic-secondary text-white shadow-sm hover:brightness-105',
  outline: 'border border-romantic-primary text-romantic-primary hover:bg-romantic-primary/10',
};

function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const styles = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`.trim();

  return (
    <button type={type} className={styles} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

export default Button;
