import React from 'react';

interface CenterBadgeProps {
  slug: string;
  name: string;
  className?: string;
}

export default function CenterBadge({ slug, name, className = 'w-12 h-12' }: CenterBadgeProps) {
  // Return stylized vector emblems tailored to each center matching the reference mockup
  if (slug.includes('siri-fort') || name.toLowerCase().includes('siri fort')) {
    return (
      <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#0C2340" stroke="#E5A823" strokeWidth="4" />
          <circle cx="50" cy="50" r="38" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M50 20 L58 36 L76 38 L62 50 L66 68 L50 58 L34 68 L38 50 L24 38 L42 36 Z" fill="#E5A823" />
          <circle cx="50" cy="50" r="14" fill="#63D13F" />
          <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (slug.includes('kr-mangalam') || name.toLowerCase().includes('manglam') || name.toLowerCase().includes('mangalam')) {
    return (
      <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#7A1C1C" stroke="#D4AF37" strokeWidth="4" />
          <path d="M30 30 Q50 22 70 30 L70 58 Q50 78 30 58 Z" fill="#1A365D" stroke="#D4AF37" strokeWidth="2" />
          <path d="M50 26 L50 68 M35 46 L65 46" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="43" cy="38" r="4" fill="#63D13F" />
          <circle cx="57" cy="54" r="4" fill="#D4AF37" />
        </svg>
      </div>
    );
  }

  if (slug.includes('shakti') || name.toLowerCase().includes('shakti')) {
    return (
      <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#DC2626" strokeWidth="4" />
          <circle cx="50" cy="50" r="38" fill="#DC2626" />
          <polygon points="50,22 58,38 76,40 62,53 66,71 50,62 34,71 38,53 24,40 42,38" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="10" fill="#63D13F" />
        </svg>
      </div>
    );
  }

  if (slug.includes('jaypee') || name.toLowerCase().includes('jaypee')) {
    return (
      <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#0284C7" stroke="#0369A1" strokeWidth="4" />
          <path d="M25 45 C35 30 65 30 75 45 C65 52 50 68 50 68 C50 68 35 52 25 45 Z" fill="#FFFFFF" />
          <path d="M40 48 L50 38 L60 48 L50 58 Z" fill="#63D13F" />
          <circle cx="50" cy="50" r="4" fill="#0C4A6E" />
        </svg>
      </div>
    );
  }

  if (slug.includes('gyanshree') || name.toLowerCase().includes('gyanshree')) {
    return (
      <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#15803D" stroke="#EAB308" strokeWidth="4" />
          <circle cx="50" cy="50" r="36" fill="#FFFFFF" />
          <path d="M50 25 C40 38 40 54 50 72 C60 54 60 38 50 25 Z" fill="#15803D" />
          <path d="M30 48 C44 42 56 42 70 48 C56 54 44 54 30 48 Z" fill="#EAB308" />
          <circle cx="50" cy="48" r="6" fill="#63D13F" />
        </svg>
      </div>
    );
  }

  if (slug.includes('stadium') || name.toLowerCase().includes('stadium')) {
    return (
      <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="4" />
          {/* Crossed squash rackets */}
          <ellipse cx="40" cy="40" rx="14" ry="10" transform="rotate(-35 40 40)" stroke="#FFFFFF" strokeWidth="3" fill="#63D13F" fillOpacity="0.4" />
          <line x1="48" y1="46" x2="68" y2="70" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="60" cy="40" rx="14" ry="10" transform="rotate(35 60 40)" stroke="#FFFFFF" strokeWidth="3" fill="#63D13F" fillOpacity="0.4" />
          <line x1="52" y1="46" x2="32" y2="70" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="40" r="5" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (slug.includes('prometheus') || name.toLowerCase().includes('prometheus')) {
    return (
      <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#4338CA" stroke="#F59E0B" strokeWidth="4" />
          <path d="M50 22 C55 35 68 44 68 56 C68 67 60 74 50 74 C40 74 32 67 32 56 C32 44 45 35 50 22 Z" fill="#F59E0B" />
          <path d="M50 36 C53 44 60 50 60 58 C60 64 55 68 50 68 C45 68 40 64 40 58 C40 50 47 44 50 36 Z" fill="#EF4444" />
          <circle cx="50" cy="58" r="6" fill="#63D13F" />
        </svg>
      </div>
    );
  }

  if (slug.includes('ahlcon') || name.toLowerCase().includes('ahlcon')) {
    return (
      <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#0F766E" stroke="#2DD4BF" strokeWidth="4" />
          <path d="M30 35 L50 22 L70 35 L70 60 L50 74 L30 60 Z" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2" />
          <text x="50" y="55" textAnchor="middle" fill="#0F766E" fontSize="22" fontWeight="900" fontFamily="sans-serif">A</text>
          <circle cx="50" cy="64" r="4" fill="#63D13F" />
        </svg>
      </div>
    );
  }

  if (slug.includes('ats') || name.toLowerCase().includes('ats')) {
    return (
      <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#991B1B" stroke="#FBBF24" strokeWidth="4" />
          {/* Laurel wreath around shield */}
          <path d="M32 60 C26 48 28 35 38 28 C35 34 38 42 42 46" stroke="#FBBF24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M68 60 C74 48 72 35 62 28 C65 34 62 42 58 46" stroke="#FBBF24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="50" r="16" fill="#FFFFFF" stroke="#991B1B" strokeWidth="2" />
          <text x="50" y="56" textAnchor="middle" fill="#991B1B" fontSize="14" fontWeight="bold">ATS</text>
        </svg>
      </div>
    );
  }

  // Salvation Tree School or default
  return (
    <div className={`${className} rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center p-1 overflow-hidden shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        <circle cx="50" cy="50" r="46" fill="#166534" stroke="#4ADE80" strokeWidth="4" />
        <path d="M50 25 C45 35 35 40 35 55 C35 65 42 70 50 70 C58 70 65 65 65 55 C65 40 55 35 50 25 Z" fill="#63D13F" />
        <line x1="50" y1="52" x2="50" y2="76" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
        <circle cx="50" cy="42" r="5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
