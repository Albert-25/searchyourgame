import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../redux/actions';
import { useEffect } from 'react';
import mario from "../img/mario.jpg"
import cargaimg from "../img/cargaimg.jpg"
import mariocarga from "../img/mariocarga.jpg"

const Detail = (props) => {

    const dispatch = useDispatch();
    const myVideogame = useSelector((state) => state.detail)
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

 
    return (
        <div className='main-detail'>
            {
                Object.keys(myVideogame).length > 0 ?
                    <div className='container-detail'>

                        <div className='container-h1'>
                            <h1>{myVideogame.name}</h1>
                        </div>

                        <div className='container-detail-img-description'>
                            <div className='container-detail-img'>
                                <img src={myVideogame.img ? myVideogame.img : mario}></img>
                            </div>
                            <div className='container-detail-description'>
                                <div>Description:</div>
                                <p>{myVideogame.description}</p>
                            </div>
                        </div>

                        <div className='container-detail-info'>
                            {
                                myVideogame.createdInDb == true
                                    ? <div className='row-info'>
                                        <span>Platforms: </span>
                                        {myVideogame.platforms.map((p, index) => {
                                            if (index === myVideogame.platforms.length - 1) {
                                                return <span key={index}>{p}</span>
                                            }
                                            return <span key={index}>{p}{", "}</span>
                                        })}
                                    </div>
                                    : <div className='row-info'>
                                        <span>Platforms: </span>
                                        {myVideogame.platforms.map((p, index) => {
                                            if (index === myVideogame.platforms.length - 1) {
                                                return <span key={p.id}>{p.name}</span>
                                            }
                                            return <span key={p.id}>{p.name}{", "}</span>
                                        })}
                                    </div>
                            }


                            <div className='row-info'>
                                <span>Genres: </span>
                                {myVideogame.genres.map((g, index) => {
                                    if (index === myVideogame.genres.length - 1) {
                                        return <span key={g.id}>{g.name}</span>
                                    }
                                    return <span key={g.id}>{g.name}{", "}</span>
                                })}
                            </div>

                            <div className='row-info'>
                                <span>Released: {myVideogame.released}</span>
                            </div>

                            <div className='row-info'>
                                <span>Rating: {myVideogame.rating}</span>
                            </div>

                        </div>
                        <div className='container-btn-back'>
                            <Link to="/home"><button>Go back</button></Link>
                        </div>
                    </div> :
                    <div className='container-carga'>
                        <div className='box-img'>
                            <img src={cargaimg} alt="Cargando videogame..." />
                        </div>
                        <div className='box-img'>
                            <img src={mariocarga} alt="Cargando videogame..." />
                        </div>
                    </div>
            }

        </div>
    );
};

export default Detail;
