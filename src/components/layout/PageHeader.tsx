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
        <svg 
          className="absolute bottom-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path 
            className="fill-sorbet-pink"
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default PageHeader;
