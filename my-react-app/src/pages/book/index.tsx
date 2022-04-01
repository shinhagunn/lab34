import { useEffect } from "react"
import Button from "../../components/Button"
import Table from "../../components/Table"
import ApiClient from "../../library/ApiClient"
import usePublicStore from "../../store/public"
import { Link } from "react-router-dom"
import { Column, Book } from "../../types"

function Categories() {
  const publicStore = usePublicStore()  

  const columns = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "category_id",
      title: "Category",
    },
    {
      key: "name",
      title: "Name",
    },
    {
      key: "price",
      title: "Price",
      isCurrency: true
    },
    {
      key: "remove",
      title: "Action"
    },
  ]

  const scopedSlotsRenderFunc = (item: Book, column: Column) => {
    switch (column.key) {
      case "category": 

        let index = publicStore.categories?.findIndex((category) => {
          console.log(1)
          return category.id = item.category_id
        })
        if (!index) {
          index = -1;
        }
        return (
          (index !== -1) ? (
            <span className={`${column.key} ${column.class}`} >{publicStore.categories ? publicStore.categories[index].name: "ahihi"}</span>
          ): (
            <span></span>
          )
        )
    }
  }

  useEffect(() => {
    publicStore.fetchCategories()
    publicStore.fetchBooks()
  }, [publicStore.books])

  return (
    <div>
      <div className="container wide">
        <h2 className="text-center font-bold text-2xl">DANH SÁCH QUYỂN SÁCH</h2>
        <Link to="/books/add" className="text-lg border-2 p-2">Thêm sách</Link>
        <Table columns={columns} data={publicStore.books} link={`books/`} scopedSlotsRenderFunc={(item: Book, column) => scopedSlotsRenderFunc(item, column)}/>
      </div>
    </div>
  )
}

export default Categories