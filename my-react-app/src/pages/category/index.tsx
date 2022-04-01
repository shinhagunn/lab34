import { useEffect } from "react"
import Button from "../../components/Button"
import Table from "../../components/Table"
import ApiClient from "../../library/ApiClient"
import usePublicStore from "../../store/public"
import { Link } from "react-router-dom"

function Categories() {
  const publicStore = usePublicStore()  

  const columns = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "Name",
    },
    {
      key: "remove",
      title: "Action"
    },
  ]

  useEffect(() => {
    publicStore.fetchCategories()
  }, [publicStore.categories])

  return (
    <div>
      <div className="container wide">
        <h2 className="text-center font-bold text-2xl">DANH SÁCH DANH MỤC</h2>
        <Link to="/categories/add" className="text-lg border-2 p-2">Thêm danh mục</Link>
        <Table columns={columns} data={publicStore.categories} link={`categories/`}/>
      </div>
    </div>
  )
}

export default Categories