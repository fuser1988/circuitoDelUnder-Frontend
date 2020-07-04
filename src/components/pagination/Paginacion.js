import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function Paginacion(props) {

    const [activePage, setActivePage] = useState(1);
    const [itemsCountPorPage, setItemsCountPorPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setActivePage(props.activePage);
        setItemsCountPorPage(props.cantElemPorPage);
        setTotalPages(props.totalPages);
        return () => {
        }
    },[]);

    
    const onChangePage = (event) => {
        props.onChangePage(Number(event.target.id))
    }

    const marciacionConRecorrido = () => {
        let pages = [];
        for (let index = 1; index <= totalPages; index++) {
            pages.push(index);
        }
    
        let pagesAct = (activePage ===1)? pages.splice(activePage-1,itemsCountPorPage): pages.splice(activePage-2,3);
    
        return (
            <div className="d-flex justify-content-center">
                {pagesAct.map((pageI) =>{
                    return(
                        <PaginationItem active={activePage===pageI}>
                        <PaginationLink onClick={onChangePage} id={pageI}>{pageI}</PaginationLink>
                        </PaginationItem>
                    )
                })}
            </div>)
    }

    const marcacionSimple = () => {
        let pages = [];
        for (let index = 1; index <= totalPages; index++) {
            pages.push(index);
        }
   
        return (
            <div className="d-flex justify-content-center">
                {pages.map((pageI) => {
                    return (
                        <div key ={pageI}>
                            <PaginationItem active={activePage===pageI}>
                            <PaginationLink onClick={onChangePage} id={pageI}>{pageI}</PaginationLink>
                            </PaginationItem>
                        </div>
                        )
                })}
            </div>
        )
        
    }

    const firstClick = () => {
        props.onChangeFirst();
        
    }

    const lastClick = () => {
        props.onChangeLast(totalPages);        
    }
    
    return (
        <div>
            <Pagination>
                <PaginationItem disabled={activePage === 1}>
                <PaginationLink onClick={firstClick}>First</PaginationLink>
                </PaginationItem>
                {totalPages <=3? marcacionSimple(): marciacionConRecorrido()}
                <PaginationItem disabled={activePage === totalPages}>
                <PaginationLink onClick={lastClick}>Last</PaginationLink>
                </PaginationItem>

            </Pagination>
        </div>

    );
}

export default Paginacion;