const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],
}


function rootReducer(state = initialState, action) {

    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }

        case "GET_NAME_VIDEOGAMES": 
            return {
                ...state,
                videogames: action.payload
            }

        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload
            }

        case "GET_GENRES": 
            return {
                ...state,
                genres: action.payload
            }

        case "SET_DETAIL":
            return {
                ...state,
                detail: []
            }

        case "FILTER_BY_RATING":
            let videogamesByRating

            if (action.payload === "asc") {
                console.log(action.payload)
                videogamesByRating = state.videogames.sort(function (a, b) {
                    if (a.rating < b.rating) {
                        return -1
                    }
                    if (a.rating > b.rating) {
                        return 1
                    }
                    return 0
                })
            }

            if (action.payload === "des") {
                console.log(action.payload)
                videogamesByRating = state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1
                    }
                    if (a.rating < b.rating) {
                        return 1
                    }
                    return 0
                })
            }

            return {
                ...state,
                videogames: videogamesByRating
            }

        case "ORDER_BY_NAME":
            const sortedArr = action.payload === "asc" ?
                state.videogames.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1
                    }
                    if (a.name > b.name) {
                        return 1
                    }
                    return 0
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (a.name < b.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                videogames: sortedArr,
            }

        case "FILTER_BY_ORIGIN": 
            const allVideogames = state.allVideogames;
            const originFiltered = action.payload === "db" ? state.allVideogames.filter(v => v.createdInDb) : state.allVideogames.filter(v => !v.createdInDb)
            return {
                ...state,
                videogames: action.payload === "all" ? allVideogames : originFiltered
            }

        case "FILTER_BY_GENRE":
            const videogamesByGenre = state.allVideogames.map(v => {
                if (v.genres.filter(g => g.name === action.payload).length > 0) {
                    return v
                }
                return null
            }).filter(v => v !== null)

            return {
                ...state,
                videogames: action.payload === "all" ? state.allVideogames : videogamesByGenre
            }


        case "POST_VIDEOGAME":
            return {
                ...state,
            }

        default:
            return state
    }
}

export default rootReducer;

