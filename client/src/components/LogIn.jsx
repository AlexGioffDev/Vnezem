import React from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useContext } from 'react';
import { StoreContext } from '../store/storeContentex';
import { ACTION_TYPES } from '../store/actionTypes';

const Login = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const {dispatch} = useContext(StoreContext);


    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then(result => {
                const userResult = result.user;
                if(userResult) {
                    userResult.getIdToken()
                        .then(token => {
                            dispatch({
                                type: ACTION_TYPES.LOG_IN,
                                payload: {
                                    user: token
                                }
                            })
                        })
                }  
            })
            .catch(error => GoogleAuthProvider.credentialFromError(error));
    }

    return (
        <button onClick={signInWithGoogle}>Login With Google</button>
    )
}

export default Login;