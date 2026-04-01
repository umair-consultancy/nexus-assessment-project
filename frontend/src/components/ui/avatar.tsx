export default function Avatar({
  src,
  alt = '',
  size = 'md',
  className = '',
}: {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl',
  };

  return (
    <div
      className={`${sizeStyles[size]} ${className} rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 overflow-hidden`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-gray-600 dark:text-gray-400">
          {alt?.charAt(0).toUpperCase() || '?'}
        </span>
      )}
    </div>
  );
}