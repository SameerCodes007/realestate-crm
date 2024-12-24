import React, { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt = '', 
  className = '', 
  fallback = '/placeholder.jpg',
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        className={`${className} ${!loaded ? 'invisible' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default Image;