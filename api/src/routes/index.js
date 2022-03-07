const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");

const { Videogame, Genre } = require("../db");
const {
    API_KEY
} = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiData = async (page) => {
    try {
        let apiUrl = ` https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`;
        const apiInfo = await axios.get(apiUrl);
        const apiData = await apiInfo.data.results.map(game => {
            return {
                img: game.background_image,
                name: game.name,
                genres: game.genres,
                id: game.id,
                rating: game.rating,
            }
        })
        return apiData
    } catch (e) {
        console.log("error from getApiData", e)
    }
}

const getApiGenres = async () => {
    let url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
    const apiData = await axios.get(url);
    const apiGenres = await apiData.data.results.map(g => g.name);
    return apiGenres;
}

const getApiVgByQuery = async (name) => {
    try {
        const apiInfo = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        const apiData = await apiInfo.data.results.map(game => {
            return {
                img: game.background_image,
                name: game.name,
                genres: game.genres,
                id: game.id,
                rating: game.rating,
            }
        })
        return apiData;

    } catch (e) {
        console.log("error from getApiVgByQuery =>", e)
    }
}

const getApiVgById = async (id) => {

    let url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    const apiInfo = await axios.get(url);
    const apiData = await apiInfo.data;
    const videogame = {
        img: apiData.background_image,
        name: apiData.name,
        description: apiData.description_raw,
        id: apiData.id,
        released: apiData.released,
        rating: apiData.rating,
        platforms: apiData.platforms.map(p => p.platform),
        genres: apiData.genres,
    }
    return videogame

}

const getApiDataFlatted = async (pagesNumber = 5) => {
    let arrayConstructor = new Array(pagesNumber)
    for (let i = 0; i < pagesNumber; i++) arrayConstructor[i] = getApiData(i + 1)
    const apiData = await Promise.all(arrayConstructor);
    return apiData.flat();
}

const getDbData = async () => {
    const videogames = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    return videogames
}

const getAllVideogames = async () => {
    const apiDataResolved = await getApiDataFlatted()
    const dbData = await getDbData();
    return apiDataResolved.concat(dbData);
}

router.get('/videogames', async (req, res) => {
    const { name } = req.query;
    const allVideogames = await getAllVideogames()

    if (name) {
        const videogamesQuery = await getApiVgByQuery(name);
        const dbVideogames = await getDbData();
        const dbVideogamesQuery = dbVideogames.filter(v => v.name.toLowerCase().includes(name.toLowerCase()))
        let allVideogamesQuery = videogamesQuery.concat(dbVideogamesQuery)
        allVideogamesQuery.length ? res.send(allVideogamesQuery.slice(0, 15)) : res.send("not found");
    }
    else {
        res.status(200).send(allVideogames)
    }
});

router.get('/genres', async (req, res) => {
    let genres = await getApiGenres();
    
    const promisesArray = genres.map(g => Genre.findOrCreate({
        where: {
            name: g
        }
    }))
    const genresArray = await Promise.all(promisesArray)
    let allGenres = genresArray.map(a => a[0])
    res.status(200).send(allGenres)
})

router.get('/videogame/:idVideogame', async (req, res) => {
    try {
        const { idVideogame } = req.params
        const dbVideogame = await Videogame.findByPk(idVideogame, {
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        if (dbVideogame) {
            res.status(200).send(dbVideogame)
        }
        else {
            try {
                const videogame = await getApiVgById(idVideogame)
                videogame ? res.status(200).send(videogame) : res.status(404).send("¡Id invalido!")

            } catch (e) {
                res.status(404).send("¡Id invalido!")
            }
        }

    } catch (e) {

        let errorMessage = e.message
        let index = errorMessage.indexOf("uuid")
        let idParams = errorMessage.slice(index + 7, -1)
        console.log(errorMessage)
        try {
            const videogame = await getApiVgById(idParams)
            videogame ? res.status(200).send(videogame) : res.status(404).send("¡Id invalido!")

        } catch (e) {
            res.status(404).send("¡Id invalido!")
        }

    }
})

router.post('/videogame', async (req, res) => {
    try {
        const {
            name,
            description,
            released,
            rating,
            genres,
            platforms,
            createdInDb
        } = req.body;

        const videogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
        })

        const genre = await Genre.findAll({
            where: {
                name: genres    
            }
        })

        await videogame.addGenres(genre)

        res.send("¡Videogame has been create successfully!")
    } catch (e) {
        console.log("error from post('/videogame')", e)
    }

})

module.exports = router;