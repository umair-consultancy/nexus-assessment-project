export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
  );
}

export function SkeletonText({ width = '100%', lines = 1 }: { width?: string; lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-4"
          style={{ width: i === lines - 1 && lines > 1 ? '70%' : width }}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full ${sizeStyles[size]}`} />
  );
}