import { ChevronRight } from 'lucide-react';

const pathwaySteps = [
  {
    step: '01',
    level: 'BEGINNER',
    focus: 'Grip & Ball Sense',
    description: 'Mastering continental grip, racket balance, front-court safety, and fundamental eye-tracking.',
  },
  {
    step: '02',
    level: 'FOUNDATION',
    focus: 'Kinetic Movement & T-Position',
    description: 'Dynamic footwork, lunging balance, core stability, and return to T-position after every strike.',
  },
  {
    step: '03',
    level: 'INTERMEDIATE',
    focus: 'Rally Depth & Length Control',
    description: 'Constructing back-corner length battles, boast variation, crosscourt control, and aerobic stamina.',
  },
  {
    step: '04',
    level: 'COMPETITIVE',
    focus: 'Tactical Deception & Pace',
    description: 'Match psychology, taking the ball early, volley drops, and handling high-pressure tiebreaks.',
  },
  {
    step: '05',
    level: 'ADVANCED',
    focus: 'High Performance & Nutrition',
    description: 'Tailored fitness routines, video match analytics, sports nutrition, and customized 1-on-1 coaching.',
  },
  {
    step: '06',
    level: 'NATIONAL & INTERNATIONAL',
    focus: 'Podium Contention',
    description: 'SRFI National Circuit, Asian Junior Championships, and World Junior Championship representation.',
  },
];

export default function PathwaySection() {
  return (
    <section id="pathway" className="py-24 sm:py-32 bg-white relative overflow-hidden border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#48A427] text-xs font-bold tracking-widest uppercase mb-4">
            <span>LONG-TERM ATHLETE DEVELOPMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-tight font-display">
            PLAYER DEVELOPMENT PATHWAY
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600">
            A scientifically structured system progressing athletes from their first court session
            to state, national, and international tournaments.
          </p>
        </div>

        {/* Desktop: Horizontal Step Grid */}
        <div className="hidden lg:grid grid-cols-6 gap-3 relative">
          {/* Connecting indicator line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#48A427]/20 via-[#48A427] to-[#48A427]/20 -translate-y-12 z-0" />

          {pathwaySteps.map((item, index) => (
            <div
              key={item.step}
              className="relative z-10 p-5 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between group hover:border-[#48A427] hover:-translate-y-2 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#48A427] font-display">{item.step}</span>
                  {index < pathwaySteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#48A427] transition-colors" />
                  )}
                </div>
                <h3 className="text-xs font-black text-zinc-950 uppercase tracking-wider mb-2 font-display">
                  {item.level}
                </h3>
                <p className="text-[11px] font-semibold text-[#48A427] uppercase mb-3">
                  {item.focus}
                </p>
              </div>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet: Vertical Timeline */}
        <div className="lg:hidden flex flex-col gap-4 relative">
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-[#48A427]/30" />

          {pathwaySteps.map((item) => (
            <div
              key={item.step}
              className="relative flex items-start gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-200 ml-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[#48A427] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-lg shadow-[#48A427]/20 font-display">
                {item.step}
              </div>
              <div>
                <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider font-display">
                  {item.level}
                </h3>
                <p className="text-xs font-bold text-[#48A427] uppercase mt-0.5 mb-1.5">
                  {item.focus}
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
