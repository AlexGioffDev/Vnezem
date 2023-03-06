import styles from './Profile.module.css'

const Profile = ({ photo, name, role }) => {
    return (
        <div className={styles.containerProfile} >
            <img src={`https://image.tmdb.org/t/p/original${photo}`} alt={`${name}`}  />
            <div className={styles.profileBody}>
                <h3 className={styles.profileName}>{name}</h3>
                <h3 className={styles.profileRole}>{role}</h3>
            </div>
        </div>
    )
}

export default Profile;