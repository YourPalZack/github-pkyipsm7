import React from 'react';

interface PlaceholderLogoProps {
  size?: number;
  className?: string;
}

const PlaceholderLogo: React.FC<PlaceholderLogoProps> = ({ size = 100, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`text-green-600 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M50 10c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6s6-2.7 6-6V16c0-3.3-2.7-6-6-6zm20 16c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6s6-2.7 6-6V32c0-3.3-2.7-6-6-6zM30 26c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6s6-2.7 6-6V32c0-3.3-2.7-6-6-6zm40 16c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6s6-2.7 6-6V48c0-3.3-2.7-6-6-6zM10 42c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6s6-2.7 6-6V48c0-3.3-2.7-6-6-6z"
      />
    </svg>
  );
};

export default PlaceholderLogo;