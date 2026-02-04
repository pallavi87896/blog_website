import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#292929] selection:bg-[#FFC017]">
      {/* Dynamic Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-black ${
        isScrolled ? "bg-white py-3" : "bg-[#FCC017] py-5"
      }`}>
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 md:px-24">
          <div 
            className="text-4xl font-serif font-bold tracking-tighter cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            Inkly
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <button  onClick={() => navigate("/signin")}className="hidden md:block hover:opacity-70 transition-opacity ">Our story</button>
            <button onClick={() => navigate("/signin")} className="hover:opacity-70">Sign in</button>
            <button 
              onClick={() => navigate("/signup")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 ${
                isScrolled ? "bg-green-700 text-white shadow-md" : "bg-black text-white"
              }`}
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-[#FCC017] border-b border-black pt-40 pb-20 md:pt-52 md:pb-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-4">
            <p className="text-7xl md:text-[106px] font-serif leading-[0.9] tracking-tight text-black font-medium ">
              Stay 
            </p>
            <p className="text-7xl md:text-[106px] font-serif leading-[0.9] tracking-tight text-black font-medium">
               curious.
            </p>
            <p className="text-2xl text-[#292929]/90 font-medium leading-tight max-w-[440px]">
              Discover stories, thinking, and expertise from writers on any topic.
            </p>
            <button 
              onClick={() => navigate("/signup")}
              className="bg-black text-white text-xl px-12 py-3 rounded-full hover:bg-zinc-900 transition-all font-medium transform active:scale-95"
            >
              Start reading
            </button>
          </div>

          {/* Interactive Letter Grid */}
          <div className="hidden lg:block select-none cursor-default group">
            <div className="grid grid-cols-8 gap-x-8 gap-y-4">
              {[...Array(64)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-4xl font-serif font-bold transition-all duration-300 hover:scale-150 hover:text-indigo-600 ${
                    Math.random() > 0.6 ? 'opacity-100 text-black' : 'opacity-20 text-black'
                  }`}
                >
                  {i % 2 === 0 ? 'I' : 'n'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      

      {/* Footer */}
      <footer className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-24 flex justify-center">
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-500 font-medium">
            {["Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Terms", "Text to speech"].map(item => (
                <span key={item} className="cursor-pointer hover:text-black transition-colors underline-offset-4 hover:underline">
                  {item}
                </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};