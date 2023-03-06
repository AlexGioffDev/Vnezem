import styles from './Button.module.css';
import cls from 'classnames';

const Button = (props) => {
    const {size = "small", text, logo, action, color="ligth"} = props;

    const sizeMap = {
        "large": styles.lgBtn,
        "medium": styles.mdBtn,
        "small": styles.smBtn
    }

    const sizeColor = {
        "light": styles.light,
        "dark": styles.dark
    }




    return (
        <button className={cls(styles.btn, sizeMap[size], sizeColor[color] )} onClick={action}>
            <span className={`${logo ? styles.distance : ""}`}>{text}</span> {logo}
        </button>
    )
}

export default Button;