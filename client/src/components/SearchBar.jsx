import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../redux/actions';

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputChange = (e) => {
        setName(e.target.value)
    }

    const handleSumit = (e) => {
        e.preventDefault()
        dispatch(getNameVideogames(name))
        setName("")
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input type="text"
                    value={name}
                    placeholder='buscar videogame'
                    onChange={handleInputChange}
                />
            </div>
            <div className="searchbar-btn">
                <button type='submit' onClick={handleSumit} >Buscar</button>
            </div>
        </div>
    );
};

export default SearchBar;