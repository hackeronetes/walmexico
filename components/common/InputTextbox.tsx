import React from "react";

interface  Props  {
  field:any
  register:any
  error:any
}

// export const Input = ({ label, type, id, placeholder, register, validation= {} }) => {
export const InputTextbox = (props:Props) => {

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
          <label htmlFor={props.field.id} className="input-label">
            {props.field.label}
          </label>
        </div>
        <textarea
          id={props.field.id}
          className="input-textarea"
          placeholder={props.field.placeholder}
          {...props.register(props.field.id,props. field.validation)}
          rows="5"
          maxLength={maxLength}
        >
        </textarea>
       
        <div className="input-error">{props.error && props.error.message}</div>
      </div>
      
    )
  }