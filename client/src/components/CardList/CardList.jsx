import Card from '../Card/Card'
import styles from './CardList.module.css'


const CardList = ({movies}) => {
    return (
        <div className={styles.cardGrid}>
            {movies.map((movie) => {
                return (
                    <Card key={movie.id} id={movie.id} title={movie.title} original_title={movie.original_title} poster={movie.poster_path} />
                )
            })}
           
        </div>
    )
}

export default CardList