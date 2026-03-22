import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

const TOPICS = [
  "Programming", "Self-Improvement", "Design", "Writing",
  "Technology", "Science", "Culture", "Finance",
  "Philosophy", "Health", "History", "Fiction",
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#FAFAF8] text-[#1a1a1a] selection:bg-[#FFC017]"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .blog-font  { font-family: 'Lora', Georgia, serif; }
        .ui-font    { font-family: 'DM Sans', sans-serif; }

        .reveal { opacity: 0; transform: translateY(22px); animation: up 0.7s ease forwards; }
        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.18s; }
        .d3 { animation-delay: 0.30s; }
        .d4 { animation-delay: 0.42s; }
        .d5 { animation-delay: 0.54s; }
        @keyframes up { to { opacity:1; transform:translateY(0); } }

        .nav-bar {
          transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        .ink-word {
          display: inline-block;
          overflow: hidden;
        }
        .ink-word span {
          display: block;
          animation: slideUp 0.9s cubic-bezier(.16,1,.3,1) forwards;
          opacity: 0;
          transform: translateY(110%);
        }
        @keyframes slideUp {
          to { opacity:1; transform:translateY(0); }
        }
        .iw1 span { animation-delay: 0.0s; }
        .iw2 span { animation-delay: 0.12s; }
        .iw3 span { animation-delay: 0.24s; }
      `}</style>

      {/* NAVBAR */}
      <nav
        className={`nav-bar fixed top-0 w-full z-50 border-b border-[#1a1a1a] ${
          scrolled ? "bg-white shadow-sm py-3" : "bg-[#FFC017] py-4"
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-16">
          <div
            className="blog-font text-3xl font-bold tracking-tight cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Inkly
          </div>
          <div className="flex items-center gap-5 ui-font text-sm font-medium">
            <button
              onClick={() => navigate("/signin")}
              className="hidden md:inline text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              Our story
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 rounded-full font-semibold text-sm bg-[#1a1a1a] text-white hover:bg-zinc-800 transition-all duration-300"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header
        ref={heroRef}
        className="bg-[#FFC017] border-b border-[#1a1a1a] pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-0">
            <div className="flex-1">
              <div className="blog-font font-bold text-[#1a1a1a] leading-[0.92] tracking-[-0.02em]">
                <div className="ink-word iw1">
                  <span className="text-[clamp(72px,11vw,148px)]">Human</span>
                </div>
                <div className="ink-word iw2">
                  <span className="text-[clamp(72px,11vw,148px)]">stories</span>
                </div>
                <div className="ink-word iw3 flex items-end gap-4">
                  <span className="text-[clamp(72px,11vw,148px)]">&amp; ideas.</span>
                </div>
              </div>
              <p className="reveal d3 ui-font mt-8 text-lg md:text-xl text-[#1a1a1a]/75 max-w-[440px] leading-relaxed font-normal">
                A place to read, write, and deepen your understanding of the world.
              </p>
              <div className="reveal d4 flex items-center gap-4 mt-10">
                <button
                  onClick={() => navigate("/signup")}
                  className="ui-font bg-[#1a1a1a] text-white text-base font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-800 active:scale-95 transition-all inline-flex items-center gap-2 group"
                >
                  Start reading
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Decorative text mosaic */}
            <div className="hidden lg:flex flex-col items-end gap-1 select-none opacity-30 reveal d5">
              {["WRITE", "READ", "THINK", "SHARE", "GROW", "INKLY"].map((word, r) => (
                <div key={r} className="flex gap-3">
                  {word.split("").map((ch, c) => (
                    <span
                      key={c}
                      className="blog-font text-3xl font-bold text-[#1a1a1a]"
                      style={{ opacity: (r + c) % 3 === 0 ? 1 : 0.25 }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="bg-[#1a1a1a] text-[#FFC017] border-b border-[#1a1a1a] py-3 overflow-hidden">
        <div className="marquee-track ui-font text-sm font-semibold tracking-widest uppercase">
          {[...TOPICS, ...TOPICS].map((t, i) => (
            <span key={i} className="mx-6 whitespace-nowrap">
              {t} <span className="mx-4 opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* WRITER CTA */}
      <section className="bg-[#1a1a1a] border-t border-[#1a1a1a]">
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="ui-font text-[10px] font-bold tracking-[0.2em] uppercase text-[#FFC017] mb-4">
              For writers
            </p>
            <h2 className="blog-font text-3xl md:text-5xl font-bold text-white leading-[1.15] max-w-lg">
              Everyone has a story worth telling.
            </h2>
            <p className="ui-font mt-4 text-[#FAFAF8]/60 text-base max-w-md leading-relaxed">
              Write to a built-in audience of curious readers. No SEO tricks, no ads — just your ideas, heard.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/signup")}
              className="ui-font bg-[#FFC017] text-[#1a1a1a] font-bold text-base px-8 py-4 rounded-full hover:bg-yellow-300 active:scale-95 transition-all inline-flex items-center gap-2 group"
            >
              <Zap size={16} />
              Start writing today
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FAFAF8] border-t border-[#E8E4DC] py-12">
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="blog-font text-xl font-bold text-[#1a1a1a]">Inkly</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 ui-font text-sm text-[#8A8070] font-medium">
            {["Help", "Status", "About", "Careers", "Press", "Privacy", "Terms"].map(item => (
              <span key={item} className="cursor-pointer hover:text-[#1a1a1a] transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};