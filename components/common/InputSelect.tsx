import React from "react";

interface  Props  {
    field:any
    register?:any
    error:any
    selectOptions:any
    optionLabel?: string
    optionValue?: string
    onChange?: any
    
}


export const InputSelect = (props:Props) => {
    

    let optionLabelKey = props.optionLabel ? props.optionLabel : 'label'
    let optionValueKey = props.optionValue ? props.optionValue : 'value'

    const renderedOptions = props.selectOptions.map((option:any) => {
        return <option key={option[optionLabelKey]} value={option[optionValueKey]}>{option[optionLabelKey]}</option>
    })

    const handleConChange = (e:any) => {
        
        
        if(props.onChange)
            props.onChange(e.target.value)
    }
    
    return (
        <div className="form-input input-container">
            <div className="">
                <label htmlFor={props.field.id} className="input-label">
                    {props.field.label}
                </label>
            </div>
            <select  
                id={props.field.id}
                className="input-select"
                placeholder={props.field.placeholder}
                {...props.register(props.field.id, props.field.validation)}
                onChange={(e) => handleConChange(e)}
            
            >
                <option value="" >
                    Seleccione 
                </option>
                {renderedOptions}
            </select>
            <div className="input-error">{props.error && props.error.message}</div>
        </div>
    )



}