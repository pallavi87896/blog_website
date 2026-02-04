import { Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import axios from "axios";
import { useState } from "react";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  likesCount:number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishDate,
  likesCount,
}: BlogCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likes,setLikes]=useState(likesCount);
  const [bookmarked, setBookmarked] = useState(false); // New State
  const navigate = useNavigate();

  // Dynamic Reading Time Calculation
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 225;
    const noOfWords = text.split(/\s+/).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return minutes;
  };

  async function handleLike(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await axios.post(
        `https://backend.singhpallavi8195.workers.dev/api/v1/blogs/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLiked(res.data.liked);
      setLikes((prev)=>(res.data.liked?prev+1 :prev-1));
    } catch (err) {
      console.error("Error liking post", err);
    }
  }

  // Bookmark logic
  async function handleBookmark(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      // Assuming your backend has a bookmark endpoint
      await axios.post(
        `https://backend.singhpallavi8195.workers.dev/api/v1/blogs/${id}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookmarked(!bookmarked);
    } catch (err) {
        setBookmarked(!bookmarked); 
        console.error("Error bookmarking post", err);
    }
  }

  return (
    <div className="group p-5 border-b border-slate-100 max-w-screen-md transition-all hover:bg-slate-50/50">
      <Link to={`/blogs/${id}`} className="block cursor-pointer">
        <div className="flex items-center gap-2 mb-3">
          <Avatar name={authorName} />
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-800">
              {authorName[0].toUpperCase() + authorName.slice(1).toLowerCase()}
            </span>
            <Circle />
            <span className="text-slate-500 text-xs font-light tracking-wide">{publishDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-12">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug group-hover:text-slate-700 transition-colors">
              {title}
            </h2>
            <p className="text-[15px] font-serif text-slate-600 leading-relaxed mt-2 line-clamp-2">
              {content}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleLike} 
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors group/like"
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              className={`${liked ? "fill-red-500 text-red-500" : "text-slate-400 group-hover/like:scale-110 transition-transform"}`}
            />
            <span className={liked ? "text-red-500 font-medium" : ""}>Like</span>
            <span>{likes}</span>
          </button>

          <button
            onClick={() => navigate(`/blogs/${id}`)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors group/comment"
          >
            <MessageCircle size={18} strokeWidth={1.5} className="group-hover/comment:scale-110 transition-transform" />
            <span>Comment</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-light">
                {calculateReadingTime(content)} min read
            </span>
            <button onClick={handleBookmark} className="transition-transform active:scale-90">
                <Bookmark 
                    size={18} 
                    strokeWidth={1.5} 
                    className={`${bookmarked ? "fill-black text-black" : "text-slate-400 hover:text-black"}`} 
                />
            </button>
        </div>
      </div>
    </div>
  );
};

export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold shadow-sm ${
        size === "small" ? "w-6 h-6 text-[10px]" : "w-10 h-10 text-sm"
      }`}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

export function Circle() {
  return <div className="h-0.5 w-0.5 rounded-full bg-slate-400"></div>;
}