import { Column } from "../types"
import TableRow from "../components/TableRow"
import "../assets/styles/components/table.less"
import { CurrencyHTML } from "../mixins/helper"
import Button from "../components/Button"
import ApiClient from "../library/ApiClient"

interface TableProps<T> {
  data?: any
  columns?: Column[]
  is_router_link?: boolean
  router_builder?: string
  scopedSlotsRenderFunc?: (item: T, column: Column) => JSX.Element | undefined
  link?: string
}

function Table<T>(props: TableProps<T>) {
  const getValueByKey = (key: string, item: any) => {
    let value
    if (key.includes('.')) {
      const keys = key.split('.')
      let inv: any = null
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        if (index === 0) {
          inv = item[key]
        } else {
          inv = inv[key]
        }
      }
      value = inv
    } else {
      value = item[key]
    }
    return value
  }

  const routerLink = (item: any) => {
    if (!props.is_router_link) return
    if (!props.router_builder) return
    let routerBuilder = props.router_builder

    let start_index = 0
    for (let i = 0; i < routerBuilder.length; i++) {
      const str = routerBuilder[i]
      if (str === '#') {
        start_index = i
        continue
      }
      if (str === '}') {
        const param = routerBuilder.slice(start_index, i + 1)
        let param_key = param.replace(/#\{|\}/gi, '')
        const toUpper = param_key.includes('toUpper')
        const toLower = param_key.includes('toLower')
        if (toUpper) {
          param_key = param_key.replace('.toUpper', '')
        } else if (toLower) {
          param_key = param_key.replace('.toLower', '')
        }
        let value = getValueByKey(param_key, item)
        if (toUpper) {
          value = value.toUpperCase()
        } else if (toLower) {
          value = value.toLowerCase()
        }
        routerBuilder = routerBuilder.replace(param, value)
        i = 0
        continue
      }
    }
    return routerBuilder
  }

  const changeISOTimeToMyFormTime = (time: string) => {
    let date = new Date(time).getDay() < 10 ? `0${new Date(time).getDay()}`: `${new Date(time).getDay()}`
    let month = new Date(time).getMonth() < 10 ? `0${new Date(time).getMonth()}`: `${new Date(time).getMonth()}`
    return `${date}/${month}/${new Date(time).getFullYear()}`
  }

  const handleClick = async (id: string) => {
    try {
      let url = props.link ? props.link : ""
      await new ApiClient().delete(url + `${id}`)
    } catch (error) {
      return error
    }
  }

  return (
    <div className="a-table">
      <div className="a-table-head">
        {props.columns ? props.columns.map(column => (
          <span className={`${column.key} ${column.class}`} >{column.title}</span>
        )): ""}
      </div>

      <div className="a-table-content">
        {props.data ? props.data.map((row: any) => (
          <TableRow is_router_link={props.is_router_link} to={routerLink(row)}>
            {props.columns ? props.columns.map(column => (
              column.key == "remove" ? (
                <div className={`${column.key} ${column.class}`}>
                  <Button className="btn bg-red-300 hover:bg-red-400 btn-icon text-white p-1 rounded text-sm" onClick={() => handleClick(row.id)}>Remove</Button>
                </div>
              ): column.scopedSlots && props.scopedSlotsRenderFunc ? props.scopedSlotsRenderFunc(row, column) : (
                column.isTime ? <span className={`${column.key} ${column.class}`} >{changeISOTimeToMyFormTime(row[column.key])}</span>: 
                column.isCurrency ? <span className={`${column.key} ${column.class}`} >{CurrencyHTML(row[column.key])}</span> :
                <span className={`${column.key} ${column.class}`} >{row[column.key]}</span>
              )
            )): ""}
          </TableRow>
        )) : ""}
      </div>
    </div>
  )
}

export default Table