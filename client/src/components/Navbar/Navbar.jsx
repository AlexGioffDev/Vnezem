import React, { useContext } from 'react';
import { StoreContext } from '../../store/storeContentex';
import styles from './Navbar.module.css'
import Login from '../../components/Login/LogIn';


const Navbar = () => {

    const {state: {user}} = useContext(StoreContext);

    


    return (
        <div className={styles.Navbar}>
            <p className={styles.logo}>Vnezem</p>
            {user ? (
                <button>LogOut</button>
            ) : (
                <Login />
            )}
        </div>
    )
}

export default Navbar;