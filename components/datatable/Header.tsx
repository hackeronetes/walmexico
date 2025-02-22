import React, { useState } from 'react'

// import { Jsxlement } from 'typescript'
import Image from './../common/Image';



interface Props {
    
    columns : {label: string, key: string}[];
    sort : boolean;
    callbackSort? : any;
}

const sortOrders = {
    asc : 'asc',
    desc : 'desc',
}


const Header:React.FC<Props> = (props) => {

   
    const columns = props.columns;
    const  [sortOrder, setSortOrder] = useState('')
    const  [sortCol, setSortCol] = useState('')



    const handleOnClick = (key:string) => {

        if(props.sort)
        {
            let tempsortOrder = (sortOrder == sortOrders.asc) ? sortOrders.desc : sortOrders.asc
            setSortOrder(tempsortOrder)
            setSortCol(key)

            props.callbackSort(key, tempsortOrder )
        }
        
    }

    const renderHeaderColSort = (key:any) => {
       
        let order:any = ''
        if(sortCol == key)
        {
            order = (sortOrder )? ((sortOrder == sortOrders.asc) ? <Image name="sort-down.png" /> : <Image name="sort-up.png" />) : '' 
            
        }
       
        return order
    }

   const renderCols = () => {

        let thList : any[] = []

        //thList.push(<th key={'fsfsad'}></th>)

        let tds = columns.map((key:any, index:number) => {
            return  (
               
                <th key={key.key + index}  className={key.className}>
                    <span   onClick={() => handleOnClick(key.key)}>
                        {key.label}
                        {renderHeaderColSort(key.key)}
                    </span>
                    
                        
                </th>
            )
        })

        thList.push(tds)
        //thList.push(<th></th>) 

        return thList
        
   }
   
    return (
        <>
            <tr key={123}>
                {renderCols()}
                
            </tr>
      
      
        </>
    )

}


export default Header