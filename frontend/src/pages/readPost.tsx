import { Link } from 'react-router-dom';
import { Share2, Bookmark, MoreHorizontal, ChevronLeft, MessageSquare, Heart } from 'lucide-react';

interface SinglePostProps {
  post?: {
    id: string;
    title: string;
    content: string;
    authorId: string;
  };
}

export const BlogReadingPage: React.FC<SinglePostProps> = ({ post }) => {
  // Placeholder data so the design is visible even without props
  const displayPost = post || {
    title: "The Art of Minimalist Storytelling",
    content: "Design is not just what it looks like and feels like. Design is how it works. When we think about the modern editorial landscape, we often overlook the power of white space. It's the silent communicator that allows the reader's mind to breathe.\n\nIn this perspective, we explore why less is consistently more in the digital age. From the way we structure our paragraphs to the deliberate choice of serif typography, every element serves a singular purpose: clarity.",
    authorId: "Sarah Jenkins"
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* TOP BAR: Minimal Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-slate-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/blogs" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium group">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Feed
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-900 transition-colors"><Share2 size={18} /></button>
            <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">P</div>
          </div>
        </div>
      </nav>

      {/* ARTICLE CONTENT */}
      <main className="max-w-screen-md mx-auto px-6 pt-32 pb-24">
        
        {/* HEADER SECTION */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
              Editorial Perspective
            </span>
            <span className="text-slate-300 text-xs">6 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.1] tracking-tight mb-8">
            {displayPost.title}
          </h1>

          {/* AUTHOR INFO */}
          <div className="flex items-center justify-between border-y border-slate-100 py-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-indigo-100">
                {displayPost.authorId.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 tracking-tight">{displayPost.authorId}</p>
                <p className="text-xs text-slate-400 font-medium">Published in Design Perspectives · Mar 2024</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><Bookmark size={20} /></button>
              <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><MoreHorizontal size={20} /></button>
            </div>
          </div>
        </header>

        {/* BODY TEXT: Optimized for Reading */}
        <article className="prose prose-slate max-w-none">
          {/* Using whitespace-pre-wrap to respect your Hono/Prisma line breaks */}
          <div className="text-xl leading-[1.8] text-slate-800 font-light whitespace-pre-wrap font-serif">
            {displayPost.content}
          </div>
        </article>

        {/* FOOTER INTERACTION */}
        <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors group">
              <Heart size={22} className="group-active:scale-125 transition-transform" />
              <span className="text-sm font-bold">1.2k</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <MessageSquare size={22} />
              <span className="text-sm font-bold">84</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Share this story</span>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">𝕏</div>
              <div className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">in</div>
            </div>
          </div>
        </footer>

      </main>

      {/* RECOMMENDED SECTION (Minimalist Cards) */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10">More from Perspective</h4>
          <div className="grid md:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video w-full bg-slate-200 rounded-3xl mb-6 overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse"></div>
                </div>
                <h5 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  The intersection of architecture and digital interfaces.
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};