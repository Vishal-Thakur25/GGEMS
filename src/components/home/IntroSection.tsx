import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';

interface IntroSectionProps {
  title?: string;
  subtitle?: string;
  content?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
}

export default function IntroSection({
  title = 'MORE THAN COACHING. WE DEVELOP ATHLETES.',
  subtitle = '20+ Years of Squash Coaching & Sports Development Experience',
  content = 'With over 20 years of experience in squash coaching and physical & health education (PHE), GGems Sports Academy focuses on developing athletes from grassroots beginner level to competitive state, national, and international championship levels.',
  ctaLabel = 'OUR TRAINING PHILOSOPHY',
  ctaUrl = '/about',
}: IntroSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-b border-zinc-200">
      {/* Background Court T-Line Vectors */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full stroke-[#48A427] stroke-[1.5] fill-none">
          <line x1="0" y1="200" x2="400" y2="200" />
          <line x1="200" y1="200" x2="200" y2="400" />
          <rect x="200" y="200" width="100" height="100" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Bold Editorial Headline & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#48A427] text-xs font-bold tracking-widest uppercase mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>THE GGEMS METHODOLOGY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 uppercase leading-[1.08] mb-6 font-display">
              {title}
            </h2>

            <p className="text-base sm:text-xl font-bold text-[#48A427] mb-6">
              {subtitle}
            </p>

            <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal mb-8">
              {content}
            </p>

            {/* Core Training Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm hover:border-emerald-300 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#48A427] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 uppercase">Technical Biomechanics</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    Grip, kinetic swing form, and precision ball control backed by WSF certifications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm hover:border-emerald-300 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#48A427] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 uppercase">Athletic Conditioning</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    Cardiovascular stamina, yoga, flexibility, and agility guided by M.Phil PE trainers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm hover:border-emerald-300 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#48A427] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 uppercase">Tactical Matchplay</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    Deception, length battles, and mental composure under high-pressure tiebreaks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm hover:border-emerald-300 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#48A427] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 uppercase">Tournament Circuit</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    Direct entry to SRFI national junior circuits, state rankings, and international opens.
                  </p>
                </div>
              </div>
            </div>

            {ctaUrl && ctaLabel && (
              <Link
                href={ctaUrl}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#48A427] text-white hover:bg-[#3B8A1D] font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-[#48A427]/20"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Right Column: Visual Showcase & Athlete Impact */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-zinc-200 shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
                alt="GGems Elite Squash Athlete"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Bottom Quote Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-black/85 backdrop-blur-md border border-white/15">
                <p className="text-xs italic text-zinc-200 leading-relaxed">
                  &ldquo;Our objective is to identify, develop and prepare talented players for state, national and international-level competitions.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <p className="text-xs font-bold text-[#48A427] uppercase tracking-wider font-display">
                      Gyanendra Prajapati
                    </p>
                    <p className="text-[10px] text-zinc-400 uppercase">
                      Founder & CEO • ASF Certified Coach
                    </p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-[#48A427] font-mono border border-emerald-800">
                    20+ YRS EXP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
