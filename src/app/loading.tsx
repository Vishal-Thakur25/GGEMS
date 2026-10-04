export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#050505] text-white">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-[#FFE000] border-t-transparent animate-spin" />
        <span className="text-[10px] font-black text-[#FFE000]">GG</span>
      </div>
      <p className="mt-4 text-xs font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
        LOADING ATHLETE PORTAL...
      </p>
    </div>
  );
}
