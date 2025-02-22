import React, {useEffect, useState} from "react";
import parse from 'html-react-parser';

interface  Props  {
    field:any
    register:any
    error:any
    radioOptions:any
    selected?:any
    passSelectedValue?:any
}

export const InputRadio  = (props:Props) => {

    
    // let checked = ''
    const [checked, setChecked] = useState('')
   

    useEffect(() =>{
    if(props.field.id === "m2ParkingSpaces"){    
     props.passSelectedValue(props.selected)
    }
    },[props.selected])


    useEffect(() => {
        if(props.selected)
            setChecked(props.selected.toString())
    } ,[props])

    

    const renderedOptions = props.radioOptions.map((option:any) => {
        return (
            
            <label key={props.field.id + option.value} htmlFor={props.field.id + option.value} className="input-radio-label">
                    <input
                        {...props.register(props.field.id, props.field.validation )}
                        type="radio"
                        value={option.value}
                        id={props.field.id + option.value}
                        checked={checked ===  option.value }
                    />

                    {parse(option.label)}
                    
            </label>
            
        )
    })

    return (
        <div className="input-container">
            <div className="input-label">{parse(props.field.placeholder)}</div>
            {renderedOptions}
            <div className="input-error">{props.error && props.error.message}</div>
        </div>
    )



}