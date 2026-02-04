import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/index";
import { useEffect, useState } from "react";
export const Blogs=()=>{
    const [search,setSearch]=useState("");
    const debouncedSearch = useDebounce(search);
const { loading, blogs } = useBlogs(debouncedSearch);


    if(loading){
        return <div>
            <AppBar onSearchChange={setSearch}/>
            <div className="flex justify-center">
                <div>
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
                            <BlogCard key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "anonymous"}
                title={blog.title}
                content={blog.content}
                publishDate={formatDate(blog.createdAt)}
                likesCount={blog._count.likes}
                />
                        ))
                    )}
                </div>
            </div>
        </div>
    }
    return <div>
        <AppBar onSearchChange={setSearch}/>
        <div className="flex justify-center">
            <div>
                {blogs.map(blog=><BlogCard
                key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name||"anonymous"}
                    title={blog.title}
                    content={blog.content}
                    
                    publishDate={formatDate(blog.createdAt)}
                    likesCount={blog._count.likes}/>
                )}
            </div>
        </div>
    </div>
}
export function formatDate(date:string){
    return new Date(date).toLocaleDateString("en-IN",{
        day:"numeric",
        month:"long",
        year:"numeric"
    });
}
function useDebounce(value:string,delay=400){
    const [debounced,setDebounced]=useState(value);
    useEffect(()=>{
        const id=setTimeout(()=>setDebounced(value),delay);
        return()=>clearTimeout(id);
    },[value,delay]);
    return debounced
}