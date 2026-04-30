export default function WildWondersPage() {
  const natureBg = "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1975&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-fixed bg-cover" style={{ backgroundImage: `url('${natureBg}')` }}>
      <div className="min-h-screen bg-emerald-950/80 backdrop-blur-sm pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-green-400 font-mono tracking-widest mb-2">YOUTUBE CHANNEL</h2>
              <h1 className="text-6xl font-bold text-white mb-6">Wild <span className="italic text-emerald-300">Wonders</span></h1>
              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                Exploring the world's most mysterious nature and wildlife secrets. Join our international community of explorers.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <p className="text-2xl font-bold text-white">50K+</p>
                  <p className="text-xs text-gray-400">Subscribers</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <p className="text-2xl font-bold text-white">1M+</p>
                  <p className="text-xs text-gray-400">Monthly Views</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full aspect-video bg-black/40 rounded-3xl border-4 border-emerald-500/30 flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1874" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="Nature" />
              <div className="relative z-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}