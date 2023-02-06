import React from 'react'
import Login from './components/LogIn';
import {Link} from 'react-router-dom'

function App() {
 
 



  return (
    <div className="App">
      <>
        <Link to="/test">Test</Link>
        <Login />
      </>
    </div>
  );
}

export default App;
