const {getUpcomingMovies} = require('./movies.model')

module.exports = {
    Query: {
        moviesUpcoming: () => {
            return getUpcomingMovies()
        }
    }
}