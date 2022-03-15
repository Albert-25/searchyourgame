import React from "react";
import "../styles.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterVideogamesByOrigin, orderByName, getGenres, filterVideogamesByGenre, filterVideogamesByRating } from "../redux/actions";
import { Link } from "react-router-dom";
import VideogameCard from "./VideogameCard"
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import mario from "../img/mario.jpg"
import imglogo from "../img/imglogo.png"
import mandocarga from "../img/mandocarga.jpg"
import mario404 from "../img/mario404.gif"
console.log("hola mundo")

export default function Home() {

    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.genres)
    const allVideogames = useSelector(state => state.videogames)
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(16)
    const numberOfLastVideogame = currentPage * videogamesPerPage;
    const numberOfFirstVideogame = numberOfLastVideogame - videogamesPerPage
    const currentVideogames = allVideogames.slice(numberOfFirstVideogame, numberOfLastVideogame)
    const [orden, setOrden] = useState("")
    const [ordenRating, setOrdenRating] = useState("")

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
        dispatch({ type: "SET_DETAIL" })
    }, [dispatch])


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames())
    }

    const handleSort = e => {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleFilterOrigin = (e) => {
        dispatch(filterVideogamesByOrigin(e.target.value))
        setCurrentPage(1)
    }

    const handleFilterGenre = e => {
        dispatch(filterVideogamesByGenre(e.target.value))
        setCurrentPage(1)
    }

    const handleFilterRating = e => {
        dispatch(filterVideogamesByRating(e.target.value))
        setCurrentPage(1)
        setOrdenRating(`ordenado ${e.target.value}`)
    }

    return (
        <div >
            <header className="header">
                <div className="container-imglogo" ><Link to="/"><img src={imglogo} className="imglogo"></img></Link></div>
                <div className="wikivideogames">
                    <h1 onClick={handleClick} >
                        Wiki Videogames
                    </h1>
                </div>
                <div className="container-create">
                    <Link to="/videogamecreate" className="btn-create"><span className="btn-create-span">Create videogame</span></Link>
                </div>
            </header>

            <div className="main">
                <SearchBar />

                <div>

                    <div className="container-filter">

                        <div className="filter-rating col">
                            <div>Order rating</div>
                            <select onChange={handleFilterRating}>
                                <option selected disabled={true}>Select rating</option>
                                <option value="asc">Ascendente</option>
                                <option value="des">Descendente</option>
                            </select>
                        </div>

                        <div className="filter-sort col">
                            <div>Order type</div>
                            <select onChange={handleSort}>
                                <option selected disabled={true}>Select order</option>
                                <option value="asc">Ascendant</option>
                                <option value="des">Descendant</option>
                            </select>
                        </div>

                        <div className="filter-origin col">
                            <div>Origin type</div>
                            <select onChange={handleFilterOrigin}>
                                <option value="all">All</option>
                                <option value="api">Api</option>
                                <option value="db">Database</option>
                            </select>
                        </div>

                        <div className="filter-genre col">
                            <div>Genre</div>
                            <select onChange={handleFilterGenre}>
                                <option value="all">All</option>
                                {
                                    allGenres && allGenres.map(g => {
                                        return (
                                            <option key={g.id} value={g.name}>{g.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                    </div>

                    <Pagination
                        videogamesPerPage={videogamesPerPage}
                        allvideogames={allVideogames.length}
                        paginado={paginado}
                        currentPage = {currentPage}
                    />

                    {

                        currentVideogames.length === 0 ?
                            <div className="container-carga-main">
                                <div>
                                    <h2>Loading videogames...</h2>
                                </div>
                                <div className="box-img-main">
                                    <img src={mandocarga} alt="loading videogames..." />
                                </div>
                            </div>
                            : currentVideogames === "not found"
                                ? <div className="container-carga-main">
                                    <div>
                                        <h2>Videogame no encontrado :(</h2>
                                    </div>
                                    <div className="box-img-main">
                                        <img src={mario404} alt="videogame no encontrado" />
                                    </div>
                                </div>
                                : <div className="container-videogames-card">
                                    {
                                        currentVideogames && currentVideogames.map(v => {
                                            return (
                                                <Link to={`/detail/${v.id}`} key={v.id} className="link">
                                                    <VideogameCard name={v.name} img={v.img ? v.img : mario} genres={v.genres} />
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                    }

                </div>
            </div>

        </div>
    )
}




