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

const haveProfilePath  = (profile) => {
    return Boolean(profile["profile_path"])
}

const firstRelease = (movie,minDate, maxDate) => {
    return Date.parse(movie["release_date"]) >= Date.parse(minDate) && Date.parse(movie["release_date"]) <= Date.parse(maxDate)
}


const getJapaneseMoviesUpcoming = (movies, minDate, maxDate) => {
    return movies.filter(movie => {
        return  havePoster(movie) && isJapanese(movie) && isAnime(movie) && firstRelease(movie, minDate, maxDate)
    })
}

const getJapaneseMovies = (movies) => {
    return movies.filter(movie => {
        return  havePoster(movie) && isJapanese(movie) && isAnime(movie) 
    })
}




const getUpcomingMovies = async () => {
    const url = process.env.URL_BASE + "/movie/upcoming?api_key=" + process.env.API_KEY + "&region=JP"
    let page = 1
    let totalPage = 2
    let results = {
        movies: [],
        maxDate: "",
        minDate: ""
    }

    do {
        let { data } = await axios(url, {
            params: {
                language: "en-US",
                page: page
            }
        })
        results.maxDate = data['dates'].maximum
        results.minDate = data['dates']['minimum']

        totalPage = data['total_pages']
        page++;
        let filterMovies = getJapaneseMoviesUpcoming(data.results, results.minDate, results.maxDate);
        if (filterMovies.length > 0) {
            const movies = filterMovies.map(movie => {
                return (
                    {
                        id: movie.id,
                        title: movie.title,
                        original_title: movie.original_title,
                        poster_path: movie.poster_path,
                        release_date: movie.release_date
                    }
                )
            })
            results.movies = [...results.movies, ...movies]

        }
    } while (page < totalPage)
    
    return results;

}

const getPopularMovies = async () => {
    const url = process.env.URL_BASE + "/movie/popular?api_key=" + process.env.API_KEY
    let page = 1
    let totalPage = 2
    let results = {
        movies: [],
    }

    do {
        let { data } = await axios(url, {
            params: {
                language: "en-US",
                page: page
            }
        })


        totalPage = data['total_pages']
        page++;
        let filterMovies = getJapaneseMovies(data.results);
        if (filterMovies.length > 0) {
            const movies = filterMovies.map(movie => {
                return (
                    {
                        id: movie.id,
                        title: movie.title,
                        original_title: movie.original_title,
                        poster_path: movie.poster_path,
                    }
                )
            })

            results.movies = [...results.movies, ...movies]

        }
        if (results.movies.length >= 10 ) {
            break;
        }

    } while (page < totalPage)
    return results;
}

const getTopRatedMovies = async () => {
    const url = process.env.URL_BASE + "movie/top_rated?api_key=" + process.env.API_KEY
    let page = 1
    let totalPage = 2
    let results = {
        movies: [],
    }

    do {
        let { data } = await axios(url, {
            params: {
                language: "en-US",
                page: page
            }
        })


        

        totalPage = data['total_pages']
        page++;

        let filterMovies = getJapaneseMovies(data.results);

        if (filterMovies.length > 0) {
            const movies = filterMovies.map(movie => {
                return (
                    {
                        id: movie.id,
                        title: movie.title,
                        original_title: movie.original_title,
                        poster_path: movie.poster_path,
                    }
                )
            })
            results.movies = [...results.movies, ...movies]

        }
        if (results.movies.length >= 10) {
            break;
        }

    } while (page < totalPage)

    return results;
}

const getMovieInfo = async (id) => {
    const url = process.env.URL_BASE + "/movie/" + id + "?api_key=" + process.env.API_KEY
    const { data } = await axios(url, {
        params: {
            language: "en-US"
        }
    })
    return data;
}

const getCreditMovie = async (id) => {
    const url = process.env.URL_BASE + "/movie/" + id+"/credits" + "?api_key=" + process.env.API_KEY
    const { data } = await axios(url, {
        params: {
            language: "en-US"
        }
    })
    const results = {
        id,
        cast: [],
        crew: []
    }
    results["id"] = data.id;
    results["cast"] = data["cast"].filter(profile => haveProfilePath(profile))
    results["crew"] = data["crew"].filter(profile => haveProfilePath(profile))
    return results;
}

const getImageMovie = async (id) => {
    const url = process.env.URL_BASE + "/movie/" + id+"/images" + "?api_key=" + process.env.API_KEY 
    const { data } = await axios(url)
    const results = {
        backdrops: [],
        posters: []
    }

    results["backdrops"] = data["backdrops"].map(image => {
        return (
            {
                file_path: image["file_path"]
            }
        )
    })
    results["posters"] = data["posters"].map(image => {
        return (
            {
                file_path: image["file_path"]
            }
        )
    })
    return results;
}


const getVideosMovie = async (id) => {
    const url = process.env.URL_BASE + "/movie/" + id+"/videos" + "?api_key=" + process.env.API_KEY 
    const { data } = await axios(url)
    console.log({data})
    let videos = []
    videos = data["results"].filter(video => {
        if(video["site"] === "YouTube" && (video["type"] === "Teaser" || video["type"] === "Trailer" )) {
            return {
                key: video["key"]
            }
        }
    })
    return videos;
}



const getSimilarMovies = async (id) => {
    const url = process.env.URL_BASE + "/movie/" + id+"/similar" + "?api_key=" + process.env.API_KEY 
    let page = 1
    let totalPage = 2
    let results = {
        similarMovies: [],
    }

    do {
        let { data } = await axios(url, {
            params: {
                language: "en-US",
                page: page
            }
        })


        totalPage = data['total_pages']
        page++;
        let filterMovies = getJapaneseMovies(data.results);
        if (filterMovies.length > 0) {
            const movies = filterMovies.map(movie => {
                return (
                    {
                        id: movie.id,
                        title: movie.title,
                        original_title: movie.original_title,
                        poster_path: movie.poster_path,
                    }
                )
            })

            results["similarMovies"] = [...results["similarMovies"], ...movies]

        }
        if (results["similarMovies"].length >= 5 ) {
            break;
        }

    } while (page < totalPage)
    return results;
}




const getMovieDetail = async (id) => {
    const  Movie = {}
    const info = await getMovieInfo(id);
    const credits = await getCreditMovie(id);
    const images = await getImageMovie(id);
    const videos = await getVideosMovie(id);   
    const similar = await getSimilarMovies(id); 

    Movie["info"] = info
    Movie["credits"] = credits
    Movie["images"] = images
    Movie["videos"] = videos
    Movie["similar"] = similar
    

    return Movie
}

module.exports = {
    getUpcomingMovies,
    getMovieDetail,
    getPopularMovies,
    getTopRatedMovies
}