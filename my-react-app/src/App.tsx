import './App.less'
import './index.less'
import {
  BrowserRouter,
  Route, 
  Routes
} from 'react-router-dom'
import Home from "./pages/Home"
import Categories from "./pages/category/index"
import CategoryAdd from "./pages/category/add"
import Books from "./pages/book/index"
import BookAdd from "./pages/book/add"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/add" element={<CategoryAdd />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add" element={<BookAdd />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
