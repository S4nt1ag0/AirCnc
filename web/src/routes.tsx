import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import New from './Pages/New'

function Routes() {
    return  (
        <BrowserRouter> 
            <Route path="/" component={Login} exact />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/New" component={New} />
        </BrowserRouter>
    )
}
export default Routes;