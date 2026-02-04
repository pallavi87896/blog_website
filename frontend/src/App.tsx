import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import  Signup  from './pages/signup'
import  Signin  from './pages/signin'
import { Blog } from './pages/Blog'
import { Blogs } from "./pages/Blogs";
import { Publish } from './pages/Publish';
import EditBlog from './pages/EditBlog'
import  Bookmarks  from "./pages/Bookmarks";
import { LandingPage } from './pages/Landing'
import { ProtectedRoute } from './components/Protected'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}>
        </Route>
      <Route path="/signup" element={<Signup />} />
     
        <Route path='/signin' element={<Signin ></Signin>}></Route>
        <Route path="/blogs/:id" element={<ProtectedRoute>
      <Blog />
    </ProtectedRoute>} />
          <Route path="/blogs" element={
    <ProtectedRoute>
      <Blogs />
    </ProtectedRoute>
  } />
          <Route path="/publish" element={
    <ProtectedRoute>
      <Publish />
    </ProtectedRoute>
  } /> 
          <Route path="/edit/:id" element={
    <ProtectedRoute>
      <EditBlog />
    </ProtectedRoute>
  }></Route>
          <Route path="/bookmarks" element={
    <ProtectedRoute>
      <Bookmarks />
    </ProtectedRoute>
  } />

          </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
