import React from 'react';
import {getAuth, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'

import {FcGoogle} from 'react-icons/fc'
import Button from '../Button/Button';

const Login = (props) => {

    const {size = "small", color="light"} = props;


    const provider = new GoogleAuthProvider();
    const auth = getAuth();



    const signInWithGoogle = async () => {
        await signInWithRedirect(auth, provider)
    }

    return (
        <Button text="Login" size={size} logo={<FcGoogle />} action={signInWithGoogle} color={color} />

    )
}

export default Login;