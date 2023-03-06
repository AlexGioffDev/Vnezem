import {getAuth, signOut} from 'firebase/auth'
import { useContext } from 'react';
import { ACTION_TYPES } from '../../store/actionTypes';
import { StoreContext } from '../../store/storeContentex';
import Button from '../Button/Button';

const Logout = (props) => {
    const {size = "small", color="light"} = props;
    const auth = getAuth();
    const {dispatch} = useContext(StoreContext);

    const handleSignOut = async () => {
        await signOut(auth)
            .then(_ => {
                
                dispatch({
                    type: ACTION_TYPES.LOG_OUT
                })
            });
    }

   

    return (
        <Button text="Logout" size={size}  action={handleSignOut} color={color} />
    )
}

export default Logout;