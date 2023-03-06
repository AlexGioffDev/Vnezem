import React, { useContext } from 'react';
import { StoreContext } from '../../store/storeContentex';
import styles from './Navbar.module.css'
import Login from '../../components/Login/LogIn';
import Logout from '../Logout/Logout';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const {state: {user}} = useContext(StoreContext);

    

    return (
        <div className={styles.Navbar}>
            <Link to="/"><p className={styles.logo}>Vnezem</p></Link>
            {user ? (
                <Logout size="small" />
            ) : (
                <Login size="small" />
            )}
        </div>
    )
}

export default Navbar;