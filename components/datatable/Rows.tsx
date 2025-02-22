import React, {  } from 'react'
// import Image from '../common/Image'
import Row from './Row';

// import { Jsxlement } from 'typescript'



interface Props {
    
    columns : {label: string, key: string}[];
    data:any;
    callbackCheckbox?:any;
    callbackClickRow?:any;
    callbackEditRow?:any;
    callbackDeleteRow?:any;
    callbackImageCallback?:any;
    isEditable?:any;
    saveEditRow?:any
    handleSaveRowClick?:any
}



const Rows:React.FC<Props> = (props) => {

    const rows = props.data;
   

    const renderedRows = rows.map((item:any, index:number) => {
        if(item)
        {
            return (
               <Row 
                    columns={props.columns} 
                    callbackCheckbox={( e:any) =>props.callbackCheckbox(item, e)}
                    callbackClickRow={props.callbackClickRow}
                    callbackEditRow={props.callbackEditRow}
                    callbackDeleteRow={props.callbackDeleteRow}
                    callbackImageCallback={props.callbackImageCallback}
                    isEditable={props.isEditable}
                    row={item}
                    index={index}
                    saveEditRow={props.saveEditRow}
                    handleSaveRowClick={props.handleSaveRowClick}
               />
            )
        }
    })

  
    return (
        <>
            {renderedRows}
            {/* {props.isEditable && renderNewAddRow()} */}
        </>
    )

}


export default Rows