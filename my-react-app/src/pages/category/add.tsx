import { useEffect, useState } from "react"
import Button from "../../components/Button"
import Table from "../../components/Table"
import ApiClient from "../../library/ApiClient"
import usePublicStore from "../../store/public"
import { Link, useNavigate } from "react-router-dom"
import { Column, Book, Category } from "../../types"
import Input from "../../components/Input"

function CategoryAdd() {
  const publicStore = usePublicStore()  
  const [name, setName] = useState("")

  const navigate = useNavigate()

  const addCategory = () => {
    const category:Category = {
      name: name
    }
    const b = publicStore.fetchAddCategory(category)
    navigate("/categories")
  }

  return (
    <div>
      <div className="container wide">
        <h2 className="text-center font-bold text-2xl">THÊM DANH MỤC</h2>
        <div className="form-block">
          <label>Tên</label><br/>
          <Input className="border-2 p-2" onChange={(e) => setName(e.target.value)} placeholder="name..." type="text"/>
        </div>
        <Button className="text-lg border-2 mt-4 p-1 hover:bg-slate-200" onClick={() => addCategory()}>Thêm danh mục</Button>
      </div>
    </div>
  )
}

export default CategoryAdd