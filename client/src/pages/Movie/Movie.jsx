import { Navigate, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar";
import { useQuery, gql } from '@apollo/client';
import styles from './Movie.module.css'
import { CiTimer, CiHeart } from 'react-icons/ci'
import { StoreContext } from "../../store/storeContentex";
import { useContext } from "react";
import Profile from "../../components/Profile/Profile";


const Movie = () => {
    const params = useParams();
    const { id } = params;

    const {
        state: { user }
    } = useContext(StoreContext);




    const Movie = gql`
        query {
            movie(id: ${id}) {
                info {
                    title
                    original_title
                    overview
                    original_language
                    genres {
                        id
                        name
                    }
                    poster_path
                    runtime
                    vote_average
                }
                credits {
                    cast {
                        id
                        name
                        profile_path
                        character
                    }
                    crew {
                        id
                        name
                        profile_path
                        department
                    }
                }
   
            }
        }
    `
    const { data, loading, error } = useQuery(Movie);

    // if(!user) {
    //     return <Navigate to="/login" />
    // }

    if (!id) {
        return <Navigate to="/" />
    }

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    const { info, credits } = data.movie
    console.log(info)
    return (
        <>
            <Navbar />
            <div className={styles.wrapper}>
                <div className={styles.backdrop} style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${info.backdrop_path ? info.backdrop_path : info.poster_path})`
                }}></div>
                <div className={styles.wrapperInfo}>
                    <h1 className={styles.infoTitle}>{info.title}</h1>
                    <h3 className={styles.infoOriginal}>{info.original_title}</h3>
                    <div className={styles.otherInfo}>
                        {info.genres?.map(genre => {
                            return (
                                <div className={styles.genre} key={genre.id}>{genre.name} </div>
                            )
                        })}
                        {info.runtime > 0 && (<div className={styles.runtime}><h3>{info.runtime}<span style={{ textTransform: "lowercase" }}>min</span></h3> <CiTimer style={{ fontSize: "1rem" }} /></div>)}
                        {info.vote_average > 0 && (<h3 className={styles.vote}>{info.vote_average.toFixed(1)} <CiHeart style={{ fontSize: "1rem" }} /></h3>)}
                    </div>
                </div>
                <div className={styles.wrapperSection}>
                    <div className={styles.sectionTitleWrapper}>
                        <h2 className={styles.sectionTitle}>Plot</h2>

                    </div>
                    <div className={styles.wrapperText}>
                        <p className={styles.sectionText}>
                            {info.overview ? info.overview : "Coming soon..."}
                        </p>
                    </div>
                </div>
                <div className={styles.wrapperSection}>
                    <div className={styles.sectionTitleWrapper}>
                        <h2 className={styles.sectionTitle}>Cast</h2>

                    </div>
                    <div className={styles.wrapperGallery}>
                        {credits.cast.map((actor, index) => {
                            if (index < 10) {
                                return (
                                    <Profile key={actor.id} photo={actor.profile_path} name={actor.name} role={actor.character} />
                                )
                            }

                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movie