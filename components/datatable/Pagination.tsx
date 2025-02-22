import React, {  } from 'react'
import {  styled } from 'goober';

// import { Jsxlement } from 'typescript'
import Image from './../common/Image';

const Button = styled('button')`
    margin-left: 0px;
    background: transparent;
    border: 0;
    &.selected {
        border-bottom: 1px solid #ffc220 !important;
    }
`;

interface Props {
    
    totalRows:number;
    currentPage:number;
    setCurrentPage:any;
    itemPerPage:any;
    
}



const Pagination:React.FC<Props> = (props) => {

    const totalRows = props.totalRows
    const itemPerPage = props.itemPerPage

    //const [currentPage, setCurrentPage]  = useState(1)   
    
    let currentPage = props.currentPage
    

    const totalPages = Math.ceil(totalRows / itemPerPage)

    //const startIndex = (currentPage-1 ) * itemPerRow
    //const endIndex = (currentPage ) * itemPerRow

    const renderPageNumbers = () => {
        //const maxPageNoVisible = 5
        const firstPageNo = (currentPage - 2 <= 0)? 1 : currentPage - 2 ;
        const lastPageNo = (currentPage + 2 >= totalPages)? totalPages : (currentPage + 2 < 5)? (totalPages < 5 )? totalPages : 5  :  currentPage + 2 ;

        const pageNumbers = [];

        const gotoPage = (page:number) => {
            props.setCurrentPage(page)
        }  
    
        for (let i = firstPageNo; i <= lastPageNo; i++) {
            
            pageNumbers.push(<Button key={i} type="button" className={(i == currentPage) ? 'selected' : ''} onClick={() => gotoPage(i)}>{i}</Button>);
        }

        return pageNumbers
    }
   

    const handleNextPage = () => {
        props.setCurrentPage(currentPage + 1)
    }

    const handlePrevPage = () => {
        props.setCurrentPage(currentPage - 1)
    }

    const gotoFirstPage = () => {
        props.setCurrentPage(totalPages)
    }

    const gotoLastPage = () => {
        props.setCurrentPage(1)
    }

   
    return (
        <div className=''>
            <span>Registros </span> 
            <span className="notranslate"> {totalRows}</span> 
            <span> - Páginas:</span> 
            <Button type='button' onClick={gotoLastPage}> <Image name="pag-first.png" className="pagination-nav-btn" /> </Button>
            <Button type='button' onClick={handlePrevPage} disabled={currentPage == 1} ><Image name="pag-pre.png" className="pagination-nav-btn2" /> </Button>
                {renderPageNumbers()}
            <Button type='button' onClick={handleNextPage} disabled={currentPage == totalPages} > <Image name="pag-nex.png" className="pagination-nav-btn2" /> </Button>
            <Button type='button' onClick={gotoFirstPage}> <Image name="pag-last.png" className="pagination-nav-btn" /> </Button>

            (Total de  <span className="notranslate">{totalPages}</span>)
        </div>
        
    )

}


export default Pagination