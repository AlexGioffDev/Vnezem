import React from 'react';
import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home';
import LoginPage from '../pages/Login/LoginPage';
import Movie from '../pages/Movie/Movie';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <Home />
        )
    },
    {
        path: "/movie/:id",
        element: <Movie />
    },
    {
        path: "/login",
        element: (
            <LoginPage />
        )
    }
    
])

export default Routes;