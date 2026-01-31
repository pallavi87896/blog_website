
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import  Signup  from './pages/signup'
import { Navigate } from "react-router-dom"
import  Signin  from './pages/signin'
import { Blog } from './pages/Blog'
import { Blogs } from "./pages/Blogs";
import { Publish } from './pages/Publish';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/signup"></Navigate>}>
        </Route>
      <Route path="/signup" element={<Signup />} />
     
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} /> 
          </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
