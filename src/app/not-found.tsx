import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="text-center max-w-md p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#FFE000]/10 border border-[#FFE000]/30 flex items-center justify-center text-[#FFE000] font-black text-2xl mx-auto mb-6">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
          Court Not Found
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
          The page or coaching asset you are looking for has been moved, archived, or does not exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFE000] hover:bg-[#E6CA00] text-black font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Academy Home</span>
          </Link>
          <Link
            href="/programs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Browse Programs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
