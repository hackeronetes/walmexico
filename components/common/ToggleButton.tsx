import React, { useState, useEffect } from "react";


interface Props {
    checked?: boolean
    callbackToggle: any
}


const ToggleButton: React.FC<Props> = (props) => {

    const [checked, setChecked] = useState<any>(props.checked ? props.checked : false)

    
    const toggle = (status:boolean) => {
        setChecked(status)
        props.callbackToggle(status)
    }

    useEffect(() => {
        if(props.hasOwnProperty('checked'))
            setChecked(props.checked)

    }, [props])
    
    return (
        <label className="switch">
            <input 
                type="checkbox" 
                id="togBtn"
                onChange={(e) => toggle(e.target.checked) } 
                checked={checked}
            />
            <div className="toogle-slider round"></div>
        </label>
    );

}

export default ToggleButton