import axios from "axios"


export function getVideogames() {
    return async function (dispatch) {
        var json = await axios.get("https://searchyourgame-production.up.railway.app/videogames");
        console.log("function getVideogames()=>> ", json)
        console.log("json.data ", json.data)
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}


export function getNameVideogames(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/videogames?name=${name}`)
            return dispatch({
                type: "GET_NAME_VIDEOGAMES",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}


export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/videogame/${id}`)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export function getGenres() {
    return async function (dispatch) {
        var json = await axios.get("/genres")
        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        })
    }
}


export function filterVideogamesByRating(payload) {
    return {
        type: "FILTER_BY_RATING",
        payload
    }
}


export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}


export function filterVideogamesByOrigin(payload) {
    return {
        type: "FILTER_BY_ORIGIN",
        payload
    }
}


export function filterVideogamesByGenre(payload) {
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}



export function postVideogame(payload) {
    return async function (dispatch) {
        const json = await axios.post("/videogame", payload)
        return dispatch({
            type: "POST_VIDEOGAME",
            payload: json
        })
    }
}


