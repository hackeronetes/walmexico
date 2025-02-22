import React, { useState } from 'react'
import Image from '../common/Image'
import InputText from './InputText';
import InputFile from './InputFile';
import { PrimaryButton, SecondryButton } from '../common/Buttons';

// import { Jsxlement } from 'typescript'



interface Props {
    
    columns : {label: string, key: string}[];
    // data:any;
    callbackCheckbox?:any;
    callbackClickRow?:any;
    callbackEditRow?:any;
    callbackDeleteRow?:any;
    callbackImageCallback?:any;
    isEditable?:any;
    row:any
    index:any
    saveEditRow?:any
    handleSaveRowClick?:any
}

const colTypes = {
    image:'image',
    text: 'text',
    checkbox: 'checkbox',
    cellRenderer: 'cellRenderer',
    rowClick: 'rowClick',
    rowEdit: 'rowEdit',
    rowDelete: 'rowDelete',
    imageCallback: 'imageCallback',
}


const Row:React.FC<Props> = (props) => {

    // const rows = props.data;
    const columns = props.columns;
    const [editing, setEditing]  = useState(false)   


    const handleCheckBoxChange = (e:any, item:any) => {
       
        props.callbackCheckbox(item, e.target.checked)
    }

    
    const renderInput = (col:any, row:any) => {
        if(col.inputType == 'text')
        {
            return (
                <InputText saveValue={props.saveEditRow} value={row[col.key]} rowKey={col.key}/>
            ) 
        }
        else {
            return (
                <InputFile saveValue={props.saveEditRow} value={row[col.key]} rowKey={col.key}/>
            ) 
        }
       
        
    }

    const renderColText = (val:any) => {
        if( typeof val != 'object')
            return val
        else
            return ''
    }



    const renderTextCol = (col:any, index:number, row:any)=> {
        if(editing)
        {
            return (
                <td key={index} className={col.className}>
                    <div className="tdParent">
                        <div className="tdBefore">
                            {col.label}
                        </div>
                        <div className="tdAfter">
                            {/* <input type="text" value={row[col.key]} /> */}
                            {renderInput(col, row)}
                            

                            </div>
                    </div>
                </td>
            )
        }
        else{
            return  (
                <td key={index} className={col.className}>
                    <div className="tdParent">
                        <div className="tdBefore">
                            {col.label}
                        </div>
                        <div className="tdAfter" style={{whiteSpace: 'pre-wrap'}}>{renderColText(row[col.key])}</div>
                    </div>
                </td>
            )
        }
    }

    const handelRowClick = (row:any) => {
        // if()
        props.callbackClickRow(row)
    }

    const handelEditClick = (row:any) => {
        if(props.isEditable)
            setEditing(true)
        else
            props.callbackEditRow(row)

        
    }

    const  handleSaveRowClick = (row:any) => {

        setEditing(false)
        if(props.handleSaveRowClick)
            props.handleSaveRowClick(row)
    }

    const renderAddBtn = (row:any) => {
        return (
            <td colSpan={2}>
                <PrimaryButton onClick={() => handelEditClick(row)}>
                    Agregar
                </PrimaryButton>
            </td>
        )
    }

    const renderCols = (row:any) => {

       
        let thList : any[] = []

        //thList.push(<td></td>)
       
        let tds = columns.map((col:any, index:number) => {
           
            if(col.type == colTypes.text)
            {
                
                return renderTextCol(col, index, row)
            }
            else if(col.type == colTypes.cellRenderer){
                return  (
                    <td key={index}  className={col.className}>
                        <div className="tdParent">
                            <div className="tdBefore">
                                {col.label}
                            </div>
                            <div className="tdAfter"> { col.cellRenderer(row)} </div>
                        </div>
                        
                    </td>
                )
            }
            else if(col.type == colTypes.checkbox){
                return (
                    <td key={index}  className={col.className}>
                        <input type="checkbox" onChange={(e) =>handleCheckBoxChange(e, row)}></input>
                    </td>
                )
            }
            else if(col.type == colTypes.rowClick){
                return (
                    <td key={index}>
                        <div className="tdParent">
                            <div className="tdBefore">
                                {col.label}
                            </div>
                            <div className="tdAfter">
                                <span onClick={() => handelRowClick(row)}><Image name='dots.png'/></span>
                            </div>
                        </div>
                    </td>

                   
                )
            }
            else if(col.type == colTypes.rowEdit){
                if(editing)
                {
                    return (
                        <td key={index}>
                            <div><PrimaryButton onClick={() => handleSaveRowClick(row)}>Guardar</PrimaryButton></div>
                            <div><SecondryButton onClick={() => setEditing(false)}>Cancel</SecondryButton></div>
                            
                        
                        </td>
                    )
                }
                else {
                    if(row.emptyRecord)
                    {
                        return renderAddBtn(row)
                    }

                
                    return (
                        <td key={index}>
                            <div className="tdParent">
                                <div className="tdBefore">
                                    {col.label}
                                </div>
                                <div className="tdAfter">
                                    <span onClick={() => handelEditClick(row)}  className={col.className}><Image name='edit.png'/></span>
                                </div>
                            </div>
                        </td>
                    )
                }
            }
            else if(col.type == colTypes.rowDelete){
                

               

                if(editing || row.emptyRecord)
                    return ''

                return (
                    <td key={index}>
                        <div className="tdParent">
                            <div className="tdBefore">
                                {col.label}
                            </div>
                            <div className="tdAfter">
                                <span onClick={() => props.callbackDeleteRow(row)}  className={col.className}><Image name='trash.png'/></span>
                            </div>
                        </div>
                    </td>
                )
               
            }
            else if(col.type == colTypes.imageCallback){
                return(
                    <td key={index}  className={col.className}>
                        <div className="tdParent">
                            <div className="tdBefore">
                                {col.label}
                            </div>
                            <div className="tdAfter">
                                <span onClick={() => props.callbackImageCallback(row)}><Image name={col.image}/></span>
                            </div>
                        </div>
                    </td>
                )
            }
            else if(col.type == colTypes.image){
                return(
                    <td key={index}  className={col.className}>
                        <div className="tdParent">
                            <div className="tdBefore">
                                {col.label}
                            </div>
                            <div className="tdAfter">
                                <img src={row[col.key]} alt=""  height="100" width="100" />
                            </div>
                        </div>
                    </td>

                    
                )
            }
           
            
        })

        thList.push(tds)
        //thList.push(<td></td>) 

        return thList
        
   }


    const renderedRow = (item:any) => {
        if(item)
        {
            return (
                <tr key={'tr-' + props.index}>
                    {renderCols(item)}
                </tr>
            )
        }
    }
   
    return (
        <>
            {renderedRow(props.row)}
        </>
    )

}


export default Row