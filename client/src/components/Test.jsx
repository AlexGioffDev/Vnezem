import React, {useContext} from 'react';
import { StoreContext } from '../store/storeContentex';
import {Navigate} from 'react-router-dom'


const Test = () => {
    const {
        state: {user}
    } = useContext(StoreContext);

    if(!user) {
        return <Navigate to="/" />
    }

    return (
        <h1>
            Hello
        </h1>
    )
}

export default Test;