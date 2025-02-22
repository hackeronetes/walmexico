import React, {useState, useEffect} from "react";
import Select from "react-select";
import {getStateList} from '../../services/localCommercial/localCommercialService'

interface  Props  {
    onChange: any
}


export const StateDropdown2 = (props:Props) => {

    const[selectStateOptions, setSelectStateOptions] = useState<any[]>()

    const handleStateChange = (e:any) => {
        
        props.onChange(e.stateCode)
    }


    useEffect(() => {
        getStateList().then((res:any) => {
           
            const firstObject = {
                stateCode: 0,
                state: "Seleccione"
            }
            setSelectStateOptions([firstObject, ...res.data])
        })
        .catch((error:any) => {
            alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
        })
        
    }, [])

    
    return (
        <div className="input-select-react-wrapper">
            <label htmlFor='state' className="input-label">
                Estado
            </label>
            <Select
                getOptionLabel={(option:any)=>option.state}
                getOptionValue={(option:any)=>option.stateCode}
                classNamePrefix='input-select-react'
                id='state' className='input-select-react'
                options={selectStateOptions}
                onChange={(e) => handleStateChange(e)}/>
        </div>
    )



}