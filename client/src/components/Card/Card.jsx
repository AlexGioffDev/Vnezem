import styles from './Card.module.css';
import Button from '../Button/Button'
import { Link } from 'react-router-dom';

const Card = ({ poster, id, title, original_title }) => {

    const truncateTitle = (text) => {
        if(text.length > 20){
            return text.substring(0, 15) + "..."
        } return text
    }
    const truncateOriginalTitle = (text) => {
        if(text.length > 10){
            return text.substring(0, 5).trim() + "..."
        } return text
    }
   

    

    return (
        <div style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${poster})`,

        }} className={styles.cardContainer}>
            <div className={styles.infoWrapper}>
                <h1 className={styles.title}>{truncateTitle(title)}</h1>
                <h3 className={styles.orTitle}>{truncateOriginalTitle(original_title)}</h3>
                <div className={styles.buttonWrapper}>
                    <Link to={`movie/${id}`}><Button text="Info" color="dark" size="small" /></Link>
                </div>

            </div>
        </div>
    )
}


export default Card;