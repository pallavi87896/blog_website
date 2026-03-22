import type { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MessageSquare, Calendar, Edit3, Trash2, Send } from "lucide-react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userComment: {
    name: string | null;
  };
}
export const FullBlog = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();

  
  const token = localStorage.getItem("token");
  let currentUserId: string | null = null;

  if (token) {
    try {
      currentUserId = jwtDecode<{ id: string }>(token).id;
    } catch {
      currentUserId = null;
    }
  }
  //jwtdecode decodes the userid to know whetehr this particular person has already liked the post or not

  
  const [comments, setComments] = useState<Comment[]>([]);
  //storing an array of comments
  const [commentInput, setCommentInput] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [postingComment, setPostingComment] = useState(false);

  
  async function fetchComments() {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/blogs/${blog.id}/comments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(res.data.comments);
    } catch {
      console.error("Failed to fetch comments");
    } finally {
      setLoadingComments(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [blog.id]);
//its a side effect like the comment changes only when the blog does
//if we do blog here it would re render everytime anyhing changes in the blog


  async function postComment() {
    if (!commentInput.trim()) return;
    try {
      setPostingComment(true);
      await axios.post(
        `${BACKEND_URL}/api/v1/blogs/comment`,
        { postId: blog.id, content: commentInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentInput("");
      await fetchComments();
    } catch {
      console.error("Failed to post comment");
    } finally {
      setPostingComment(false);
      //finally to ensure loading state is reset 
      //means the  button works user v=can retry ui resets
    }
  }

  return (
    <div className="min-h-screen bg-white pb-12">
      <AppBar />

      <main className="max-w-screen-xl mx-auto px-4 md:px-8 pt-8 md:pt-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT — BLOG CONTENT */}
          <article className="lg:col-span-8">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                {blog.title}
              </h1>
              
              <div className="flex items-center gap-3 mt-6 text-slate-500">
                <Calendar size={16} />
                <span className="text-sm font-medium">Published on {formatDate(blog.createdAt)}</span>
                {blog.updatedAt !== blog.createdAt && (
                  <span className="text-xs italic bg-slate-100 px-2 py-0.5 rounded-full">
                    Edited
                  </span>
                )}
              </div>
            </header>

            <div className="text-lg md:text-xl font-serif text-slate-800 leading-[1.8] tracking-normal">
              {blog.content}
            </div>

            {/* COMMENTS SECTION */}
            <section className="pb-16 mt-12 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="text-slate-900" size={16} />
                <p className="text-[16px] font text-slate-600">
                  Comments {comments.length}
                </p>
              </div>

              {/* ADD COMMENT INPUT */}
              {currentUserId ? (
                <div className="flex items-center -mt-3 mb-6 p-2 bg-slate-100/50 rounded-xl border border-slate-200">
  
  <textarea
    value={commentInput}
    onChange={(e) => setCommentInput(e.target.value)}
    placeholder="What are your thoughts?"
    className="flex-2 bg-transparent outline-none text-sm resize-none"
    rows={2}
  />
<div className="bg-slate-200 rounded-lg w-[38px] h-[26px] flex justify-center items-center">
  <button
    onClick={postComment}
    disabled={postingComment || !commentInput.trim()}
    className=" text-slate-700 disabled:text-slate-300 cursor-pointer"
  >
    <Send size={16} />
  </button>
  </div>

</div>
              ) : (
                <div className="mb-10 p-4 text-center bg-slate-50 rounded-xl text-slate-500 text-sm">
                  Sign in to join the conversation.
                </div>
              )}

              {/* COMMENTS LIST */}
              <div className="space-y-4">
                {loadingComments ? (
                  <div className="animate-pulse space-y-4 ">
                    <div className="h-10 bg-slate-100 rounded w-1/4 "></div>
                    <div className="h-10 bg-slate-100 rounded w-full"></div>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-slate-400 italic font-serif text-lg">Be the first to share a thought.</p>
                  </div>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            {(c.userComment.name || "A")[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {c.userComment.name || "Anonymous"}
                          </div>
                          
                        </div>
                      </div>
                      <div className="pl-11 text-slate-700 leading-relaxed text-[15px]">
                        {c.content}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </article>

          {/* RIGHT — AUTHOR SIDEBAR */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit pb-12">
            <div className="p-8 rounded-2xl border border-slate-100 bg-white">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
                Author
              </div>

              <div className="flex flex-col gap-4">
                <Avatar size="big" name={blog.author.name || "anonymous"} />
                
                <div>
                  <h4 className="text-xl font-bold text-slate-900 hover:underline cursor-pointer">
                    {blog.author.name || "anonymous"}
                  </h4>
                  <p className="mt-3 text-slate-500 leading-relaxed text-sm">
                    Sharing insights and deep dives into technology, design, and the modern world. Follow for weekly updates.
                  </p>
                </div>

                {currentUserId && blog.authorId === currentUserId && (
                  <div className="flex items-center gap-4 mt-4 pt-6 border-t border-slate-50">
                    <button
                      onClick={() => navigate(`/edit/${blog.id}`)}
                      className="flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors"
                    >
                      <Edit3 size={16} /> Edit
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-red-600 text-sm font-semibold transition-colors">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

/* ---------------- UTILS ---------------- */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}