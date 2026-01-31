import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { Search, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

export const AppBar = () => {
  const [username,setusername]=useState("User");
  useEffect(()=>{
    const storedname=localStorage.getItem("username");
    if(storedname){
      setusername(storedname.toUpperCase())
    }
  },[]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            to="/blogs"
            className="text-3xl font-serif font-bold tracking-tight"
          >
            Medium
          </Link>

          {/* SEARCH — DESKTOP ONLY */}
        
          <div className="hidden lg:flex items-center bg-gray-100 px-4 py-2 rounded-full w-[280px]">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="ml-3 bg-transparent outline-none text-sm w-full text-gray-700"
            />
          
          </div>
    
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          <Link
            to="/publish"
            className="flex items-center gap-2 text-gray-500 hover:text-black transition"
          >
            <SquarePen size={22} />
            <span className=" sm:inline text-sm font-medium">
              Write
            </span>
          </Link>

          <Avatar size="big" name={username} />
        </div>
      </div>
    </header>
  );
};
