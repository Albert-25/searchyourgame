import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVideogame } from '../redux/actions';


const validate = input => {
    let errors = {};
    if (input.rating >= 1 && input.rating <= 5) {
        errors.rating = null
    } else {
        errors.rating = "rating tiene que ser entre 1 y 5"
    }
    if (!/^[a-zA-Z0-9 ]{1,20}$/.test(input.name) || !input.name.trim()) {
        errors.name = "name tiene que ser de 1 a 20 caracteres"
    }
    if (!/^[a-zA-Z0-9 ]{1,500}$/.test(input.description) || !input.description.trim()) {
        errors.description = "description tiene que ser de 1 a 500 caracteres"
    }
    if (typeof input.platforms === "string") {
        if (!/^[a-zA-Z0-9\n ]{1,200}$/.test(input.platforms) || !input.platforms.trim()) {
            errors.platforms = "debe contener almenos una plataforma"
        }
    }
    if (typeof input.platforms === "object") {
        if (input.platforms.length === 0) {
            errors.platforms = "debe contener almenos una plataforma"
        }
        let arrayPlatformsErrors = input.platforms.map(p => p.trim()).filter(p => p !== "").filter(p => !/^[a-zA-Z0-9 ]{1,100}$/.test(p))
        if (arrayPlatformsErrors.length > 0) {
            errors.platforms = "debe contener almenos una plataforma"
        }
    }


    return errors;
}



const VideogameCreate = () => {

    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genres)
    const history = useHistory();
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: []
    })


    useEffect(() => {
        dispatch(getGenres())
    }, [])

    function validatePlatforms() {
        // if (typeof input.platforms === "string") {
        //     if (!/^[a-zA-Z0-9\n ]{1,200}$/.test(input.platforms) || !input.platforms.trim()) {
        //         return true
        //     }
        // }
        if (typeof input.platforms === "object") {
            let arPlat = input.platforms.filter( p => p == p.trim())   
            if(arPlat.length===0) return true

            if (input.platforms.length === 0) {
                return true 
            }
            let arrayPlatformsErrors = input.platforms.map(p => p.trim()).filter(p => p !== "").filter(p => !/^[a-zA-Z0-9 ]{1,100}$/.test(p))
            if (arrayPlatformsErrors.length > 0) {
                return true
            }
        }
    }

    const disabled = () => {
        if (!/^[a-zA-Z0-9 ]{1,20}$/.test(input.name) || !input.name.trim()) return true
        if (!/^[a-zA-Z0-9 ]{1,500}$/.test(input.description) || !input.description.trim()) return true
        if (validatePlatforms()) return true
        if (input.rating >= 1 && input.rating <= 5) return false
        else return true
    }


    const handleDelete = (z) => {
        setInput({
            ...input,
            genres: input.genres.filter((g) => g !== z)
        })
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: [e.target.name] == "platforms" ? e.target.value.split("\n") : e.target.value
        })
  
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    console.log(input.platforms)
    const handleSelect = (e) => {
        setInput({
            ...input,
            genres: [
                ...input.genres,
                e.target.value
            ]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postVideogame(input))
        alert("Videogame creado exitosamente!!")
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: []
        })
        history.push("/home")
    }



    return (
        <div className='container-box'>
            <div className="container-btn-back-create">
                <Link to="/home" ><button>Go back</button></Link>
            </div>
            <div className='container-form'>
                <div className='h1-create'>
                    <h1>Crea tu videogame</h1>
                </div>
                <div className='div-form'>
                    <form action="" onSubmit={(e) => handleSubmit(e)}>
                        <div className='container-inputs'>
                            <div className='input-box'>
                                <div htmlFor="" className='name'>Name: </div>
                                <input type="text"
                                    placeholder="your game's name"
                                    value={input.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                                <div className='showerror'>
                                    {
                                        errors.name && <span className='error'>*{errors.name}*</span>
                                    }
                                </div>
                            </div>
                            <div className='input-box'>
                                <div htmlFor="" className='name'>Description: </div>
                                <input type="text"
                                    placeholder='this game consist in...'
                                    value={input.description}
                                    name="description"
                                    onChange={handleChange}
                                />
                                <div className='showerror'>
                                    {
                                        errors.description && <span className='error'>*{errors.description}*</span>
                                    }
                                </div>
                            </div>
                            <div className='input-box'>
                                <div htmlFor="" className='name'>Released: </div>
                                <input type="text"
                                    placeholder='12-02-2010'
                                    value={input.released}
                                    name="released"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='input-box'>
                                <div htmlFor="" className='name'>Rating: </div>
                                <input type="text"
                                    placeholder='4.9'
                                    value={input.rating}
                                    name="rating"
                                    onChange={handleChange}
                                />
                                <div className='showerror'>
                                    {
                                        errors.rating && <span className='error'>*{errors.rating}*</span>
                                    }
                                </div>
                            </div>
                        </div>
                        {console.log(input.platforms)}
                        <div className='input-platforms col'>
                            <div htmlFor="" className='name'>Platforms: </div>
                            <textarea type="text"
                                placeholder='presiona enter por cada plataforma ingresada'
                                rows="5"
                                name="platforms"
                                onChange={handleChange}
                            />
                            <div className='showerror'>
                                {
                                    errors.platforms && <span className='error'>*{errors.platforms}*</span>
                                }
                            </div>
                        </div>
                        <div className='input-genres col'>
                            <div>
                                <div className='name'>Genres: </div>
                                <select name="" id="" onChange={(e) => handleSelect(e)}>

                                    <option selected disabled="disabled">Select Genres</option>
                                    {genres.map(g => {
                                        return (
                                            <option value={g.name} key={g.id}>{g.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='container-genres-shown'>
                            {
                                input.genres.map(g => {
                                    return (
                                        <div className='box-genre-shown' key={g.id}>
                                            <span>{g}</span>
                                            <div className='botonx' onClick={() => handleDelete(g)}>x</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='container-btn-submit'>
                            <button className={disabled() && "disabled"} type="submit" disabled={disabled() ? true : false}>Crear videogame</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default VideogameCreate;


