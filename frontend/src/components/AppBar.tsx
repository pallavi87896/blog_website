import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { Search, SquarePen, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";


//navigate-used for logic event like traveling from page to page
//links-used when navigation is triggered by ui element like bttond navbar menu
type AppBarProps={
  onSearchChange?:(value:string)=>void
};

//it wants to say tht this function may or may not receive a function to handle search input
//takes a str returns nothing
// ? makes content reusable in multiple contexts

export const AppBar = ({onSearchChange}:AppBarProps) => {
  const [username,setusername]=useState("User");
  const navigate=useNavigate();
//navigate helps instead of clicking links everytime we can move pages using code

//searchchange is prop destructured 
//applying the type u just defined

  const [open,setOpen]=useState(false);
  useEffect(()=>{
    //runs after component rerenders it only runs once 
    //we need outside react  like local storage like i want tht it only gets the username only when the app loads so we choose to use useEffect
    const storedname=localStorage.getItem("username");
    if(storedname){
      setusername(storedname.toUpperCase())
    }
  },[]);//runns only once the app mounts

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/signin");
  }

  return (
    <header className="sticky top-0  bg-white border-b  z-50 border-slate-100">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            to="/blogs"
            className="text-4xl font-serif font-bold tracking-tighter"
          >
            Inkly
          </Link>

          {/* SEARCH — DESKTOP ONLY */}
        
          <div className=" hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-[280px]">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="text"
              onChange={(e)=>onSearchChange?.(e.target.value)}
              //?.(): only checks for null or undefined
              //checks for all false values(null,undefined,false,0.)
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
