import React from "react"
import "../assets/styles/components/select.less"

interface SelectProps {
  value: string
  className?: string
}

function Select(props: React.PropsWithChildren<SelectProps>) {
  let show = false
  
  const handleDropdownOver = () => {
    if (!show) {
      document.getElementById("option")?.classList.remove("option-hidden")
      document.getElementById("option")?.classList.add("option-appear")
  
      setTimeout(() => {
        document.getElementById("option")?.classList.add("option-effect")
      }, 10)

      show = true;
    } else {
      document.getElementById("option")?.classList.remove("option-effect")

      setTimeout(() => {
        document.getElementById("option")?.classList.add("option-appear")
        document.getElementById("option")?.classList.add("option-hidden")
      }, 100)

      show = false
    }
  }

  return (
    <div className={`select ${props.className}`} onClick={handleDropdownOver}>
      <div className="select-value" >
        {props.value}
      </div>
      <div id={"option"} className="option option-hidden">
        {props.children}
      </div>
    </div>
  )
}

export default Select