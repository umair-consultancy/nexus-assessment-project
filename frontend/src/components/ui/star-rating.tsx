'use client';

import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export default function StarRating({
  rating,
  maxRating = 5,
  onRate,
  readonly = false,
  size = 'md',
  showValue = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const handleClick = (index: number) => {
    if (!readonly && onRate) {
      onRate(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const currentRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < Math.floor(currentRating);
          const isHalfFilled = index === Math.floor(currentRating) && currentRating % 1 >= 0.5;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={`${sizeStyles[size]} transition-transform hover:scale-110 ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {isFilled ? (
                <span className="text-yellow-400">★</span>
              ) : isHalfFilled ? (
                <span className="text-yellow-400 relative inline-block">
                  <span className="absolute left-0 overflow-hidden w-1/2 text-yellow-400">★</span>
                  <span className="text-gray-300">★</span>
                </span>
              ) : (
                <span className="text-gray-300">★</span>
              )}
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}