
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageBg?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, imageBg }) => {
  return (
    <div className={`relative ${imageBg ? 'h-64' : 'h-48'} flex items-center justify-center overflow-hidden mb-12`}>
      {imageBg && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageBg})`, filter: 'brightness(0.7)' }}
        />
      )}
      <div className={`relative z-10 text-center px-4 ${imageBg ? 'text-white' : 'text-sorbet-dark'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <div className="wave-divider"></div>
      </div>
    </div>
  );
};

export default PageHeader;
