import React from "react";

interface  Props  {
  field:any
  register:any
  error:any
  disabled?:any
}

// export const Input = ({ label, type, id, placeholder, register, validation= {} }) => {
export const Input = (props:Props) => {

    // const registerValue = validation ? 
    let maxLength:any = ''
    try{
       maxLength = props.field.validation.maxLength.value 
    } catch(err:any){
       maxLength =  999
    }
    

    return (
        // <>
        // </>
      <div className="form-input input-container">
        <div className="">
          <label htmlFor={props.field.id} className={(props.field.label ? 'input-label' : 'input-label no-label')} >
            {props.field.label ? props.field.label : '1'} 
          </label>
        </div>
        <input
          id={props.field.id}
          type="text"
          className="input-text"
          placeholder={props.field.placeholder}
          {...props.register(props.field.id, props.field.validation)}
          maxLength={maxLength}
          disabled={props.disabled}
          
        />
        <div className="input-error">{props.error && props.error.message}</div>
      </div>
      
    )
  }