import React, { useState, useEffect } from "react";

interface  Props  {
  field:any;
  value:string;
  disabled?:any;
  className?: string
}




// export const Input = ({ label, type, id, placeholder, register, validation= {} }) => {
export const InputTextBox = (props:Props) => {

    // const registerValue = validation ? 
    const disabled = props.disabled ? props.disabled : true
    const placeholder = props.field.placeholder ? props.field.placeholder : ''
    const value = props.value ? props.value : ''

    const [inputValue, setInputValue] = useState<any>(value)

    useEffect(() => {
      setInputValue(props.value)
    }, [props])
    

    return (
        // <>
        // </>
      <div className={`form-input ${props.className ? props.className : ''}`} >
        <div className="">
          <label htmlFor={props.field.id} className={(props.field.label ? 'input-label' : 'input-label no-label')} >
            {props.field.label ? props.field.label : '1'} 
          </label>
        </div>
        <textarea
          className="input-text"
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue}
          rows={5}
        >
        </textarea>
      </div>

     
      
    )
  }