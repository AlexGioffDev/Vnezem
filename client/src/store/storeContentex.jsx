import React, {createContext, useReducer} from "react";
import { ACTION_TYPES } from "./actionTypes";

export const StoreContext = createContext();


const storeReducer = (state, action) => {
    switch(action.type){
        case ACTION_TYPES.LOG_IN: {
            return {...state, user: action.payload.user}
        }
        case ACTION_TYPES.LOG_OUT: {
            return {...state, user: null}
        }
        default:
            throw new Error("Action Type undefined");
    }
}

const StoreProvider = ({children}) => {

    const initialState = {
        user: null
    }

    const [state, dispatch] = useReducer(storeReducer, initialState);
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )

}

export default StoreProvider;