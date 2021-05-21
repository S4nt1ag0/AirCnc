import React,{useContext} from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import New from './Pages/New'
import AuthContext from './contexts/AuthContext'

function Routes() {
    const { signed} = useContext(AuthContext);

    const SignRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" component={Login} exact/>
        </BrowserRouter>
    );
    };

    const OtherRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" component={Dashboard} exact/>
            <Route path="/New" component={New} />
        </BrowserRouter>
    );
    };

    return  (
        !signed? <SignRoutes/> : <OtherRoutes/>                
    )
}
export default Routes;