import React from 'react';

import {createBrowserRouter} from 'react-router-dom'
import App from '../App';
import Test from '../components/Test';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />
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