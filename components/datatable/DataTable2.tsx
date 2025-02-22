import React, { useState, useEffect } from 'react'
import Header from './Header'
import Rows from './Rows'
import Pagination from './Pagination'
// import { Jsxlement } from 'typescript'



interface Props {
    rows: any
    totalRows?: number
    columns : {label: string, key: string}[]
    getSelectedRows?:any;
    callbackClickRow?:any;
    callbackEditRow?:any;
    callbackDeleteRow?:any;
    callbackImageCallback?:any;
    callbackRefreshRows?:any
    sort?:boolean
    pagination?: boolean
    isEditable?: boolean
    saveEditRow?: any
    handleSaveRowClick?: any
}



const DataTable2= React.memo(function DataTable2(props:Props){


    const showPagination = props.pagination==null  ? true : props.pagination
    const isEditable = props.isEditable==null  ? false : props.isEditable
   
    const [currentPage, setCurrentPage]  = useState(1)   
    const [sortCol, setSortCol]  = useState('')   
    const [sortOrder, setSortOrder]  = useState('')   

    const [rows, setRows]  = useState([])   

    
    // const sort = props.sort ? props.sort : false
    const sort = true;

    
    //const rows = props.rows.length > 0 ? props.rows : []

//    const totalRows = props.rows.length
    const itemPerPage = 5
    //const totalPages = Math.ceil(totalRows / 4)

    const startIndex = (currentPage-1 ) * itemPerPage
    const endIndex = (currentPage ) * itemPerPage

    const pageRows = showPagination ? rows.slice(startIndex, endIndex) : rows

    // const [currentPage, setCurrentPage]  = useState(1)  
    
    const getRows = () => {
       // props.callbackRefreshRows(currentPage, sortCol, sortOrder)
    }


    useEffect(() => {
        getRows()
    }, [currentPage, sortCol, sortOrder])

    useEffect(() => {

        if(rows != props.rows)
            setCurrentPage(1)

        if( props.rows.length > 0)
            setRows(props.rows)
        else
            setRows([])
    }, [props])

    


    const handleClickRow = (row:any) => {
        if(props.callbackClickRow)
            props.callbackClickRow(row)
    }
    const handleEditRow = (row:any) => {
        if(props.callbackEditRow)
            props.callbackEditRow(row)
    }
    const handleDeleteRow = (row:any) => {
        if(props.callbackDeleteRow)
            props.callbackDeleteRow(row)
    }
    const handleImageCallback = (row:any) => {
        if(props.callbackImageCallback)
            props.callbackImageCallback(row)
    }

    const handleCheckbox = (item:any, checked:boolean) => {

        //let tempList = rows
        rows.map((row:any) => {
          if (row.commercialId === item.commercialId) {
            row.selected = checked
          }
          return row;
        });

       

       
        let selectedList= rows.filter((r:any) => r.selected)

        props.getSelectedRows(selectedList)
    }
    

    const handlePageChange = (pageNo:number) => {
       
        setCurrentPage(pageNo)
        //props.handleRefreshRows(pageNo)
    }

    const handleSortClick = (sortByCol:string, sortByOrder: 'asc' | 'desc') => {

        setSortCol(sortByCol)
        setSortOrder(sortByOrder)

        // getRows()

        if(sortByOrder == 'asc')
            rows.sort((a:any,b:any) =>  a[sortByCol] > b[sortByCol] ? 1 : -1)
        else
            rows.sort((a:any,b:any) =>  a[sortByCol] > b[sortByCol] ? -1 : 1)
        

        
    }

    

    return (
        <div className='grid-table-container js-table'>
            <div className='grid-table-wrapper'>
                <table className='striped grid-table'>
                    <tbody>
                        <Header 
                            columns={props.columns} 
                            sort={sort} 
                            callbackSort={handleSortClick} 
                        />
                        { rows.length == 0 && <div className="mb-20">No se encontraron registros.</div> }
                        <Rows 
                            columns={props.columns} 
                            data={pageRows} 
                            callbackCheckbox={(item:any, e:any) =>handleCheckbox(item, e)}
                            callbackClickRow={handleClickRow}
                            callbackEditRow={handleEditRow}
                            callbackDeleteRow={handleDeleteRow}
                            callbackImageCallback={handleImageCallback}
                            isEditable={isEditable}
                            saveEditRow={props.saveEditRow}
                            handleSaveRowClick={props.handleSaveRowClick}
                        />
                    </tbody>
                </table>
            </div>

            {showPagination && (

                <div className='grid-pagination-wrapper'>
                    <Pagination totalRows={rows.length} 
                        currentPage={currentPage} 
                        setCurrentPage={(pageNo:any) => handlePageChange(pageNo)}
                        itemPerPage={itemPerPage}
                    />
                </div>
            )}
           

        </div>
    )

})


export default DataTable2