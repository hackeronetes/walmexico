import React, { useEffect, useState, memo } from "react";
import parse from 'html-react-parser';
import { FOLIO_STATUS } from './constants';
import { TYPE_SUPP, TYPE_EP, SUBTYPE_CON} from "./constants"


interface  Props  {
    field:any
    radioOptions:any
    module:String 
    subModule?:String 
    selected?:any
    radioLabel? : any
    radioValue? : any
    disabled : any
    onChange? : any
    disabledAfter? : any
}

const RadioStatus: React.FC<Props>  = (props:any) => {
//export const RadioStatus  = (props:Props) => {

   
    
    const  [checked, setChecked] = useState<any>(props.selected)
    

    //const [isDisabled, setIsDisabled] = useState<any>(true)
    const [radioOptions, setRadioOptions] = useState<any>([])

    

    
    const getIsDisabled = (option:any) => {
        if(props.disabled)
            return props.disabled
        // Internal user is not allowed to change status to info sent  
        if(option[props.radioValue] == FOLIO_STATUS.INFO_SENT && !props.disabled)
            return true
        if(props.selected == FOLIO_STATUS.ACCEPTED || props.selected == FOLIO_STATUS.REJECTED)
            return true
        if(props.selected > FOLIO_STATUS.IN_REVIEW && option[props.radioValue] == FOLIO_STATUS.IN_REVIEW)
            return true
        if(props.selected == FOLIO_STATUS.IN_WAIT   )
        {
            if( option[props.radioValue] == FOLIO_STATUS.IN_REVIEW || option[props.radioValue] == FOLIO_STATUS.ADD_INFO_NEED || option[props.radioValue] == FOLIO_STATUS.INFO_SENT)
                return true
        }
        else
            return false
    }

    const filterRadioOptionsByModule = () => {
        let filteredOptions:any = []
        if(props.radioOptions && props.radioOptions.length > 0)
        {
            props.radioOptions.forEach((option1:any) => {
                if( option1[props.radioValue] == FOLIO_STATUS.ADD_INFO_NEED 
                    || option1[props.radioValue] == FOLIO_STATUS.INFO_SENT 
                    || option1[props.radioValue] == FOLIO_STATUS.IN_WAIT 
                )
                {
                    if(props.module == TYPE_SUPP )
                    {
                        if(props.subModule == SUBTYPE_CON)
                            filteredOptions.push(option1)
                    }
                    else if(props.module != TYPE_EP )
                    {
                        filteredOptions.push(option1)
                    }
                }
                else {
                    filteredOptions.push(option1)
                }
               
            });
        }
        return filteredOptions
        
    }

    useEffect(() => {

        let options:any = filterRadioOptionsByModule()
        
        options.forEach((option:any) => {
            option.disabled = getIsDisabled(option)
        });
        
        setRadioOptions(options)
        

        // if(props.hasOwnProperty('disabled'))
        //     setIsDisabled(props.disabled)

        // if(props.selected == 4 || props.selected == 5)
        //     setIsDisabled(true)

        setChecked(props.selected)
    }, [props   ])

    

    const onRadiochange = (val:any) => {
       
        setChecked(val)
        if(props.onChange)
            props.onChange(val)
    }
    // const getIsDisabled = (radioValue:any) => {
    //     return isDisabled || props.disabledAfter > radioValue  ||  radioValue == 6
    // }

    const renderedOptions = radioOptions.map((option:any) => {
        return (
            <>
            <label key={props.field.id + option[props.radioValue]} htmlFor={props.field.id + option[props.radioValue]} className="input-radio-label">
                    
                    
            
            <input
            type="radio"
            value={option[props.radioValue]}
            id={props.field.id + option[props.radioValue]}
            checked={checked ===  option[props.radioValue] }
            disabled={option.disabled} 
            name={props.field.id}    
            onChange={() => onRadiochange(option[props.radioValue])} 
                          />

        {parse(option[props.radioLabel])}
        </label>
        </>
            
        )
    })

    return (
        <>
            <div className="input-label">{parse(props.field.placeholder)}</div>
            <div>{renderedOptions}</div>
           
        </>
    )



}

export default memo(RadioStatus, (prevProps, nextProps) => {
    return (prevProps.radioOptions == nextProps.radioOptions && prevProps.selected == nextProps.selected)
    // this will never re-render
  
    // or do your custom logic to determine when it should re-render
  });