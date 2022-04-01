import create from "zustand"
import ApiClient from "../library/ApiClient"
import { Category, Book } from "../types"

type PublicStore = {
  categories?: Category[]
  books?: Book[]

  fetchCategories: () => Promise<unknown>
  fetchBooks: () => Promise<unknown>
  fetchAddCategory: (category: Category) => Promise<boolean>
  fetchAddBook: (category: Book) => Promise<boolean>
}

const usePublicStore = create<PublicStore>((set, get) => ({
  fetchCategories: async () => {
    try {
      const { data: categories } = await new ApiClient().get("/categories")

      set({
        ...get(),
        categories,
      });
    } catch (err) {
      return err
    }
  },

  fetchBooks: async () => {
    try {
      const { data: books } = await new ApiClient().get("/books")

      set({
        ...get(),
        books,
      });
    } catch (err) {
      return err
    }
  },

  fetchAddCategory: async (category: Category) => {
    try {
      const dataPost = {
        name: category.name,
      }

      await new ApiClient().post("/categories", dataPost)
      return true
    } catch (err) {
      return false
    }
  },

  fetchAddBook: async (book: Book) => {
    try {
      const dataPost = {
        category_id: book.category_id,
        name: book.name,
        price: book.price
      }

      await new ApiClient().post("/books", dataPost)
      return true
    } catch (err) {
      return false
    }
  },

}))

export default usePublicStore