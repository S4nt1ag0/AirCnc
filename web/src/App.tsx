import React,{ useContext } from 'react';
import AuthContext from './contexts/AuthContext';
import './Assets/styles/global.css';
import logo from './Assets/images/logo.svg';
import Routes from './routes';

function App() {
  
  const { signOut} = useContext(AuthContext);
  
  return (
    <div className="App">
      <div className="container">
        <img src={logo} alt="Aircnc" onClick={signOut}/>
        <div className="content">
          <Routes></Routes>
        </div>
      </div>
    </div>
  );
}
export default App;
