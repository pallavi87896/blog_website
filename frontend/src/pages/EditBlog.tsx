import { useParams
 } from "react-router-dom";
import { useBlog } from "../hooks";
import { useEffect, useState } from 'react'
import  axios  from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EditBlog = () => {
    const navigate=useNavigate();
    const { id }=useParams();
    const { blog }=useBlog({id:id!});
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");

    useEffect(()=>{
        if(blog){
            setTitle(blog.title);
            setContent(blog.content)
        }
    },[blog])
  return (
  <div className="max-w-3xl mx-auto pt-10">
    
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full text-3xl font-bold outline-none mb-6"
      placeholder="Title"
    />

    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows={10}
      className="w-full outline-none text-lg"
      placeholder="Write your story..."
    />
    <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded" onClick={handleUpdate}>Save Changes</button>

  </div>
);

async function handleUpdate() {
    await axios.put(
         `${BACKEND_URL}/api/v1/blogs`,
    {
      id,
      title,
      content
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    );
    navigate(`/blogs/${id}`)
    
}

}

export default EditBlog

