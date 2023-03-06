import { getAuth, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom';
import Routes from './Routes/Route';
import { ACTION_TYPES } from './store/actionTypes';
import { StoreContext } from './store/storeContentex';


function App() {

  const {dispatch} = useContext(StoreContext);
  const auth = getAuth();
  useEffect(() => {
    const checkLogin = async () => {
      await getRedirectResult(auth).then(result => {
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

    checkLogin();
  })



  return (
    <div className="container">
      <RouterProvider router={Routes} />
    </div>
  );
}

export default App;
