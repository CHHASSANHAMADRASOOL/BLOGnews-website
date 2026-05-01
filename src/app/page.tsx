import Link from 'next/link';
import Navbar from '@/components/Navbar';
export default function HomePage() {
  // VIP Cinematic Background Image
  const homeBg = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

  return (
    
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Parallax Effect */}
    <Navbar />
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: `url('${homeBg}')`,
          filter: 'brightness(0.4)' 
        }}
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black via-transparent to-blue-900/20" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-6">
        
        {/* Hero Section */}
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h2 className="text-blue-400 font-mono tracking-[0.5em] text-sm md:text-base mb-4 uppercase">
            Digital Excellence & Nature Secrets
          </h2>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-6">
            Blog<span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.6)]">News</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
            Providing high-end <span className="text-white font-semibold underline decoration-blue-500">SEO Services</span>, 
            exclusive web development, and exploring the <span className="text-green-400 font-semibold">Wild Wonders</span> of the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <Link href="/blog">
              <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(37,99,235,0.4)]">
                EXPLORE VIP FEED
              </button>
            </Link>
            
            <Link href="/seo">
              <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-full font-bold transition-all">
                OUR SERVICES
              </button>
            </Link>
          </div>
        </div>

        {/* Floating Stats or Features */}
        <div className="absolute bottom-10 w-full max-w-5xl hidden md:grid grid-cols-3 gap-4 px-10 opacity-60">
          <div className="border-l border-blue-500 pl-4">
            <p className="text-white font-bold">DR 70+</p>
            <p className="text-gray-400 text-xs uppercase">Guaranteed SEO</p>
          </div>
          <div className="border-l border-green-500 pl-4">
            <p className="text-white font-bold">WILD WONDERS</p>
            <p className="text-gray-400 text-xs uppercase">Nature Channel</p>
          </div>
          <div className="border-l border-purple-500 pl-4">
            <p className="text-white font-bold">NEXT.JS & TSX</p>
            <p className="text-gray-400 text-xs uppercase">Modern Stack</p>
          </div>
        </div>
      </div>
    </main>
  );
}