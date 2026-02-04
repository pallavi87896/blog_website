import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { Search, SquarePen, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";

type AppBarProps={
  onSearchChange?:(value:string)=>void
};

export const AppBar = ({onSearchChange}:AppBarProps) => {
  const [username,setusername]=useState("User");
  const navigate=useNavigate();

  const [open,setOpen]=useState(false);
  useEffect(()=>{
    const storedname=localStorage.getItem("username");
    if(storedname){
      setusername(storedname.toUpperCase())
    }
  },[]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/signin");
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            to="/blogs"
            className="text-3xl font-serif font-bold tracking-tight"
          >
            Inkly
          </Link>

          {/* SEARCH — DESKTOP ONLY */}
        
          <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-[280px]">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="text"
              onChange={(e)=>onSearchChange?.(e.target.value)}
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
          <Link
  to="/bookmarks"
  className="flex items-center gap-2 text-gray-500 hover:text-black transition"
>
  <Bookmark size={22} />
  <span className="text-sm font-medium">Bookmarks</span>
</Link>

          <div className="relative">
            <div onClick={()=>setOpen(prev=>!prev)} className="cursor-pointer">
          <Avatar size="big" name={username} />
          </div>
          {open && (<div className="absolute right-0 mt-2 w-36 bg-white border border-2 rounded-lg shadow-md">
            <button
  onClick={logout}
  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg"
>
  <LogOut size={16} />
  <span>Logout</span>
</button>

          </div>
        )}
          </div>
        </div>
      </div>
    </header>
  );
};
