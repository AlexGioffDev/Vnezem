import React from 'react'
import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react';
import Message from './components/Message';


function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [authorizedUser, setAuthorizedUser] = useState(false || sessionStorage.getItem("token"));


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        if(user) {
          user.getIdToken().then(token => {
            sessionStorage.setItem("token", token);
            setAuthorizedUser(true);
          })
        }
      })
      .catch(error => GoogleAuthProvider.credentialFromError(error));
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.clear();
        setAuthorizedUser(false);
      })
      .catch(error => console.log(error));
  }



  return (
    <div className="App">
     {authorizedUser ? (
      <>
        <Message />
        <button onClick={logoutUser}>Logout</button>
      </>
     ) : (
      <>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      </>
     )}
    </div>
  );
}

export default App;
