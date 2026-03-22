
import { Search } from 'lucide-react'

type AppBarProps={
  onSearchChange?:(value:string)=>void
};

const SearchBar = ({onSearchChange}:AppBarProps) => {
  return (
    
      <header className=" md:hidden sticky top-16 z-40 bg-white border-b border-slate-100">
      <div className=" max-w-7xl mx-auto px-4 md:px-4 h-12 flex items-center justify-between">
        <div className=" md:hidden flex items-center justify-between bg-gray-100 px-4 py-2 rounded-full w-full max-w-md">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="text"
              onChange={(e)=>onSearchChange?.(e.target.value)}
              placeholder="Search"
              className="ml-3 bg-transparent outline-none text-sm w-full text-gray-700"
            />
          
          </div>
        </div>
        </header>

    
  )
}

export default SearchBar
