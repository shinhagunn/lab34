interface InputProps {
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  value?: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  readOnly?: boolean
}

function Input(props: InputProps) {
  return (
    <input className={`input ${props.className}`} type={props.type} value={props.value} placeholder={props.placeholder} onChange={props.onChange} readOnly={props.readOnly || false}/>
  )
}

export default Input