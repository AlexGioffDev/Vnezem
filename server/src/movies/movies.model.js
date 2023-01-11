const axios = require('axios');
 
const havePoster = (movie) => {
    return Boolean(movie["poster_path"])
}

const isJapanese = (movie) => {
    return movie["original_language"] === "ja"
}

const isAnime = (movie) => {
    return movie['genre_ids'].includes(16)
}

const getJapaneseMovies = (movies) => {
    return movies.filter(movie => {
        return havePoster(movie) && isJapanese(movie) && isAnime(movie)
    })
}

const getUpcomingMovies = async () => {
    const url = process.env.URL_BASE + "movie/upcoming?api_key=" + process.env.API_KEY
    let page = 1
    let totalPage = 2
    let results = {
        movies: [],
        maxDate: ""
    }


    do {
        let {data} = await axios(url, {
            params: {
                language: "en-US",
                page: page
            }
        })

        results.maxDate = data['dates']['maximum']

        totalPage = data['total_pages']
        page++;
        let filterMovies = getJapaneseMovies(data.results);
        if(filterMovies.length > 0) {
            results.movies = [...results.movies,  ...filterMovies]

        }
    } while(page < totalPage)

    return results;

    
}

module.exports = {
    getUpcomingMovies
}