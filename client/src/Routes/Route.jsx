import React from 'react';
import {createBrowserRouter, Link} from 'react-router-dom'
import Test from '../components/Test/Test';


const Routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <Link to="/test">test</Link>
            </div>
        )
    },
    {
        path: "/message",
        element: (
            <div>
                <p>Hello</p>
            </div>
        )
    },
    {
        path: "/test",
        element: <Test />
    }
])

export default Routes;