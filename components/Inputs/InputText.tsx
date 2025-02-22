import React, { useState, useEffect } from "react";

interface  Props  {
  field:any;
  value:string;
  disabled?:any;
  className?: string
  onChange?: any
}




// export const Input = ({ label, type, id, placeholder, register, validation= {} }) => {
export const InputText = (props:Props) => {

    // const registerValue = validation ? 
    const disabled = props.disabled ? props.disabled : false
    //const placeholder = props.field.placeholder ? props.field.placeholder : ''
    const value = props.value ? props.value : ''

    const [inputState, setInputState] = useState(value)

    const handleOnChange = (e:any) => {
      setInputState(e.target.value)
      if(props.onChange)
        props.onChange(e.target.value)
    }

    useEffect(() => {
      setInputState(props.value)
    }, [props])
    
   


    return (
        // <>
        // </>
      <div className={`input-container form-input ${props.className ? props.className : ''}`} >
        <div className="">
          <label htmlFor={props.field.id} className={(props.field.label ? 'input-label' : 'input-label no-label')} >
            {props.field.label ? props.field.label : '1'} 
          </label>
        </div>
        <input
          type="text"
          className="input-text"
          //placeholder={placeholder}
          disabled={disabled}
          value={inputState}
          onChange={handleOnChange}
        />
      </div>
      
    )
  }