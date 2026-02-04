import { useEffect, useState} from 'react'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Blog {
    "content":string;
    "title":string;
    "id":string;
    "createdAt":string;
    "updatedAt":string;
    "authorId":string;
    "author":{
        "name":string
    };
    "_count":{
    likes:number;
    };
}

export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true);
    const [blog,setBlog]=useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response=>{
            setBlog(response.data.post);
            setLoading(false);
        })
    },[id])

    return {
        loading,
        blog
    }
}

export const useBlogs=(search:string)=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        setLoading(true)
        axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`,{
            params:{ search },
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response=>{
            setBlogs(response.data.posts ||[]);
            setLoading(false);
        })
    },[search])

    return {
        loading,
        blogs
    }
}

export const useBookmarks=()=>{
    const [loading,setLoading]=useState(true);
    const [bookmarks,setBookmarks]= useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(
      `${BACKEND_URL}/api/v1/blogs/bookmarks`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res)=>{
        const posts=res.data.bookmarks.map((b:any)=>b.post);
        setBookmarks(posts);
        setLoading(false);
    })
    .catch(()=>{
        setBookmarks([]);
        setLoading(false);
    })
    },[])
    return { loading,bookmarks}

}