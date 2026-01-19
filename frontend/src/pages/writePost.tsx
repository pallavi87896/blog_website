import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, Image as ImageIcon, Type, HelpCircle, Eye } from 'lucide-react';

interface BlogEditorProps {
  post?: {
    id: string;
    title: string;
    content: string;
  };
  isUpdate?: boolean;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ post, isUpdate = false }) => {
  // Placeholder for design preview if no post is provided
  const initialTitle = post?.title || "";
  const initialContent = post?.content || "";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100">
      
      {/* TOP BAR: Action Center */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/blogs" className="text-slate-400 hover:text-slate-900 transition-colors p-2">
              <ChevronLeft size={20} />
            </Link>
            <span className="h-4 w-px bg-slate-200"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {isUpdate ? 'Edit Story' : 'New Draft'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors px-4 py-2 text-sm font-medium">
              <Eye size={18} />
              Preview
            </button>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 active:scale-95" >
              <CheckCircle2 size={18} />
              {isUpdate ? 'Save Changes' : 'Publish Now'}
            </button>
          </div>
        </div>
      </nav>

      {/* EDITOR CANVAS */}
      <main className="max-w-screen-md mx-auto px-6 pt-32 pb-20">
        
        {/* Formatting Helper (Floating or Fixed) */}
        <div className="flex items-center gap-6 mb-12 text-slate-300 border-b border-slate-50 pb-4">
            <button className="hover:text-indigo-600 transition-colors"><Type size={20} /></button>
            <button className="hover:text-indigo-600 transition-colors"><ImageIcon size={20} /></button>
            <button className="hover:text-indigo-600 transition-colors"><HelpCircle size={20} /></button>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* TITLE INPUT: Auto-expanding style */}
          <textarea
            rows={1}
            placeholder="Title"
            defaultValue={initialTitle}
            className="w-full bg-transparent text-5xl md:text-6xl font-serif font-bold text-slate-900 outline-none placeholder:text-slate-100 resize-none leading-tight tracking-tight"
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />

          {/* ACCENT DIVIDER */}
          <div className="w-20 h-1 bg-indigo-600 rounded-full opacity-20"></div>

          {/* CONTENT INPUT: Zen writing space */}
          <textarea
            placeholder="Tell your story..."
            defaultValue={initialContent}
            className="w-full min-h-[500px] bg-transparent text-xl font-serif font-light leading-relaxed text-slate-700 outline-none placeholder:text-slate-200 resize-none"
          />

        </form>
      </main>

      {/* BOTTOM STATUS BAR */}
      <footer className="fixed bottom-0 w-full bg-slate-50/50 backdrop-blur-sm border-t border-slate-100 py-3">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex gap-6">
            <span>Words: 0</span>
            <span>Reading Time: 0 min</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
            <span>Cloud Sync Active</span>
          </div>
        </div>
      </footer>

    </div>
  );
};