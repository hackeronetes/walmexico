import React from "react";
import { TermsConditionsFileLink } from "./TermsConditionsFileLink";

interface  Props  {
    field:any
    register:any
    error:any
}

export const InputReadAcceptTerms  = (props:Props) => {
    
   

    const renderedOptions =  (
        
            <>
            <div key={props.field.id} className='input-checkbox-wrapper'>
                <input 
                    {...props.register(props.field.id, props.field.validation )}
                    type="checkbox" 
                    id={props.field.id} 
                    name={props.field.id} 
                    className='simple-checkbox' 
                />
                <label htmlFor={props.field.id} className='input-checkbox-label'>He leído y acepto los términos y condiciones del <TermsConditionsFileLink />.</label>
            </div>

            </>
        
    )

    return (
        <div>
            {/* <div className="input-label">{props.field.placeholder}</div> */}
            {renderedOptions}
            { <div className="input-error">{props.error && props.error.message}</div> }
        </div>
    )



}