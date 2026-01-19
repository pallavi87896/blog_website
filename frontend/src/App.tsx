
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import  Signup  from './pages/signup'
import  Signin  from './pages/signin'
import { BlogFeed } from './pages/blog'
import { BlogReadingPage } from './pages/readPost'
import { BlogEditor } from './pages/writePost'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup></Signup>}>
         </Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
         <Route path='/blogfeed' element={<BlogFeed></BlogFeed>}></Route>
         <Route path='/readpost' element={<BlogReadingPage></BlogReadingPage>}></Route>
         <Route path='/writepost' element={<BlogEditor></BlogEditor>}></Route>
          </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
