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
type Bookmark={
    post:Blog;
}
//due to scalability purposes so later on when we would need author email author profile etc etc we cud add them 

export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true);
    const [blog,setBlog]=useState<Blog|null>(null);

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
        //We use || [] to ensure that blogs is always an array and prevent crashes when mapping. However, this only protects against posts being undefined. If response.data itself is undefined, it will still crash. A safer approach is to use optional chaining like response.data?.posts || []

    },[search])
//params:{search} automatically converts object -query string 
    return {
        loading,
        blogs
    }
}
//use debounce for lesser api calls

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
        const posts=res.data.bookmarks?.map((b:Bookmark)=>b.post || []);
        setBookmarks(posts);
        setLoading(false);
    })
    .catch(()=>{
        setBookmarks([]);
        setLoading(false);
    })
    },[])
    return { loading,bookmarks}
//we cud add toekns in the dependency array by storing them in react state so when the token refreshes we get the new bookmarks
}

export const useDebounce=(value:string,delay=400)=>{
    const [debounced,setDebounced]=useState(value);
    useEffect(()=>{
        const id=setTimeout(()=>setDebounced(value),delay);
        return()=>clearTimeout(id);
    },[value,delay]);
    return debounced
}
