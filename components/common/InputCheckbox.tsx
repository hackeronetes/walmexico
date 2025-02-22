import React, {useState, useEffect} from "react";

interface Props {
    field: any
    register: any
    error: any
    disabled?: any
    handleOnChange?: any
}

export const InputCheckbox = (props: Props) => {

    
    const [disabled, setDisabled] = useState<any>(false)

    
    useEffect(() => {
        setDisabled(props.disabled)
       
    }, [props])


    const handleOnChange = (e:any) => {
        
        if(props.handleOnChange)
            props.handleOnChange(e.target.checked)
    }



    const renderedOptions = (

        <>
            <div key={props.field.id} className='input-checkbox-wrapper input-container'>
                <input
                    {...props.register(props.field.id, props.field.validation)}
                    type="checkbox"
                    id={props.field.id}
                    name={props.field.id}
                    className='simple-checkbox'
                    disabled={disabled}
                    onChange={(e) => handleOnChange(e)}
                />
                <label htmlFor={props.field.id} className='input-checkbox-label'>{props.field.label}</label>
            </div>

        </>

    )

    return (
        <div>
            {/* <div className="input-label">{props.field.placeholder}</div> */}
            {renderedOptions}
            { <div className="input-error">{props.error && props.error.message}</div>}
        </div>
    )



}