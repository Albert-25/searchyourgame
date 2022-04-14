import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../../redux/actions';
import "./SearchBar.css"

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
                    placeholder='search videogame'
                    onChange={handleInputChange}
                />
            </div>
            <div className="searchbar-btn">
                <button type='submit' onClick={handleSumit} >Search</button>
            </div>
        </div>
    );
};

export default SearchBar;