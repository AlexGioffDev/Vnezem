import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { StoreContext } from '../store/storeContentex';
import CardList from '../components/CardList/CardList';



const UPCOMING_MOVIES_QUERY = gql`
    query {
        moviesUpcoming {
            movies {
                title
                original_title
                id
                poster_path
            }
            maxDate
        }
    }
`



const Home = () => {

    const {
        state: { user }
    } = useContext(StoreContext);
    const { data, loading, error } = useQuery(UPCOMING_MOVIES_QUERY);

    if (!user) {
        return <Navigate to="/login" />
    }

    if (loading) return "Loading...";
    console.log({error})
    if (error) return <pre>{error.message}</pre>


    const movies = data.moviesUpcoming.movies
    return (
        <>
            <Navbar />
            <CardList movies={movies} />
        </>
    )
}

export default Home;