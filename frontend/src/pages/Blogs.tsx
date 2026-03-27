import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useDebounce } from "../hooks/index";
import { useBlogs } from "../hooks/index";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
export const Blogs=()=>{
    const [search,setSearch]=useState("");
    const debouncedSearch = useDebounce(search);
    const { loading, blogs } = useBlogs(debouncedSearch);


 
        return <>
        <div className="min-h-screen bg-slate-50/30">
            <AppBar onSearchChange={setSearch}/>
            <main className="max-w-screen-xl mx-auto px-4 md:px-8 py- flex justify-center w-full">
                <div className="w-full max-w-3xl">
                    {loading?(
                        <>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    </>
                    ):blogs.length===0?(
                        <p className="text-slate-400 mt-10">No results found</p>
                    ):(
                        blogs.map((blog)=>(
                            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishDate={formatDate(blog.createdAt)}
              likesCount={blog._count?.likes || 0}
            />
                        ))
                    )}
                </div>
            </main>
        </div>
    </>
}
export function formatDate(date:string){
    return new Date(date).toLocaleDateString("en-IN",{
        day:"numeric",
        month:"long",
        year:"numeric",
    });
}
