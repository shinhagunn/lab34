import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="container wide py-12">
      <h1 className="text-center uppercase font-bold text-2xl">Đây là trang chủ</h1>
      <p className="font-bold">Danh mục:</p>
      <Link to="/categories" className="hover:text-orange-400">Categories</Link><br/>
      <Link to="/books" className="hover:text-orange-400">Books</Link>
    </div>
  )
}

export default Home