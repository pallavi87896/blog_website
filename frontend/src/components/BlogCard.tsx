import React from 'react'
import avatar from '../assets/avatar.jpg'

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishDate: string,
}

const BlogCard = ({
    authorName,
    title,
    content,
    publishDate,
}: BlogCardProps) => {
    return (
        <div className="group w-full max-w-2xl py-8 border-b border-slate-100 last:border-0">
            {/* Header: Author Info */}
            <div className="flex items-center gap-3 mb-4">
                <img 
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-100" 
                    src={avatar} 
                    alt={authorName} 
                />
                <div className="flex items-center gap-2 text-xs font-bold tracking-tight">
                    <span className="text-slate-900 uppercase tracking-widest">{authorName}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 font-medium">{publishDate}</span>
                </div>
            </div>

            {/* Content: Title and Excerpt */}
            <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 leading-tight">
                    {title}
                </h2>
                <p className="text-slate-500 font-light leading-relaxed text-[16px] line-clamp-2">
                    {content.slice(0, 100) + "..."}
                </p>
            </div>

            {/* Footer: Metadata */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded">
                        {`${Math.ceil(content.length / 100)} minute read`}
                    </span>
                </div>
                
                {/* Visual Bookmark Icon (Optional Decorative Element) */}
                <div className="text-slate-200 group-hover:text-indigo-200 transition-colors">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default BlogCard