const {getUpcomingMovies, getMovieDetail, getPopularMovies, getTopRatedMovies} = require('./movies.model')

module.exports = {
    Query: {
        moviesUpcoming: () => {
            return getUpcomingMovies()
        },
        moviesPopular: () => {
            return getPopularMovies()
        },
        moviesTopRated: () => {
            return getTopRatedMovies()
        },
        movie: (_, args) => {
            return getMovieDetail(args.id)
        }
    }
}