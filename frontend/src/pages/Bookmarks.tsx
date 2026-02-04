import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBookmarks } from "../hooks";

const Bookmarks = () => {
    const { loading, bookmarks } = useBookmarks();

    // Loading State with proper centering
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFAFA]">
                <AppBar />
                <div className='flex justify-center px-6'>
                    <div className="w-full max-w-[720px] space-y-4 pt-12">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <AppBar />
            
            <main className='flex justify-center px-6 pb-20'>
                <div className="w-full max-w-[720px]">
                    
                    {/* Page Header */}
                    <header className="pt-12 pb-8 border-b border-slate-200 mb-8">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                            Your Library
                        </h1>
                        <p className="text-slate-500 text-sm mt-2">
                            {bookmarks.length} {bookmarks.length === 1 ? 'saved story' : 'saved stories'}
                        </p>
                    </header>

                    {/* Content List */}
                    <div className='space-y-2'>
                        {bookmarks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="text-slate-200 mb-4 font-serif text-6xl italic">“</div>
                                <p className='text-slate-400 font-medium'>
                                    You haven't saved any stories to your library yet.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {bookmarks.map((blog) => (
                                    <div key={blog.id} className="py-2">
                                        <BlogCard
                                            id={blog.id}
                                            authorName={blog.author.name || "anonymous"}
                                            title={blog.title}
                                            content={blog.content}
                                            publishDate={new Date(blog.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            })}
                                            likesCount={blog._count?.likes || 0}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Simple Footer */}
                    
                </div>
            </main>
        </div>
    )
}

export default Bookmarks;