import { useEffect, useState } from "react"
import Button from "../../components/Button"
import Table from "../../components/Table"
import ApiClient from "../../library/ApiClient"
import usePublicStore from "../../store/public"
import { Link, useNavigate } from "react-router-dom"
import { Column, Book, Category } from "../../types"
import Input from "../../components/Input"
import Select from "../../components/Select"

function CategoryAdd() {
  const publicStore = usePublicStore()  
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [category_id, setCategoryID] = useState(0)

  const [category, setCategory] = useState("Bấm để chọn")

  const addCategory = () => {
    const book:Book = {
      name: name,
      category_id: category_id,
      price: price,

    }
    const b = publicStore.fetchAddBook(book)
    navigate("/books")
  }

  const navigate = useNavigate()

  const handleCategory = (name: string, id: number) => {
    setCategory(name)
    setCategoryID(id)
  }

  useEffect(() => {
    publicStore.fetchCategories()
  }, [])

  return (
    <div>
      <div className="container wide">
        <h2 className="text-center font-bold text-2xl">THÊM SÁCH</h2>
        <div className="form-block">
          <label>Tên</label><br/>
          <Input className="border-2 p-2" onChange={(e) => setName(e.target.value)} placeholder="name..." type="text"/>
        </div>
        <div className="form-block">
          <label>Giá</label><br/>
          <Input className="border-2 p-2" onChange={(e) => setPrice(Number(e.target.value))} placeholder="price..." type="text"/>
        </div>
        <div className="form-block">
          <label>Danh mục:</label><br/>
          <Select value={category}>
            {publicStore.categories?.map(category => {
              const category_id = category.id ? Number(category.id) : 0
              return (
                <div>
                  <Button className="text-lg w-full text-left" onClick={() => handleCategory(category.name, category_id)}>{category.name}</Button>
                </div>
              )
            })}
          </Select>
        </div>
        <Button className="text-lg border-2 mt-4 p-1 hover:bg-slate-200" onClick={() => addCategory()}>Thêm sách</Button>
      </div>
    </div>
  )
}

export default CategoryAdd