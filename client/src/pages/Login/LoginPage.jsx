import styles from './LoginPage.module.css';
import Login from '../../components/Login/LogIn';
import { useContext } from 'react';
import { StoreContext } from '../../store/storeContentex';
import { Navigate } from 'react-router-dom';
const LoginPage = () => {

    const {state: {user}} = useContext(StoreContext);

    if(user)
    {
        return <Navigate to="/" />
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Vnezem</h2>
                <Login size="medium" color="dark"/>
            </div>
        </div>
    )
}

export default LoginPage;