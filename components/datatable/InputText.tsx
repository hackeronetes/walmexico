import React, {  useState } from "react";


const InputText = (props:any) => {

    const [value, setValue] = useState<any>(props.value)

    // useEffect(() => {
    //     setValue(props.value)
        
    // }, [props])

    const  handleOnChange = (e:any) => {
        setValue(e.target.value)
        props.saveValue(props.rowKey, e.target.value)
    }

   
    return (
        <div>
            <input type="text" value={value} onChange={handleOnChange}/>
        </div>
    )
}

export default InputText