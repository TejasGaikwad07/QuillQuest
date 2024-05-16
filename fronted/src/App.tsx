
import {BrowserRouter , Routes , Route} from "react-router-dom"
import './App.css'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { Blog } from './Pages/Blog'
function App() {

  return (
    <>
    <div>
     <BrowserRouter>
     <Routes>
      <Route path = "/signup" element = {<Signup/>}    />
      <Route path = "/signin" element = {<Signin/>}    />
      <Route path = "/blog:id" element = {<Blog/>}    />

      </Routes>
      </BrowserRouter>
    </div>
      
    </>
  )
}

export default App
