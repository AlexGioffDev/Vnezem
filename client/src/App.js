import React from 'react'

import Navbar from './components/Navbar/Navbar';
import {RouterProvider} from 'react-router-dom';
import Routes from './Routes/Route';

function App() {

  return (
    <div className="App">
      <>
        <Navbar />
        <RouterProvider router={Routes} />
      </>
    </div>
  );
}

export default App;
