import React from 'react';

interface GGemsLogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' is dark text for white navbar, 'dark' is white text for dark footer/hero
  size?: 'sm' | 'md' | 'lg';
}

export default function GGemsLogo({
  className = '',
  variant = 'light',
  size = 'md',
}: GGemsLogoProps) {
  const isLight = variant === 'light';

  const scale =
    size === 'sm' ? 'scale-90 origin-left' : size === 'lg' ? 'scale-110 origin-left' : '';

  return (
    <div className={`flex items-center gap-2.5 select-none ${scale} ${className}`}>
      {/* Athletic Dynamic Runner / Squash Figure in bright green */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Motion trails / swoosh */}
          <path
            d="M6 34L15 28M4 39L18 30"
            stroke="#6CD34A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Athlete head */}
          <circle cx="28" cy="10" r="4" fill="#6CD34A" />
          {/* Athlete torso & swing motion */}
          <path
            d="M26 15L22 24L30 26L36 21"
            stroke="#6CD34A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Back leg lunging */}
          <path
            d="M22 24L14 31L9 31"
            stroke="#6CD34A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Front lead leg planted */}
          <path
            d="M25 24L31 33L38 34"
            stroke="#6CD34A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Racquet & arm extension */}
          <path
            d="M30 26L39 20"
            stroke="#6CD34A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse
            cx="42"
            cy="17"
            rx="4.5"
            ry="3"
            transform="rotate(-35 42 17)"
            stroke="#6CD34A"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tighter">
          <span
            className={`font-black text-xl sm:text-2xl tracking-tight uppercase font-heading ${
              isLight ? 'text-zinc-950' : 'text-white'
            }`}
          >
            GGEMS
          </span>
        </div>
        <span
          className={`text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.24em] uppercase mt-0.5 ${
            isLight ? 'text-zinc-700' : 'text-zinc-400'
          }`}
        >
          SPORTS ACADEMY
        </span>
      </div>
    </div>
  );
}
