'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building2 } from 'lucide-react';
import { CenterItem } from './types';

interface OurPresenceProps {
  centers: CenterItem[];
  onSelectCity?: (city: string) => void;
}

export default function OurPresenceSection({ centers, onSelectCity }: OurPresenceProps) {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  // Compute actual counts dynamically based on centers data
  const counts = React.useMemo(() => {
    let delhi = 0;
    let noida = 0;
    let greaterNoida = 0;
    let vadodara = 0;

    centers.forEach((c) => {
      const city = (c.city || '').toLowerCase();
      const displayCity = (c.displayCity || '').toLowerCase();
      const address = (c.address || '').toLowerCase();

      if (city.includes('greater noida') || displayCity.includes('greater noida') || address.includes('greater noida')) {
        greaterNoida++;
      } else if (city.includes('noida') || displayCity.includes('noida') || address.includes('noida')) {
        noida++;
      } else if (city.includes('vadodara') || displayCity.includes('vadodara') || address.includes('vadodara') || address.includes('gujarat')) {
        vadodara++;
      } else if (city.includes('delhi') || displayCity.includes('delhi') || address.includes('delhi')) {
        delhi++;
      }
    });

    // Provide default fallback counts matching the reference image and PDF if centers were empty
    return {
      delhi: delhi || 4,
      noida: noida || 4,
      greaterNoida: greaterNoida || 1,
      vadodara: vadodara || 1,
    };
  }, [centers]);

  const locationRows = [
    {
      cityKey: 'Delhi',
      name: 'Delhi',
      countText: `${counts.delhi} ${counts.delhi === 1 ? 'Center' : 'Centers'}`,
      icon: MapPin,
      pinX: 255,
      pinY: 105,
    },
    {
      cityKey: 'Noida',
      name: 'Noida',
      countText: `${counts.noida} ${counts.noida === 1 ? 'Center' : 'Centers'}`,
      icon: Building2,
      pinX: 275,
      pinY: 135,
    },
    {
      cityKey: 'Greater Noida',
      name: 'Greater Noida',
      countText: `${counts.greaterNoida} Center`,
      icon: MapPin,
      pinX: 300,
      pinY: 160,
    },
    {
      cityKey: 'Vadodara',
      name: 'Vadodara',
      countText: `${counts.vadodara} Center`,
      icon: MapPin,
      pinX: 130,
      pinY: 280,
    },
  ];

  const handleRowClick = (cityKey: string) => {
    setActiveCity(cityKey);
    if (onSelectCity) {
      onSelectCity(cityKey);
    }
    const el = document.getElementById('our-centers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#F7FAF5] py-16 sm:py-20 lg:py-24 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Stylized Regional Map / Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative w-full max-w-[480px] aspect-[4/3]">
              {/* Stylized Northern & Western India Silhouette Map */}
              <svg
                viewBox="0 0 450 350"
                className="w-full h-full drop-shadow-sm"
                fill="none"
              >
                {/* Regional Silhouette Path */}
                <path
                  d="M 120 40 
                     C 180 30, 240 20, 280 40
                     C 320 60, 360 80, 380 120
                     C 400 160, 420 180, 390 220
                     C 360 260, 330 280, 280 290
                     C 240 300, 200 320, 160 310
                     C 110 300, 80 290, 70 250
                     C 60 210, 80 180, 85 140
                     C 90 90, 80 60, 120 40 Z"
                  fill="#E6EFE2"
                  stroke="#D3E4CD"
                  strokeWidth="2"
                />

                {/* Secondary inner contour for geography depth */}
                <path
                  d="M 140 70 
                     C 200 60, 260 50, 300 70
                     C 330 90, 350 120, 360 160
                     C 370 200, 340 240, 300 260
                     C 260 270, 200 280, 160 270
                     C 120 250, 100 220, 110 170
                     C 115 120, 100 90, 140 70 Z"
                  fill="#EEF5EB"
                  stroke="#E0EBD9"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />

                {/* Connecting Network Dashed Lines */}
                <path
                  d="M 130 280 Q 200 220 255 105"
                  stroke="#63D13F"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  opacity="0.6"
                />
                <line
                  x1="255"
                  y1="105"
                  x2="275"
                  y2="135"
                  stroke="#63D13F"
                  strokeWidth="2"
                  opacity="0.5"
                />
                <line
                  x1="275"
                  y1="135"
                  x2="300"
                  y2="160"
                  stroke="#63D13F"
                  strokeWidth="2"
                  opacity="0.5"
                />
              </svg>

              {/* Interactive Node Pins */}
              {locationRows.map((loc) => {
                const isHovered = activeCity === loc.cityKey;
                return (
                  <div
                    key={loc.cityKey}
                    style={{ left: `${(loc.pinX / 450) * 100}%`, top: `${(loc.pinY / 350) * 100}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                    onClick={() => handleRowClick(loc.cityKey)}
                  >
                    {/* Pulse Ring */}
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#63D13F] opacity-30" />
                      
                      {/* Pin Button */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                          isHovered
                            ? 'bg-[#45B52D] text-white scale-125 ring-4 ring-[#63D13F]/30'
                            : 'bg-[#63D13F] text-white group-hover:scale-115'
                        }`}
                      >
                        <MapPin className="w-4 h-4 stroke-[2.5]" />
                      </div>

                      {/* City Name Label Pill */}
                      <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md bg-white/95 shadow-xs border border-zinc-200 text-[11px] font-bold text-zinc-900 whitespace-nowrap pointer-events-none">
                        {loc.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: Heading, Supporting Text, Interactive Location Rows */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="text-xs font-bold text-[#63D13F] tracking-widest uppercase mb-3 block font-heading">
              OUR PRESENCE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-zinc-950 font-heading leading-tight tracking-tight mb-4">
              Centers Across Delhi NCR and Beyond
            </h2>

            <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed max-w-xl mb-8">
              We are present across leading schools, sports complexes and partner facilities, offering structured sports training and development programmes.
            </p>

            {/* Location Rows List */}
            <div className="w-full flex flex-col gap-3">
              {locationRows.map((row) => {
                const Icon = row.icon;
                const isSelected = activeCity === row.cityKey;
                return (
                  <button
                    key={row.cityKey}
                    type="button"
                    onClick={() => handleRowClick(row.cityKey)}
                    onMouseEnter={() => setActiveCity(row.cityKey)}
                    onMouseLeave={() => setActiveCity(null)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl sm:rounded-2xl bg-white border transition-all duration-200 shadow-2xs hover:shadow-sm text-left group cursor-pointer ${
                      isSelected
                        ? 'border-[#63D13F] ring-2 ring-[#63D13F]/20'
                        : 'border-zinc-200/90 hover:border-[#63D13F]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF8EA] flex items-center justify-center text-[#45B52D] group-hover:bg-[#63D13F] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-zinc-900 tracking-tight font-heading">
                        {row.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs text-zinc-500 font-semibold tracking-tight">
                        {row.countText}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#63D13F] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
