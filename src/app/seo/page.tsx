export default function SeoPage() {
  const seoBg = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-fixed bg-cover" style={{ backgroundImage: `url('${seoBg}')` }}>
      <div className="min-h-screen bg-black/85 backdrop-blur-md pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl font-black text-white mb-6">Elevate Your <span className="text-blue-500">Rankings</span></h1>
          <p className="text-xl text-gray-400 mb-12">Guaranteed DR 70+ & Premium Backlink Strategies</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Domain Rating', 'Backlink Audit', 'Competitor Analysis'].map((service) => (
              <div key={service} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500 transition-all group">
                <div className="w-12 h-12 bg-blue-600 rounded-lg mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service}</h3>
                <p className="text-gray-400 text-sm">Exclusive strategies to dominate search engine results globally.</p>
              </div>
            ))}
          </div>

          <button className="mt-16 px-12 py-5 bg-blue-600 text-white font-bold rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-105 transition-all">
            ORDER ON FIVERR
          </button>
        </div>
      </div>
    </main>
  );
}