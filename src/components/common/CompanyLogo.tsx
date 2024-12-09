import React, { useState } from 'react';
import { LeafIcon } from 'lucide-react';

interface CompanyLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-green-100 ${className}`}>
        <LeafIcon className="w-8 h-8 text-green-600" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setHasError(true)}
    />
  );
};

export default CompanyLogo;