import React from 'react';
import { ButtonPagination } from "./styles"
import "./Pagination.css"

const Pagination = ({ videogamesPerPage, allvideogames, paginado, currentPage }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allvideogames / videogamesPerPage); i++) pageNumbers.push(i)


    return (
        <nav className='container-nav-pagination'>
            <ul className='pagination'>
                {pageNumbers.map(number => {
                    return (
                        <li className='number-li' key={number}>
                            {
                                currentPage == number ? <ButtonPagination onClick={() => paginado(number)} >{number}</ButtonPagination>
                                    : <a onClick={() => paginado(number)} className="number-a ">{number}</a>
                            }
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};

export default Pagination;